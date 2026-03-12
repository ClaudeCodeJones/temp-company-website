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
    name:         'Branch One',
    slug:         'branch-one',
    region:       'Region One',
    address:      '1 Example Street, City',
    phone:        '0800 000 000',
    manager:      'Manager Name',
    managerRole:  'Branch Manager',
    serviceAreas: ['Area One', 'Area Two', 'Area Three'],
    mapCoords:    [295, 414],
    hiringStatus: 'hiring',
    hiringRoles:  ['Role A', 'Role B'],
    hiringTagline:'Growing fast. Looking for experienced candidates.',
  },
  {
    name:         'Branch Two',
    slug:         'branch-two',
    region:       'Region Two',
    address:      '2 Example Street, City',
    phone:        '0800 000 000',
    manager:      'Manager Name',
    managerRole:  'Branch Manager',
    serviceAreas: ['Area Four', 'Area Five'],
    mapCoords:    [332, 458],
    hiringStatus: 'limited',
    hiringRoles:  ['Role A'],
    hiringTagline:'One or two roles available for the right candidates.',
  },
  {
    name:         'Branch Three',
    slug:         'branch-three',
    region:       'Region Three',
    address:      '3 Example Street, City',
    phone:        '0800 000 000',
    manager:      'Manager Name',
    managerRole:  'Branch Manager',
    serviceAreas: ['Area Six', 'Area Seven', 'Area Eight'],
    mapCoords:    [389, 423],
    hiringStatus: 'limited',
    hiringRoles:  ['Role A'],
    hiringTagline:'Selective intake. Experienced candidates only.',
  },
  {
    name:         'Branch Four',
    slug:         'branch-four',
    region:       'Head Office',
    address:      '4 Example Street, City',
    phone:        '0800 000 000',
    manager:      'Manager Name',
    managerRole:  'Branch Manager',
    serviceAreas: ['Area Nine', 'Area Ten', 'Area Eleven'],
    mapCoords:    [264, 560],
    isHeadOffice: true,
    hiringStatus: 'limited',
    hiringRoles:  ['Role A'],
    hiringTagline:'Our busiest hub. Multiple openings across operations.',
  },
  {
    name:         'Branch Five',
    slug:         'branch-five',
    region:       'Region Five',
    address:      '5 Example Street, City',
    phone:        '0800 000 000',
    manager:      'Manager Name',
    managerRole:  'Branch Manager',
    serviceAreas: ['Area Twelve', 'Area Thirteen'],
    mapCoords:    [194, 624],
    hiringStatus: 'closed',
    hiringRoles:  [],
    hiringTagline:'No current vacancies. Register your interest for future roles.',
  },
]

export const statusLabel: Record<HiringStatus, string> = {
  hiring:  'Actively Hiring',
  limited: 'Limited Openings',
  closed:  'Not Hiring',
}
