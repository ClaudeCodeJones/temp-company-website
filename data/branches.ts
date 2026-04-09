export type HiringStatus = 'hiring' | 'closed'
export type WorkerAvailability = 'available' | 'limited' | 'unavailable'

export type Coordinator = {
  name: string
  role: string
  phone: string
  phoneTel: string
  email: string
  image: string
}

export type BranchAddress = {
  street: string
  locality: string
  region: string
  postcode: string
  country: string
}

export type Branch = {
  /** Display name, e.g. "Wellington" */
  name: string
  /** URL slug, e.g. "wellington" — used in dynamic routes and form dropdowns */
  slug: string
  /** Region label shown on the hiring card, e.g. "Capital Region" */
  region: string
  address: string
  phone: string
  manager: string
  managerRole: string
  /** Areas served, shown in the branch popup card */
  serviceAreas: string[]
  /** SVG pin coordinates on the map image */
  mapCoords: [number, number]
  /** Optional city illustration shown in the branch popup */
  illustration?: string
  hiringStatus: HiringStatus
  /** Employer-facing worker availability for the hire staff page */
  workerAvailability: WorkerAvailability
  /** Roles currently open at this branch */
  hiringRoles: string[]
  hiringTagline: string
  isHeadOffice?: boolean
  /** Structured address for JSON-LD */
  structuredAddress: BranchAddress
  /** Lat/lng for map embed */
  coords: [number, number]
  /** Branch coordinator */
  coordinator: Coordinator
  /** SEO meta description for branch page */
  seoDescription: string
}

export const branches: Branch[] = [
  {
    name:         'Wellington',
    slug:         'wellington',
    region:       'Greater Wellington',
    address:      'Wellington, Greater Wellington',
    phone:        '027 836 7266',
    manager:      '',
    managerRole:  'Operations Co-Ordinator',
    serviceAreas: ['Wellington', 'Hutt Valley', 'Porirua', 'Kapiti Coast'],
    mapCoords:    [295, 414],
    hiringStatus: 'hiring',
    workerAvailability: 'available',
    hiringRoles:  ['TTM Workers', 'TMO Ps', 'Civil Construction Labourers', 'Event Staff'],
    hiringTagline:'Actively placing workers across the Wellington region.',
    structuredAddress: {
      street: '23 Meachen St',
      locality: 'Seaview, Lower Hutt',
      region: 'Wellington',
      postcode: '5010',
      country: 'NZ',
    },
    coords: [-41.2270, 174.9175],
    coordinator: {
      name: 'Amy Carswell',
      role: 'Operations Co-ordinator',
      phone: '027 836 7266',
      phoneTel: '0278367266',
      email: 'amy@thetempcompany.co.nz',
      image: '/people/amy_carswell.webp',
    },
    seoDescription: 'The Temp Company Wellington supplies certified traffic management workers and general labourers across Wellington, Hutt Valley, Porirua and Kapiti Coast.',
  },
  {
    name:         'Blenheim',
    slug:         'blenheim',
    region:       'Marlborough',
    address:      'Blenheim, Marlborough',
    phone:        '027 836 7262',
    manager:      '',
    managerRole:  'Operations Co-Ordinator',
    serviceAreas: ['Marlborough', 'Nelson', 'Tasman'],
    mapCoords:    [332, 458],
    hiringStatus: 'hiring',
    workerAvailability: 'limited',
    hiringRoles:  ['TTM Workers', 'TMO Ps', 'Civil Construction Labourers', 'Event Staff'],
    hiringTagline:'Selective intake. Experienced candidates welcome.',
    structuredAddress: {
      street: '7 Freswick St',
      locality: 'Blenheim',
      region: 'Marlborough',
      postcode: '7201',
      country: 'NZ',
    },
    coords: [-41.5134, 173.9612],
    coordinator: {
      name: 'Luke Roberts',
      role: 'Operations Co-ordinator',
      phone: '027 836 7262',
      phoneTel: '0278367262',
      email: 'luke@thetempcompany.co.nz',
      image: '/people/luke_roberts_ttc1.webp',
    },
    seoDescription: 'The Temp Company Blenheim supplies certified traffic management workers across Marlborough, Nelson and Tasman.',
  },
  {
    name:         'Christchurch',
    slug:         'christchurch',
    region:       'Canterbury',
    address:      'Christchurch, Canterbury',
    phone:        '021 836 930',
    manager:      '',
    managerRole:  'Operations Co-Ordinator',
    serviceAreas: ['Canterbury', 'Selwyn', 'Waimakariri', 'Hurunui'],
    mapCoords:    [264, 560],
    isHeadOffice: true,
    hiringStatus: 'hiring',
    workerAvailability: 'available',
    hiringRoles:  ['TTM Workers', 'TMO Ps', 'Civil Construction Labourers', 'Event Staff'],
    hiringTagline:'Growing fast. Looking for reliable workers across all industries.',
    structuredAddress: {
      street: '25 Blakes Rd',
      locality: 'Belfast, Christchurch',
      region: 'Canterbury',
      postcode: '8051',
      country: 'NZ',
    },
    coords: [-43.4466, 172.6348],
    coordinator: {
      name: 'Eli Hyde',
      role: 'Operations Co-ordinator',
      phone: '021 836 930',
      phoneTel: '021836930',
      email: 'eli@thetempcompany.co.nz',
      image: '/people/eli_hyde_v1.webp',
    },
    seoDescription: 'The Temp Company Christchurch supplies certified traffic management workers, civil construction labourers and event staff across Canterbury, Selwyn, Waimakariri and Hurunui.',
  },
]

export const statusLabel: Record<HiringStatus, string> = {
  hiring: 'Actively Hiring',
  closed: 'Not Hiring',
}