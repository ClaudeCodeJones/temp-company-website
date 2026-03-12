export type Service = {
  id: string
  title: string
  body: string
  image: string
  bgSize?: string
  bgPosition?: string
  linkHref: string
  linkLabel: string
  linkExternal: boolean
  /** Optional subsidiary logo to display on the card */
  logo?: string
}

export const services: Service[] = [
  {
    id:         'traffic-management',
    title:      'Traffic Management',
    body:       'Qualified traffic management workers supporting roadworks, infrastructure projects, and events.',
    image:      '/services/works.webp',
    linkHref:   '/request-quote',
    linkLabel:  'Request Staff',
    linkExternal: false,
  },
  {
    id:         'civil-construction',
    title:      'Civil Construction',
    body:       'Reliable labour support for civil and infrastructure projects.',
    image:      '/services/events.webp',
    bgSize:     '120%',
    bgPosition: 'center top',
    linkHref:   '/request-quote',
    linkLabel:  'Request Staff',
    linkExternal: false,
  },
  {
    id:         'events',
    title:      'Events',
    body:       'Traffic and event support staff helping keep events safe and organised.',
    image:      '/services/tmps.webp',
    linkHref:   '/request-quote',
    linkLabel:  'Request Staff',
    linkExternal: false,
  },
  {
    id:         'general-labour',
    title:      'General Labour',
    body:       'Flexible workers available for short-term and project-based roles.',
    image:      '/services/training.webp',
    linkHref:   '/request-quote',
    linkLabel:  'Request Staff',
    linkExternal: false,
  },
]
