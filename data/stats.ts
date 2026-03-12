export type StatVariant = 'primary' | 'orange' | 'dark'

export type Stat = {
  value: string
  label: string
  variant: StatVariant
}

export const stats: Stat[] = [
  { value: 'X+',     label: 'Years of Experience',   variant: 'primary' },
  { value: 'XX+',    label: 'Qualified Staff',        variant: 'orange'  },
  { value: 'X',      label: 'Branch Locations',       variant: 'primary' },
  { value: 'XX+',    label: 'Specialist Vehicles',    variant: 'dark'    },
  { value: '100% NZ',label: 'Owned & Operated',       variant: 'orange'  },
  { value: 'Cert 1', label: 'Accreditation One',      variant: 'primary' },
  { value: 'Cert 2', label: 'Accreditation Two',      variant: 'primary' },
  { value: 'Cert 3', label: 'Accreditation Three',    variant: 'primary' },
]
