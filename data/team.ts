export type TeamMember = {
  name: string
  title: string
  titleShort?: string
  region?: string
  photo?: string
  group: 'senior' | 'leadership'
}

export const team: TeamMember[] = [
  { name: 'Team Member One',   title: 'Managing Director',       region: 'Company Name', photo: undefined, group: 'senior' },
  { name: 'Team Member Two',   title: 'Director',                region: 'Company Name', photo: undefined, group: 'senior' },
  { name: 'Team Member Three', title: 'General Manager',         region: 'Company Name', photo: undefined, group: 'senior' },
  { name: 'Team Member Four',  title: 'Operations Manager',      region: 'Company Name', photo: undefined, group: 'senior' },
  { name: 'Team Member Five',  title: 'Regional Manager',        region: 'Region One',   photo: undefined, group: 'leadership' },
  { name: 'Team Member Six',   title: 'Business Development Mgr',titleShort: 'BDM', region: 'National', photo: undefined, group: 'leadership' },
  { name: 'Team Member Seven', title: 'Regional Manager',        region: 'Region Two',   photo: undefined, group: 'leadership' },
  { name: 'Team Member Eight', title: 'Regional Manager',        region: 'Region Three', photo: undefined, group: 'leadership' },
]
