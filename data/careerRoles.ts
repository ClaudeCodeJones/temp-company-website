export type CareerRoleIconName =
  | 'trafficCone'
  | 'hardHat'
  | 'shieldCheck'
  | 'users'
  | 'clipboardList'
  | 'briefcase'

export type CareerRole = {
  title: string
  description: string
  image: string
  iconName: CareerRoleIconName
  bgSize?: string
  bgPosition?: string
  row: 1 | 2
}

export const careerRoles: CareerRole[] = [
  {
    title:       'Entry Level',
    description: 'Start on the tools. Learn the fundamentals and gain hands-on experience.',
    image:       '/roles/ttm-worker.webp',
    iconName:    'trafficCone',
    bgSize:      'cover',
    bgPosition:  'center 30%',
    row:         1,
  },
  {
    title:       'Qualified Operative',
    description: 'Apply your qualifications to manage safe and compliant operations on site.',
    image:       '/roles/stms.webp',
    iconName:    'hardHat',
    row:         1,
  },
  {
    title:       'Senior Operative',
    description: 'Lead operations while supporting team development and site safety.',
    image:       '/roles/lead-stms.webp',
    iconName:    'shieldCheck',
    row:         1,
  },
  {
    title:       'Foreman',
    description: 'Lead multiple crews across projects and support operational planning.',
    image:       '/roles/foreman.webp',
    iconName:    'users',
    row:         2,
  },
  {
    title:       'Supervisor',
    description: 'Support regional operations, crew coordination, and project delivery.',
    image:       '/roles/operations_coordinator.webp',
    iconName:    'clipboardList',
    row:         2,
  },
  {
    title:       'Manager',
    description: 'Progress into regional operations, training, or business development.',
    image:       '/roles/manager.webp',
    iconName:    'briefcase',
    row:         2,
  },
]
