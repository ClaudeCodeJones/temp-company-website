export type MilestoneIconName = 'flag' | 'building' | 'mapPin' | 'graduationCap' | 'hardHat'

export type Milestone = {
  year: string
  title: string
  iconName: MilestoneIconName
  subtext?: string
}

export const milestones: Milestone[] = [
  {
    year:     '20XX',
    title:    'Company Founded',
    iconName: 'flag',
    subtext:  'COMPANY NAME was established to serve the local market. The business initially operated from a single location.',
  },
  {
    year:     '20XX',
    title:    'First Office',
    iconName: 'building',
    subtext:  'Growth led to the opening of our first dedicated office. This gave the team room to expand and improve our services.',
  },
  {
    year:     '20XX',
    title:    'New Location Opens',
    iconName: 'mapPin',
    subtext:  'Expansion beyond our home city begins. A new branch opens to support clients in the wider region.',
  },
  {
    year:     '20XX',
    title:    'Training Division Established',
    iconName: 'graduationCap',
    subtext:  'An internal training programme is established to support our operations and develop our people.',
  },
  {
    year:     '20XX',
    title:    'Continued Growth',
    iconName: 'hardHat',
    subtext:  'The business continues to grow, adding capability, people, and reach across our service areas.',
  },
]
