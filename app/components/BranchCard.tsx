'use client'

import Link from 'next/link'
import type { Branch } from '../../data/branches'
import { ArrowRight, X } from 'lucide-react'

/** Re-export for consumers that import from this file */
export type { Branch as BranchCardData }

export default function BranchCard({
  branch,
  onClose,
}: {
  branch: Branch
  onClose: () => void
}) {
  return (
    <>
    <style>{`
      .bc-cta {
        background: transparent;
        border: 1px solid #fd4f00;
        color: #fd4f00;
        transition: background 220ms ease, color 220ms ease;
      }
      .bc-cta:hover {
        background: #fd4f00;
        color: #fff;
      }
    `}</style>
    <div
      className="relative flex flex-col transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(242,101,34,0.18)] hover:border-[#fd4f00]/40"
      style={{
        background: '#0D1B2A',
        borderRadius: '12px',
        boxShadow: '0 0 0 1px rgba(242,101,34,0.15), 0 4px 6px rgba(0,0,0,0.2), 0 24px 48px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.14)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div className="absolute top-0 left-0 h-[3px] w-full bg-[#fd4f00]" />

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close branch card"
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <X size={11} strokeWidth={1.5} aria-hidden="true" />
      </button>

      {/* Growing content area */}
      <div className="flex flex-col flex-grow" style={{ padding: '28px 28px 0' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fd4f00', marginBottom: '8px' }}>
          Branch
        </p>

        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '10px' }}>
          {branch.name}
        </h2>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.825rem', color: 'rgba(255,255,255,0.45)', marginBottom: '16px', lineHeight: 1.5 }}>
          {branch.address && branch.phone
            ? `${branch.address} | ${branch.phone}`
            : branch.address ?? branch.phone}
        </p>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '20px' }} />

        {branch.serviceAreas && branch.serviceAreas.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>
              Serving Areas
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {branch.serviceAreas.map(area => (
                <li key={area} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, paddingLeft: '12px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#fd4f00' }}>·</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '20px' }} />

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>
          {branch.managerRole}
        </p>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: '#fff', lineHeight: 1.4, marginBottom: '24px' }}>
          {branch.manager}
        </p>
      </div>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 28px 0' }} />

      <div style={{ padding: '20px 28px 28px' }}>
        <Link
          href="/estimate"
          className="btn-orange bc-cta"
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '11px 20px' }}
        >
          Get an Estimate
          <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </div>
    </>
  )
}
