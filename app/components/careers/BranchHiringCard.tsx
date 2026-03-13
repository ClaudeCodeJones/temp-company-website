import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Branch, HiringStatus } from '../../../data/branches'
import { statusLabel } from '../../../data/branches'

const statusColors: Record<HiringStatus, { bg: string; text: string; dot: string }> = {
  hiring: {
    bg: 'rgba(34,197,94,0.1)',
    text: '#4ade80',
    dot: '#4ade80',
  },
  limited: {
    bg: 'rgba(251,191,36,0.1)',
    text: '#fbbf24',
    dot: '#fbbf24',
  },
  closed: {
    bg: 'rgba(239,68,68,0.1)',
    text: '#f87171',
    dot: '#f87171',
  },
}

export default function BranchHiringCard({ item }: { item: Branch }) {
  const colors = statusColors[item.hiringStatus]

  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: `3px solid ${item.hiringStatus === 'hiring' ? '#4ade80' : item.hiringStatus === 'limited' ? '#fbbf24' : '#f87171'}`,
        borderRadius: '2px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.28s ease',
      }}
      className="hiring-card hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(252,212,21,0.14)]"
    >
      {/* Header */}
      <div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '4px',
          }}
        >
          {item.region}
        </p>
        <h3
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          {item.name}
        </h3>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: colors.text,
            marginTop: '6px',
          }}
        >
          {statusLabel[item.hiringStatus]}
        </p>
      </div>

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

      {/* Roles */}
      {item.hiringRoles.length > 0 ? (
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>
            Roles Available
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {item.hiringRoles.map(role => {
              const borderColor =
                role === 'STMS (Practicing)' ? 'rgba(56,189,248,0.5)' :
                role === 'Casuals' ? 'rgba(167,139,250,0.5)' :
                'rgba(255,255,255,0.12)'
              return (
                <span
                  key={role}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.65)',
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${borderColor}`,
                    borderRadius: '2px',
                    padding: '4px 10px',
                  }}
                >
                  {role}
                </span>
              )
            })}
          </div>
        </div>
      ) : (
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.3)',
            fontStyle: 'italic',
          }}
        >
          No current openings
        </p>
      )}


      {/* CTA, separated with divider */}
      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {item.hiringStatus !== 'closed' ? (
          <>
            {/* Mobile: text link */}
            <Link
              href="/find-work"
              className="md:hidden inline-flex items-center gap-2 text-xs font-medium transition duration-200 hover:text-[#fcd415]"
              style={{ color: colors.text }}
            >
              Apply Now
              <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            {/* Desktop: full-width pill */}
            <Link
              href="/find-work"
              className="hidden md:inline-flex items-center justify-center gap-2 w-full rounded-full border bg-transparent px-8 text-xs font-medium transition duration-200 hover:text-[#fcd415] hover:border-[#fcd415]/60 active:scale-[0.98]"
              style={{ paddingTop: '14px', paddingBottom: '14px', color: colors.text, borderColor: `${colors.text}40` }}
            >
              Apply Now
              <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </>
        ) : (
          <>
            {/* Mobile: disabled text */}
            <span className="md:hidden inline-flex items-center gap-2 text-xs font-medium cursor-not-allowed select-none" style={{ color: colors.text }}>
              Apply Now
              <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
            </span>
            {/* Desktop: disabled pill */}
            <span className="hidden md:inline-flex items-center justify-center gap-2 w-full rounded-full border bg-transparent px-8 text-xs font-medium cursor-not-allowed select-none" style={{ paddingTop: '14px', paddingBottom: '14px', color: colors.text, borderColor: `${colors.text}40` }}>
              Apply Now
              <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </>
        )}
      </div>
    </div>
  )
}
