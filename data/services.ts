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
    id:         'service-primary',
    title:      'Primary Service',
    body:       'Experienced professionals delivering your primary service safely and reliably, minimising disruption to clients and the public.',
    image:      '/services/works.webp',
    linkHref:   '/estimate',
    linkLabel:  'Get an Estimate',
    linkExternal: false,
  },
  {
    id:         'service-secondary',
    title:      'Secondary Service',
    body:       'Professional delivery for your secondary service, keeping participants, clients, and surrounding areas safe.',
    image:      '/services/events.webp',
    bgSize:     '120%',
    bgPosition: 'center top',
    linkHref:   '/estimate',
    linkLabel:  'Get an Estimate',
    linkExternal: false,
  },
  {
    id:         'service-planning',
    title:      'Planning & Design',
    body:       'Expert planning and design services ensuring compliant, professional outcomes for your projects.',
    image:      '/services/tmps.webp',
    linkHref:   '/estimate',
    linkLabel:  'Request a Quote',
    linkExternal: false,
  },
  {
    id:         'service-training',
    title:      'Industry Training',
    body:       'Industry-recognised training helping workers start and progress their careers in your field.',
    image:      '/services/training.webp',
    linkHref:   '/contact',
    linkLabel:  'Find Out More',
    linkExternal: false,
  },
]
