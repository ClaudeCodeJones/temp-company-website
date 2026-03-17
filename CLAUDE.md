# CLAUDE.md | Frontend Website Rules (Next.js App Router)
My name is Jonesy, you can call me that rather than User, I'll often refer to you as CC

## Always Do First
- Invoke the `frontend-design` skill before writing any frontend code, every session, no exceptions.

---

## Commands

npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint check

---

## Environment & Architecture

- This project uses Next.js (App Router).
- All UI must be built within the `/app` directory structure.
- Development server is started manually using:

  npm run dev

- The site runs at:

  http://localhost:3000

- Never start custom static servers.
- Never use serve.mjs.
- Never spawn background Node HTTP servers.
- Never run multiple dev servers simultaneously.
- Do not perform screenshot automation unless explicitly requested.

### Project Structure

app/
  components/          # Global reusable components
  about-us/            # About page
  contact/             # Contact page
  estimate/            # Employer request staff page
  find-work/           # Worker information and application path
  hire-staff/          # Client information page
  privacy/             # Privacy policy page
  terms/               # Terms page
  traffic-management/  # Traffic management information page
  api/                 # API routes
  globals.css          # Brand CSS variables and utility classes
  layout.tsx           # Root layout (Navbar + Footer)
  page.tsx             # Home gateway page
  robots.ts            # Robots file
  sitemap.ts           # Sitemap generation

public/
  logos/               # Brand logos
  images/              # Site imagery

brand_assets/          # Logos and brand guidelines — always check here first

---

### Brand CSS Variables (globals.css)

--charcoal: #37373b
--light:    #f5f2ef
--yellow:   #fcd415
--black:    #000000
--navy:     #2e3949
--gold:     #bc9c22

Utility classes: `.eyebrow`, `.section-title`, `.font-display`, `.orange-rule`, `.btn-orange`, `.btn-ghost`, `.btn-white`, `.reveal`, `.cta-section`

### Styling Approach

- Tailwind v4 via `@tailwindcss/postcss` — no tailwind.config.js file.
- Mix of Tailwind classes and inline `style={}` props throughout. Both patterns are acceptable.
- Scroll-reveal animations use `.reveal` + `.d1`–`.d4` delay classes, driven by `RevealObserver.tsx`.

### Forms & API

Forms used on the site include:

- Contact form
- Employer Request Staff form
- Apply for Work form

Security patterns may include:

- Cloudflare Turnstile captcha
- Honeypot fields
- Server-side validation
- Email sending via API routes

Form locations may change during development.  
The primary worker application path is currently within `/find-work`.

---

## Data Layer

Branch locations used across the site must always appear in this order:

• Wellington  
• Blenheim  
• Christchurch  

This ordering must be respected anywhere branches appear including:

- dropdowns
- branch lists
- form selections
- informational sections

---

## Brand Naming Rules (Strict)

### MW Group

Use only when referring to the parent umbrella brand that includes:

- Men at Work Traffic Management
- MW Training & Planning
- The Temp Company
- QualCard

Never use:

- MAW Group
- Men at Work Group

The correct name is always: **MW Group**

---

### The Temp Company

Use when referring to the labour hire and temporary staffing business.

The company provides reliable temporary workers primarily to:

- traffic management companies
- civil contractors
- infrastructure projects

---

Writing Standards – Punctuation Rules

Include the following directive:

- Em dashes (—) are strictly prohibited across all content and code.
- Do not generate em dashes in any headings, paragraphs, UI text, or documentation.
- Use commas instead.
- If structural clarity requires separation, rewrite the sentence instead of using a dash.
- Never substitute with double hyphens.

This rule applies to:

- Marketing copy
- UI text
- Documentation
- Code comments
- Metadata

---

## Reference Images

- If a reference image is provided: match layout, spacing, typography, and color exactly.
- Swap in placeholder content only where real content is not provided.
- Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).

When visual comparison is required:

- View output at localhost:3000 (or relevant route).
- Compare visually.
- Fix mismatches.
- Repeat until layout and spacing align with reference or user approves.

Do not create separate static demo HTML files unless explicitly requested.

All demos must be built as proper Next routes (e.g. `/demo`).

---

## Demo & Experimental Pages

- If creating a demo concept, build it inside:

app/demo/page.tsx

- Never use standalone hero-demo.html.
- Never spin up a separate static server for demos.
- All previewing must happen within the Next dev server.

---

## Output Defaults

- Use proper Next.js file structure.
- Use components inside `/app/components` when appropriate.
- No single index.html file unless explicitly requested.
- No Tailwind CDN script tags.
- Use installed Tailwind configuration.
- Mobile-first responsive.

### Component Structure

Reusable UI components must live in:

/app/components/

Typical structure:

/app/components
  Hero.tsx
  Section.tsx
  ServiceCard.tsx
  Button.tsx
  Card.tsx

Page-specific components may remain inside their page folder.

---

## Brand Assets

- Always check the `brand_assets/` folder before designing.
- If assets exist there, use them.
- If a logo is present, use it.
- If a color palette is defined, use exact values.
- Do not invent brand colors if official ones exist.

---

## Anti-Generic Guardrails

- Colors:
  - Never use default Tailwind palette as primary branding (no blue-600, indigo-500, etc.).
  - Derive from brand color system.

- Shadows:
  - Never use flat `shadow-md`.
  - Use layered, color-tinted shadows with low opacity.

- Typography:
  - Prefer a clear hierarchy between headings and body text.
  - Apply tight tracking (-0.03em) on large headings.
  - Use generous body line-height (~1.7).

- Gradients:
  - Layer multiple radial gradients.
  - Add subtle depth where appropriate.
  - Do not overuse noise or texture unless aligned with brand.

- Animations:
  - Only animate transform and opacity.
  - Never use transition-all.
  - Use subtle easing.
  - No unnecessary motion.

- Interactive states:
  - Every clickable element must have hover, focus-visible, and active states.

- Images:
  - Use overlays intentionally.
  - Ensure contrast and readability.
  - Use next/image for all images unless explicitly instructed otherwise.

Images must include:

- width
- height
- alt text

- Spacing:
  - Use consistent spacing tokens.
  - Avoid arbitrary Tailwind steps.

### Layout Containers

All sections should use a consistent container pattern:

max-w-7xl  
mx-auto  
px-6 (mobile)  
px-8 (desktop)

Vertical section spacing:

py-20 (mobile)  
py-28 (desktop)

- Depth:
  - Implement clear layering hierarchy (base → elevated → floating).

---

## Mobile-First Rule

- All UI work must be mobile-first.
- Desktop and mobile traffic are expected to be roughly equal.
- Every component must be visually correct and functional at both sizes.
- Validate layouts at small and large breakpoints.

---

## Hard Rules

- Do not add sections, features, or content not requested.
- Do not “improve” reference designs unless instructed.
- Do not start additional dev servers.
- Do not run background processes.
- Do not use transition-all.
- Do not use default Tailwind blue/indigo as primary brand color.
- Do not push changes to GitHub until explicitly instructed.

---

## Deployment Discipline

- Local development only via npm run dev.
- Production deploys handled via Git push to main and Vercel.
- No automated pushes.
- Wait for user instruction before committing or pushing.