export type HiringStatus = 'hiring' | 'limited' | 'closed'

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
  /** Roles currently open at this branch */
  hiringRoles: string[]
  hiringTagline: string
  isHeadOffice?: boolean
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
    hiringRoles:  ['Traffic Management Workers', 'General Labourers'],
    hiringTagline:'Actively placing workers across the Wellington region.',
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
    hiringStatus: 'limited',
    hiringRoles:  ['Traffic Management Workers'],
    hiringTagline:'Selective intake. Experienced candidates welcome.',
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
    hiringRoles:  ['Traffic Management Workers', 'Civil Construction Labourers', 'Event Staff'],
    hiringTagline:'Growing fast. Looking for reliable workers across all industries.',
  },
]

export const statusLabel: Record<HiringStatus, string> = {
  hiring:  'Actively Hiring',
  limited: 'Limited Openings',
  closed:  'Not Hiring',
}