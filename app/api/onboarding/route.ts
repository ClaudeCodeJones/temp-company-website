import { NextResponse } from 'next/server'
import { sendEmail, type EmailAttachment } from '@/lib/email'
import { buildEmailTemplate, escape, section, row, rowHtml } from '@/lib/emailTemplate'
import { brand } from '@/config/brand'
import { checkIpRateLimit, checkEmailRateLimit, getRequestIp } from '@/lib/rateLimit'
import { emailRegex, phoneRegex } from '@/lib/validation'
import { verifyTurnstile } from '@/lib/turnstile'

export const runtime = 'nodejs'
export const maxDuration = 60

const ENUMS = {
  designation: ['Male', 'Female', 'Gender Neutral', 'Prefer not to say'],
  convicted: ['Yes', 'No', ''],
  branch: ['Wellington', 'Blenheim', 'Christchurch'],
  legalStatus: ['NZ Citizen', 'Permanent Resident', 'Work Visa'],
  howHeard: ['Facebook', 'LinkedIn', 'Men at Work Website', 'MSD'],
  kiwiSaverStatus: [
    'Yes - I am enrolled in KiwiSaver',
    'No - I am not enrolled',
    'I have opted out of KiwiSaver',
  ],
  kiwiSaverRate: ['3%', '4%', '5%', '6%', '8%', '10%'],
  ethnicBackground: [
    'NZ European', 'Maori (Ngai Tahu)', 'Maori (Other)', 'Pacific Islands',
    'Asia', 'Africa', 'Central/South America', 'Europe', 'Middle East',
    'North America', 'Other', "I'd rather not say",
  ],
  relationship: ['Husband/Wife', 'Partner', 'Parent', 'Child', 'Sibling', 'Friend', 'Other'],
  driversLicence: ['Yes', 'No', ''],
  licenceType: ['Learners', 'Restricted', 'Full', 'Overseas'],
  canDrive: ['Automatic only', 'Manual or automatic'],
  ttmQualification: ['None', 'TTM Worker', 'TMO NP', 'TMO P', 'STMS NP', 'STMS A', 'STMS AB', 'STMS ABC', 'Other'],
  proofOption: ['I have a Warrant ID Number', 'I have a Certificate or other proof', 'Other'],
  shirtSize: ['S', 'M', 'L', 'XL', '2XL', '3XL', '5XL'],
  steelCapBoots: ['I have my own thanks', 'I need some please'],
  bootSize: ['I have my own', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'Other'],
  drugTesting: ['I understand and agree to this policy'],
  codeOfConduct: ['I understand and agree to this policy'],
  photoPermission: ['I give permission', 'I do not give permission'],
  declaration: ['I understand and agree with the above statement'],
} as const

type UploadedFile = {
  filename: string
  contentType: string
  data: string // base64
  size: number
}

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10MB per file
const MAX_TOTAL_BYTES = 30 * 1024 * 1024 // 30MB total
const ALLOWED_UPLOAD_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif',
  'application/pdf',
] as const

const EXT_FOR_TYPE: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/heic': '.heic',
  'image/heif': '.heif',
  'application/pdf': '.pdf',
}

function bytesMatchType(bytes: Uint8Array, contentType: string): boolean {
  if (bytes.length < 12) return false
  const b = bytes
  switch (contentType) {
    case 'application/pdf':
      return b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 // %PDF
    case 'image/jpeg':
      return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff
    case 'image/png':
      return b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47
        && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a
    case 'image/webp':
      return b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 // RIFF
        && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50 // WEBP
    case 'image/heic':
    case 'image/heif':
      // offset 4: 'ftyp', offset 8: brand (heic/heix/heif/mif1/msf1)
      if (b[4] !== 0x66 || b[5] !== 0x74 || b[6] !== 0x79 || b[7] !== 0x70) return false
      return true
    default:
      return false
  }
}

function isUploadedFile(v: unknown): v is UploadedFile {
  if (!v || typeof v !== 'object') return false
  const f = v as Record<string, unknown>
  return typeof f.filename === 'string'
    && typeof f.contentType === 'string'
    && typeof f.data === 'string'
    && typeof f.size === 'number'
}

function validateFile(f: UploadedFile, label: string, maxBytes: number = MAX_FILE_BYTES): string | null {
  if (!f.filename.trim() || f.filename.length > 255) return `${label}: invalid filename.`
  if (!(ALLOWED_UPLOAD_TYPES as readonly string[]).includes(f.contentType)) return `${label}: unsupported file type.`
  if (f.size > maxBytes) return `${label}: file too large (max ${Math.round(maxBytes / (1024 * 1024))}MB).`
  if (!/^[A-Za-z0-9+/=]+$/.test(f.data)) return `${label}: invalid file data.`

  try {
    const head = Buffer.from(f.data.slice(0, 32), 'base64')
    if (!bytesMatchType(new Uint8Array(head), f.contentType)) {
      return `${label}: file content does not match declared type.`
    }
  } catch {
    return `${label}: invalid file data.`
  }

  return null
}

function inEnum<T extends readonly string[]>(list: T, val: unknown): val is T[number] {
  return typeof val === 'string' && list.includes(val as T[number])
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  const allowed = new Set<string>()
  if (process.env.NEXT_PUBLIC_SITE_URL) allowed.add(process.env.NEXT_PUBLIC_SITE_URL)
  if (process.env.NODE_ENV !== 'production') {
    allowed.add('http://localhost:3000')
    allowed.add('http://127.0.0.1:3000')
  }
  return allowed.has(origin)
}

export async function POST(req: Request) {
  try {
    // 0. Origin allow-list (CSRF mitigation)
    if (!isAllowedOrigin(req.headers.get('origin'))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()

    // 1. IP rate limit
    const ipError = await checkIpRateLimit(req)
    if (ipError) return ipError

    // 2. Honeypot
    if (body.companyPhone) {
      return NextResponse.json({ success: true })
    }

    // 3. Turnstile
    const turnstileError = await verifyTurnstile(body.turnstileToken, getRequestIp(req))
    if (turnstileError) return turnstileError

    // Extract + trim fields
    const p1 = {
      fullName: str(body.fullName),
      preferredName: str(body.preferredName),
      designation: str(body.designation),
      dob: str(body.dob),
      phone: str(body.phone),
      email: str(body.email),
      address: str(body.address),
      suburb: str(body.suburb),
      city: str(body.city),
      postalCode: str(body.postalCode),
      convicted: str(body.convicted),
      convictedDetails: str(body.convictedDetails),
    }
    const p2 = {
      inductionDate: str(body.inductionDate),
      branch: str(body.branch),
      legalStatus: str(body.legalStatus),
      howHeard: str(body.howHeard),
      irdNumber: str(body.irdNumber),
      bankAccount: str(body.bankAccount),
      taxCode: str(body.taxCode),
      kiwiSaverStatus: str(body.kiwiSaverStatus),
      kiwiSaverRate: str(body.kiwiSaverRate),
      visaFile: body.visaFile,
      kiwiSaverOptOutFile: body.kiwiSaverOptOutFile,
    }
    const p3 = {
      ethnicBackground: Array.isArray(body.ethnicBackground) ? body.ethnicBackground.filter((x: unknown): x is string => typeof x === 'string') : [],
      ethnicBackgroundOther: str(body.ethnicBackgroundOther),
      emergencyName: str(body.emergencyName),
      relationship: str(body.relationship),
      relationshipOther: str(body.relationshipOther),
      emergencyPhone: str(body.emergencyPhone),
      emergencyNotes: str(body.emergencyNotes),
    }
    const p4 = {
      hasLicence: str(body.hasLicence),
      licenceType: str(body.licenceType),
      licenceNumber: str(body.licenceNumber),
      licenceVersion: str(body.licenceVersion),
      licenceExpiry: str(body.licenceExpiry),
      class2Endorsement: !!body.class2Endorsement,
      canDrive: str(body.canDrive),
      licenceFrontFile: body.licenceFrontFile,
      licenceBackFile: body.licenceBackFile,
    }
    const p5 = {
      ttmQualification: str(body.ttmQualification),
      ttmQualificationOther: str(body.ttmQualificationOther),
      nsn: str(body.nsn),
      proofOption: str(body.proofOption),
      warrantId: str(body.warrantId),
      qualificationFile: body.qualificationFile,
      proofOtherDetails: str(body.proofOtherDetails),
    }
    const p6 = {
      shirtSize: str(body.shirtSize),
      steelCapBoots: str(body.steelCapBoots),
      bootSize: str(body.bootSize),
      bootSizeOther: str(body.bootSizeOther),
    }
    const p7 = {
      drugTesting: str(body.drugTesting),
      codeOfConduct: str(body.codeOfConduct),
      photoPermission: str(body.photoPermission),
      declaration: str(body.declaration),
    }

    // 4. Required fields
    if (!p1.fullName || !p1.designation || !p1.dob || !p1.phone || !p1.email ||
        !p1.address || !p1.suburb || !p1.city || !p1.postalCode) {
      return NextResponse.json({ error: 'Missing required personal details.' }, { status: 400 })
    }
    if (!p2.branch || !p2.legalStatus || !p2.howHeard || !p2.irdNumber ||
        !p2.bankAccount || !p2.taxCode || !p2.kiwiSaverStatus) {
      return NextResponse.json({ error: 'Missing required employment info.' }, { status: 400 })
    }
    if (p3.ethnicBackground.length === 0 || !p3.emergencyName || !p3.relationship) {
      return NextResponse.json({ error: 'Missing required background details.' }, { status: 400 })
    }
    if (!p6.shirtSize || !p6.steelCapBoots) {
      return NextResponse.json({ error: 'Missing required PPE info.' }, { status: 400 })
    }
    if (!p7.drugTesting || !p7.codeOfConduct || !p7.photoPermission || !p7.declaration) {
      return NextResponse.json({ error: 'Missing required policy confirmations.' }, { status: 400 })
    }

    // 5. Email validation
    if (!emailRegex.test(p1.email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // 6. Email rate limit
    const emailError = await checkEmailRateLimit(p1.email)
    if (emailError) return emailError

    // 7. Length limits
    const lengthChecks: [string, number][] = [
      [p1.fullName, 200], [p1.preferredName, 200], [p1.designation, 50],
      [p1.dob, 30], [p1.phone, 30], [p1.email, 254],
      [p1.address, 200], [p1.suburb, 200], [p1.city, 200], [p1.postalCode, 20],
      [p1.convictedDetails, 5000],
      [p2.inductionDate, 30], [p2.branch, 200], [p2.legalStatus, 50],
      [p2.howHeard, 100], [p2.irdNumber, 30], [p2.bankAccount, 40], [p2.taxCode, 10],
      [p3.ethnicBackgroundOther, 200], [p3.emergencyName, 200],
      [p3.relationshipOther, 100], [p3.emergencyPhone, 30], [p3.emergencyNotes, 2000],
      [p4.licenceType, 50], [p4.licenceNumber, 30], [p4.licenceVersion, 10],
      [p4.licenceExpiry, 30], [p4.canDrive, 50],
      [p5.ttmQualificationOther, 200], [p5.nsn, 30], [p5.warrantId, 50],
      [p5.proofOtherDetails, 2000],
      [p6.bootSizeOther, 100],
    ]
    for (const [val, max] of lengthChecks) {
      if (val && val.length > max) {
        return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 })
      }
    }

    // 8. Phone validation
    if (!phoneRegex.test(p1.phone)) {
      return NextResponse.json({ error: 'Invalid phone number format.' }, { status: 400 })
    }
    if (p3.emergencyPhone && !phoneRegex.test(p3.emergencyPhone)) {
      return NextResponse.json({ error: 'Invalid emergency phone format.' }, { status: 400 })
    }

    // 9. Form-specific validation
    if (isNaN(Date.parse(p1.dob))) {
      return NextResponse.json({ error: 'Invalid date of birth.' }, { status: 400 })
    }
    if (p2.inductionDate && isNaN(Date.parse(p2.inductionDate))) {
      return NextResponse.json({ error: 'Invalid induction date.' }, { status: 400 })
    }
    if (p4.licenceExpiry && isNaN(Date.parse(p4.licenceExpiry))) {
      return NextResponse.json({ error: 'Invalid licence expiry date.' }, { status: 400 })
    }

    // Enum whitelists
    if (!inEnum(ENUMS.designation, p1.designation)) return NextResponse.json({ error: 'Invalid designation.' }, { status: 400 })
    if (!inEnum(ENUMS.convicted, p1.convicted)) return NextResponse.json({ error: 'Invalid convicted value.' }, { status: 400 })
    if (!inEnum(ENUMS.branch, p2.branch)) return NextResponse.json({ error: 'Invalid branch.' }, { status: 400 })
    if (!inEnum(ENUMS.legalStatus, p2.legalStatus)) return NextResponse.json({ error: 'Invalid legal status.' }, { status: 400 })
    if (!inEnum(ENUMS.howHeard, p2.howHeard)) return NextResponse.json({ error: 'Invalid referral source.' }, { status: 400 })
    if (!inEnum(ENUMS.kiwiSaverStatus, p2.kiwiSaverStatus)) return NextResponse.json({ error: 'Invalid KiwiSaver status.' }, { status: 400 })
    if (p2.kiwiSaverRate && !inEnum(ENUMS.kiwiSaverRate, p2.kiwiSaverRate)) return NextResponse.json({ error: 'Invalid KiwiSaver rate.' }, { status: 400 })
    for (const e of p3.ethnicBackground) {
      if (!inEnum(ENUMS.ethnicBackground, e)) return NextResponse.json({ error: 'Invalid ethnic background.' }, { status: 400 })
    }
    if (!inEnum(ENUMS.relationship, p3.relationship)) return NextResponse.json({ error: 'Invalid relationship.' }, { status: 400 })
    if (p4.hasLicence && !inEnum(ENUMS.driversLicence, p4.hasLicence)) return NextResponse.json({ error: 'Invalid licence value.' }, { status: 400 })
    if (p4.licenceType && !inEnum(ENUMS.licenceType, p4.licenceType)) return NextResponse.json({ error: 'Invalid licence type.' }, { status: 400 })
    if (p4.canDrive && !inEnum(ENUMS.canDrive, p4.canDrive)) return NextResponse.json({ error: 'Invalid drive type.' }, { status: 400 })
    if (p5.ttmQualification && !inEnum(ENUMS.ttmQualification, p5.ttmQualification)) return NextResponse.json({ error: 'Invalid TTM qualification.' }, { status: 400 })
    if (p5.proofOption && !inEnum(ENUMS.proofOption, p5.proofOption)) return NextResponse.json({ error: 'Invalid proof option.' }, { status: 400 })
    if (!inEnum(ENUMS.shirtSize, p6.shirtSize)) return NextResponse.json({ error: 'Invalid shirt size.' }, { status: 400 })
    if (!inEnum(ENUMS.steelCapBoots, p6.steelCapBoots)) return NextResponse.json({ error: 'Invalid boots selection.' }, { status: 400 })
    if (p6.bootSize && !inEnum(ENUMS.bootSize, p6.bootSize)) return NextResponse.json({ error: 'Invalid boot size.' }, { status: 400 })
    if (!inEnum(ENUMS.drugTesting, p7.drugTesting)) return NextResponse.json({ error: 'Invalid drug testing answer.' }, { status: 400 })
    if (!inEnum(ENUMS.codeOfConduct, p7.codeOfConduct)) return NextResponse.json({ error: 'Invalid code of conduct answer.' }, { status: 400 })
    if (!inEnum(ENUMS.photoPermission, p7.photoPermission)) return NextResponse.json({ error: 'Invalid photo permission answer.' }, { status: 400 })
    if (!inEnum(ENUMS.declaration, p7.declaration)) return NextResponse.json({ error: 'Invalid declaration answer.' }, { status: 400 })

    // Conditional required fields
    if (p1.convicted === 'Yes' && !p1.convictedDetails) {
      return NextResponse.json({ error: 'Please provide conviction details.' }, { status: 400 })
    }
    if (p2.kiwiSaverStatus === 'Yes - I am enrolled in KiwiSaver' && !p2.kiwiSaverRate) {
      return NextResponse.json({ error: 'Please select a KiwiSaver rate.' }, { status: 400 })
    }
    if (p3.ethnicBackground.includes('Other') && !p3.ethnicBackgroundOther) {
      return NextResponse.json({ error: 'Please specify other ethnic background.' }, { status: 400 })
    }
    if (p3.relationship === 'Other' && !p3.relationshipOther) {
      return NextResponse.json({ error: 'Please specify other relationship.' }, { status: 400 })
    }
    if (p4.hasLicence === 'Yes') {
      if (!p4.licenceType || !p4.licenceNumber || !p4.licenceVersion || !p4.licenceExpiry || !p4.canDrive) {
        return NextResponse.json({ error: 'Please complete all licence fields.' }, { status: 400 })
      }
    }
    if (p5.ttmQualification === 'Other' && !p5.ttmQualificationOther) {
      return NextResponse.json({ error: 'Please specify other TTM qualification.' }, { status: 400 })
    }
    if (p5.proofOption === 'I have a Warrant ID Number' && !p5.warrantId) {
      return NextResponse.json({ error: 'Please enter your Warrant ID.' }, { status: 400 })
    }
    if (p5.proofOption === 'Other' && !p5.proofOtherDetails) {
      return NextResponse.json({ error: 'Please provide details.' }, { status: 400 })
    }
    if (p6.steelCapBoots === 'I need some please' && !p6.bootSize) {
      return NextResponse.json({ error: 'Please select a boot size.' }, { status: 400 })
    }
    if (p6.bootSize === 'Other' && !p6.bootSizeOther) {
      return NextResponse.json({ error: 'Please specify your boot size.' }, { status: 400 })
    }

    // Validate uploaded files
    const LICENCE_MAX_BYTES = 5 * 1024 * 1024
    const uploadList: { key: string; label: string; required: boolean; file: unknown; maxBytes?: number }[] = [
      { key: 'visa', label: 'Work Visa', required: p2.legalStatus === 'Work Visa', file: p2.visaFile },
      { key: 'kiwisaverOptOut', label: 'KiwiSaver Opt-out Proof', required: p2.kiwiSaverStatus === 'I have opted out of KiwiSaver', file: p2.kiwiSaverOptOutFile },
      { key: 'licenceFront', label: 'Licence Front', required: p4.hasLicence === 'Yes', file: p4.licenceFrontFile, maxBytes: LICENCE_MAX_BYTES },
      { key: 'licenceBack', label: 'Licence Back', required: p4.hasLicence === 'Yes', file: p4.licenceBackFile, maxBytes: LICENCE_MAX_BYTES },
      { key: 'qualification', label: 'Qualification Proof', required: p5.proofOption === 'I have a Certificate or other proof', file: p5.qualificationFile },
    ]

    const attachments: EmailAttachment[] = []
    const uploadSummary: { label: string; filename: string }[] = []
    let totalBytes = 0

    for (const u of uploadList) {
      if (u.file) {
        if (!isUploadedFile(u.file)) {
          return NextResponse.json({ error: `${u.label}: invalid file payload.` }, { status: 400 })
        }
        const err = validateFile(u.file, u.label, u.maxBytes)
        if (err) return NextResponse.json({ error: err }, { status: 400 })
        totalBytes += u.file.size
        if (totalBytes > MAX_TOTAL_BYTES) {
          return NextResponse.json({ error: 'Total upload size exceeds 30MB.' }, { status: 400 })
        }
        const safeBase = p1.fullName.replace(/[^A-Za-z0-9]+/g, '_').slice(0, 40) || 'applicant'
        const ext = EXT_FOR_TYPE[u.file.contentType] ?? ''
        const filename = `${safeBase}_${u.key}${ext}`
        attachments.push({
          filename,
          content: u.file.data,
          contentType: u.file.contentType,
        })
        uploadSummary.push({ label: u.label, filename })
      } else if (u.required) {
        return NextResponse.json({ error: `${u.label}: file is required.` }, { status: 400 })
      }
    }

    // Build email
    const ethnicDisplay = p3.ethnicBackground
      .map((e: string) => e === 'Other' && p3.ethnicBackgroundOther ? `Other - ${p3.ethnicBackgroundOther}` : e)
      .join(', ')
    const relationshipDisplay = p3.relationship === 'Other' && p3.relationshipOther
      ? `Other - ${p3.relationshipOther}` : p3.relationship
    const ttmDisplay = p5.ttmQualification === 'Other' && p5.ttmQualificationOther
      ? `Other - ${p5.ttmQualificationOther}` : p5.ttmQualification
    const bootSizeDisplay = p6.bootSize === 'Other' && p6.bootSizeOther
      ? `Other - ${p6.bootSizeOther}` : p6.bootSize

    const rows: string[] = []

    rows.push(section('Personal Details'))
    rows.push(row('Full Name', p1.fullName, false))
    rows.push(row('Preferred Name', p1.preferredName || 'Not provided', true))
    rows.push(row('Designation', p1.designation, false))
    rows.push(row('Date of Birth', p1.dob, true))
    rows.push(row('Phone', p1.phone, false))
    rows.push(rowHtml('Email', `<a href="mailto:${escape(p1.email)}" style="color:#bc9c22;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${escape(p1.email)}</a>`, true))
    rows.push(row('Address', `${p1.address}, ${p1.suburb}, ${p1.city} ${p1.postalCode}`, false))
    rows.push(row('Convicted of a crime?', p1.convicted || 'Not answered', true))
    if (p1.convicted === 'Yes') {
      rows.push(row('Conviction Details', p1.convictedDetails, false))
    }

    rows.push(section('Employment Info'))
    rows.push(row('Induction Date', p2.inductionDate || 'Not provided', false))
    rows.push(row('Branch', p2.branch, true))
    rows.push(row('Legal Status', p2.legalStatus, false))
    rows.push(row('Heard About Us Via', p2.howHeard, true))
    rows.push(row('IRD Number', p2.irdNumber, false))
    rows.push(row('Bank Account', p2.bankAccount, true))
    rows.push(row('Tax Code', p2.taxCode, false))
    rows.push(row('KiwiSaver Status', p2.kiwiSaverStatus, true))
    if (p2.kiwiSaverStatus === 'Yes - I am enrolled in KiwiSaver') {
      rows.push(row('KiwiSaver Rate', p2.kiwiSaverRate, false))
    }

    rows.push(section('Background and Emergencies'))
    rows.push(row('Ethnic Background', ethnicDisplay, false))
    rows.push(row('Emergency Contact', p3.emergencyName, true))
    rows.push(row('Relationship', relationshipDisplay, false))
    rows.push(row('Emergency Phone', p3.emergencyPhone || 'Not provided', true))
    rows.push(row('Emergency Notes', p3.emergencyNotes || 'Not provided', false))

    rows.push(section('Driver\'s Licence & Transport'))
    if (p4.hasLicence === 'Yes') {
      rows.push(row('Has Licence', 'Yes', false))
      rows.push(row('Licence Type', p4.licenceType, true))
      rows.push(row('Licence Number', p4.licenceNumber, false))
      rows.push(row('Licence Version', p4.licenceVersion, true))
      rows.push(row('Expiry Date', p4.licenceExpiry, false))
      rows.push(row('Class 2 Endorsement', p4.class2Endorsement ? 'Yes' : 'No', true))
      rows.push(row('Can Drive', p4.canDrive, false))
    } else {
      rows.push(row('Has Licence', 'No licence', false))
    }

    rows.push(section('Certifications & Training'))
    rows.push(row('TTM Qualification', ttmDisplay || 'Not provided', false))
    rows.push(row('NSN', p5.nsn || 'Not provided', true))
    rows.push(row('Proof Option', p5.proofOption || 'Not provided', false))
    if (p5.proofOption === 'I have a Warrant ID Number') {
      rows.push(row('Warrant ID', p5.warrantId, true))
    }
    if (p5.proofOption === 'Other') {
      rows.push(row('Details', p5.proofOtherDetails, true))
    }

    rows.push(section('PPE & Uniform'))
    rows.push(row('Shirt/Top Size', p6.shirtSize, false))
    rows.push(row('Steel Cap Boots', p6.steelCapBoots, true))
    if (p6.steelCapBoots === 'I need some please') {
      rows.push(row('Boot Size', bootSizeDisplay, false))
    }

    rows.push(section('Policies & Submissions'))
    rows.push(row('Drug Testing Policy', p7.drugTesting, false))
    rows.push(row('Code of Conduct', p7.codeOfConduct, true))
    rows.push(row('Photo/Video Permission', p7.photoPermission, false))
    rows.push(row('Declaration', p7.declaration, true))

    if (uploadSummary.length > 0) {
      rows.push(section('Attached Files'))
      uploadSummary.forEach((u, i) => {
        rows.push(row(u.label, u.filename, i % 2 === 1))
      })
    }

    const html = buildEmailTemplate('TTC Onboarding', rows.join(''))

    const branchRecipients: Record<string, { email: string; name: string }> = {
      Wellington: { email: 'amy@thetempcompany.co.nz', name: 'Amy' },
      Blenheim: { email: 'luke@thetempcompany.co.nz', name: 'Luke' },
      Christchurch: { email: 'eli@thetempcompany.co.nz', name: 'Eli' },
    }

    const recipients = [{ email: 'nathan@thetempcompany.co.nz', name: 'Nathan' }]
    const branchRecipient = branchRecipients[p2.branch]
    if (branchRecipient) recipients.push(branchRecipient)

    await sendEmail({
      to: recipients,
      subject: `TTC Onboarding | ${p1.fullName} | ${p2.branch}`,
      replyTo: { email: p1.email },
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const requestId = crypto.randomUUID()
    const name = error instanceof Error ? error.name : 'UnknownError'
    const message = error instanceof Error ? error.message.slice(0, 200) : ''
    console.error('Onboarding API error', { requestId, name, message })
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.', requestId },
      { status: 500 }
    )
  }
}
