import { HardHat, TrafficCone, ShieldCheck, Users, ClipboardList, Briefcase } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { careerRoles, type CareerRoleIconName } from '../../../data/careerRoles'

const iconMap: Record<CareerRoleIconName, LucideIcon> = {
  trafficCone:   TrafficCone,
  hardHat:       HardHat,
  shieldCheck:   ShieldCheck,
  users:         Users,
  clipboardList: ClipboardList,
  briefcase:     Briefcase,
}

const row1 = careerRoles.filter(r => r.row === 1)
const row2 = careerRoles.filter(r => r.row === 2)

const CONNECTOR_COLOR = 'rgba(253,79,0,0.35)'

function MobileCard({ title, description, iconName }: { title: string; description: string; iconName: CareerRoleIconName }) {
  const Icon = iconMap[iconName]
  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm" style={{ padding: '20px 20px 24px' }}>
      <div className="flex items-center gap-3" style={{ marginBottom: '10px' }}>
        <div className="bg-orange-50" style={{ width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon width={18} height={18} stroke="var(--brand-primary)" strokeWidth={2} aria-hidden="true" />
        </div>
        <h3 className="font-display" style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--bg-dark)', margin: 0 }}>{title}</h3>
      </div>
      <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0 }}>{description}</p>
    </div>
  )
}


export default function CareerPath() {
  return (
    <>
      <style>{`
        .career-path-card {
          transition: transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.28s ease;
        }
        .career-path-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 12px 32px rgba(242,101,34,0.22), 0 32px 64px rgba(0,0,0,0.45);
        }
        .cp-card-content { padding-bottom: 6px; }
        .cp-connector { display: none; }
        @media (min-width: 768px) {
          .cp-connector { display: block; }
          .cp-card-content { padding-bottom: 12px; }
        }
      `}</style>

      {/* Mobile: single flat column, all 6 cards */}
      <div className="md:hidden space-y-4">
        {[...row1, ...row2].map((step) => (
          <MobileCard key={step.title} title={step.title} description={step.description} iconName={step.iconName} />
        ))}
      </div>

      {/* Desktop: two rows with connectors */}
      <div className="hidden md:block">

        {/* Row 1: TTM Worker → STMS → Lead STMS */}
        <div style={{ position: 'relative' }}>
          <div
            className="cp-connector"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              right: '5%',
              height: '2px',
              background: CONNECTOR_COLOR,
              transform: 'translateY(-50%)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          <div className="grid grid-cols-3 gap-5" style={{ position: 'relative', zIndex: 1 }}>
            {row1.map((step) => (
              <div
                key={step.title}
                className="career-path-card h-[360px]"
                style={{
                  backgroundImage: `url('${step.image}')`,
                  backgroundSize: step.bgSize ?? 'cover',
                  backgroundPosition: step.bgPosition ?? 'center',
                  borderTop: '3px solid var(--brand-primary)',
                  borderRadius: '12px',
                  padding: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0) 100%)', zIndex: 0, pointerEvents: 'none' }} />
                <div className="cp-card-content" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                  <div style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', background: 'linear-gradient(to bottom, rgba(0,0,0,0.60), rgba(0,0,0,0.42))', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {(() => { const Icon = iconMap[step.iconName]; return <Icon width={20} height={20} stroke="var(--brand-primary)" strokeWidth={2} aria-hidden="true" style={{ flexShrink: 0 }} /> })()}
                      <h3 className="font-display" style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff', margin: 0 }}>{step.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.8rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', marginTop: '8px' }}>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical bridge */}
        <div
          aria-hidden="true"
          style={{ width: '2px', height: '28px', background: CONNECTOR_COLOR, margin: '0 auto' }}
        />

        {/* Row 2: Foreman → Operations Supervisor → Manager */}
        <div style={{ position: 'relative' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              right: '5%',
              height: '2px',
              background: CONNECTOR_COLOR,
              transform: 'translateY(-50%)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
          <div className="grid grid-cols-3 gap-5" style={{ position: 'relative', zIndex: 1 }}>
            {row2.map((step) => (
              <div
                key={step.title}
                className="career-path-card h-[360px]"
                style={{
                  backgroundImage: `url('${step.image}')`,
                  backgroundSize: step.bgSize ?? 'cover',
                  backgroundPosition: step.bgPosition ?? 'center',
                  borderTop: '3px solid var(--brand-primary)',
                  borderRadius: '12px',
                  padding: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0) 100%)', zIndex: 0, pointerEvents: 'none' }} />
                <div className="cp-card-content" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                  <div style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', background: 'linear-gradient(to bottom, rgba(0,0,0,0.60), rgba(0,0,0,0.42))', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {(() => { const Icon = iconMap[step.iconName]; return <Icon width={20} height={20} stroke="var(--brand-primary)" strokeWidth={2} aria-hidden="true" style={{ flexShrink: 0 }} /> })()}
                      <h3 className="font-display" style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff', margin: 0 }}>{step.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.8rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', marginTop: '8px' }}>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
