import type { CSSProperties } from 'react'

export const inputStyle: CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '2px',
  padding: '12px 16px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.9rem',
  color: '#fff',
  outline: 'none',
  appearance: 'none',
  colorScheme: 'dark',
}

export const labelStyle: CSSProperties = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-light)',
  marginBottom: '8px',
}

export const fieldStyle: CSSProperties = {
  marginBottom: '20px',
}
