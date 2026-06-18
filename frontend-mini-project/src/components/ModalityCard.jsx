import { motion } from 'framer-motion'

// Mini visualizations per modality
function TouchViz() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, position: 'relative' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 40 + i * 20,
            height: 40 + i * 20,
            borderRadius: '50%',
            border: '1.5px solid rgba(0,212,255,0.5)',
          }}
          animate={{ scale: [0.5, 1.4], opacity: [0.9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
        />
      ))}
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyan)', zIndex: 1, boxShadow: '0 0 10px var(--cyan)' }} />
    </div>
  )
}

function ScrollViz() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', height: 52, justifyContent: 'center' }}>
      {[0, 1, 2, 3].map(i => (
        <motion.div
          key={i}
          style={{
            height: 2,
            borderRadius: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,112,255,0.8), transparent)',
          }}
          animate={{ width: ['16px', '56px', '16px'] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function StrokeViz() {
  return (
    <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="90" height="44" viewBox="0 0 90 44">
        <motion.path
          d="M 8 34 Q 24 10 44 22 Q 62 34 82 10"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="120"
          animate={{ strokeDashoffset: [120, 0, 120] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="82" cy="10" r="3"
          fill="#a855f7"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

function KeyViz() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', justifyContent: 'center', height: 52 }}>
      {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8].map((h, i) => (
        <motion.div
          key={i}
          style={{
            width: 10,
            borderRadius: 3,
            background: 'linear-gradient(to top, rgba(0,255,136,0.8), rgba(0,255,136,0.3))',
            border: '1px solid rgba(0,255,136,0.4)',
          }}
          animate={{ height: [6, h * 34, 6] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

const vizMap = {
  Touch: <TouchViz />,
  Scroll: <ScrollViz />,
  Stroke: <StrokeViz />,
  KeyPress: <KeyViz />,
}

export default function ModalityCard({ name, color, icon, desc, badge, badgeColor, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{
        y: -8,
        boxShadow: `0 0 32px ${color}30`,
        borderColor: `${color}88`,
        transition: { duration: 0.25 },
      }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-glow)',
        borderRadius: 16,
        padding: '24px 20px',
        textAlign: 'center',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: 'absolute', bottom: -30, right: -30,
        width: 100, height: 100, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ fontSize: 34, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: 1, color, marginBottom: 6 }}>{name}</div>
      <div style={{
        fontSize: 12, color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)', lineHeight: 1.5, marginBottom: 10,
      }}>{desc}</div>

      {/* Mini viz */}
      {vizMap[name]}

      {badge && (
        <div style={{
          display: 'inline-block',
          marginTop: 10,
          fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase',
          padding: '4px 12px',
          borderRadius: 20,
          fontFamily: 'var(--font-mono)',
          background: `${badgeColor}18`,
          color: badgeColor,
          border: `1px solid ${badgeColor}44`,
        }}>
          {badge}
        </div>
      )}
    </motion.div>
  )
}
