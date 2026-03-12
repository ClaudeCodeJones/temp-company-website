# Contractor Website Template

This repository is a reusable service-business website framework.

Stack
Next.js
TypeScript
Tailwind CSS
GitHub
Vercel

Core Systems
Dynamic location pages
Config-driven branding
Data-driven content
Secure forms (Turnstile, honeypot, validation)
SEO metadata structure
GEO-friendly location pages

---

## Starting a New Website

Clone the template:

git clone https://github.com/ClaudeCodeJones/contractor-site-template new-site-name

Open the project:

cd new-site-name
npm install
npm run dev

---

## Initial Setup

Edit these files first.

config/brand.ts
Update:

* company name
* domain
* phone
* email
* social links
* logo path

data/branches.ts
Update branch locations and contact details.

data/services.ts
Update service descriptions.

data/stats.ts
Update company statistics.

---

## Replace Placeholder Assets

Replace:

public/brand_assets/logo-placeholder.svg
public/images/hero.webp
public/services/*
public/roles/*

with images relevant to the new business.

---

## Environment Variables

Create:

.env.local

Add required variables for:

* Cloudflare Turnstile
* email service keys

Use `.env.local.example` as the reference.

---

## Deployment

Push to GitHub.

Connect the repository to Vercel.

Production builds will run automatically on push to `main`.

---

## Notes

The template already includes:

* dynamic location page routing
* SEO metadata structure
* security protections on forms
* responsive layout system

Do not modify the core architecture unless necessary.
