export type Faq = {
  question: string
  answer: string
  schemaAnswer: string
}

export const faqs: Faq[] = [
  {
    question:     'Who provides [primary service] in [service area]?',
    answer:       'COMPANY NAME provides professional [primary service] from our branches in [Branch One], [Branch Two], and [Branch Three].',
    schemaAnswer: 'COMPANY NAME provides professional [primary service] from our branches in [Branch One], [Branch Two], and [Branch Three].',
  },
  {
    question:     'What does a [industry] company do?',
    answer:       'A [industry] company provides trained professionals, planning, equipment, and on-site management to safely deliver services around construction, infrastructure, and public events.',
    schemaAnswer: 'A [industry] company provides trained professionals, planning, equipment, and on-site management to safely deliver services around construction, infrastructure, and public events.',
  },
  {
    question:     'What areas does COMPANY NAME cover?',
    answer:       'COMPANY NAME operates from branches across [service area]. From these branches we support projects throughout the wider region.',
    schemaAnswer: 'COMPANY NAME operates from branches across [service area]. From these branches we support projects throughout the wider region.',
  },
  {
    question:     'Do you provide planning services?',
    answer:       'Yes. Our team designs compliant plans for projects of all sizes, ensuring safe and professional outcomes.',
    schemaAnswer: 'Yes. Our team designs compliant plans for projects of all sizes, ensuring safe and professional outcomes.',
  },
  {
    question:     'Can you provide services for events?',
    answer:       'Yes. We provide professional services for events, including event planning and on-site management.',
    schemaAnswer: 'Yes. We provide professional services for events, including event planning and on-site management.',
  },
  {
    question:     'How do I request services?',
    answer:       'Request services by completing our Get an Estimate form or contacting our team through the Contact page to discuss your project.',
    schemaAnswer: 'Request services by completing our Get an Estimate form or contacting our team through the Contact page to discuss your project.',
  },
]
