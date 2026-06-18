import { motion } from 'framer-motion'
import StatCard from '../components/StatCard'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

const dataStats = [
  { num: 98, label: 'Participants', color: 'var(--cyan)', icon: '👤' },
  { num: 723, label: 'Total Sessions', color: 'var(--blue)', icon: '📱' },
  { num: 4, label: 'Behavioral Events', color: 'var(--purple)', icon: '🎯' },
  { num: 24, label: 'Avg Sessions/User', color: 'var(--green)', icon: '📊' },
]

const eventTypes = [
  {
    name: 'Touch Events',
    icon: '👆',
    color: 'var(--cyan)',
    features: ['Touch pressure', 'Contact area', 'Duration', 'X/Y coordinates', 'Touch action type'],
    count: '~12,400 events',
  },
  {
    name: 'Scroll Events',
    icon: '📜',
    color: 'var(--blue)',
    features: ['Scroll velocity', 'Acceleration', 'Direction', 'Distance', 'Deceleration rate'],
    count: '~9,800 events',
  },
  {
    name: 'Stroke Events',
    icon: '✍️',
    color: '#a855f7',
    features: ['Trajectory path', 'Swipe speed', 'Curvature', 'Start/end points', 'Direction angle'],
    count: '~8,200 events',
  },
  {
    name: 'KeyPress Events',
    icon: '⌨️',
    color: 'var(--green)',
    features: ['Inter-key timing', 'Dwell time', 'Flight time', 'Key sequence', 'Typing rhythm'],
    count: '~15,600 events',
  },
]

const protocol = [
  { step: '01', title: 'Session Pairing', desc: 'Each user contributes multiple sessions. Genuine pairs = same user, Impostor pairs = different users.' },
  { step: '02', title: 'Feature Extraction', desc: 'Statistical, temporal and spatial features extracted per modality per session segment.' },
  { step: '03', title: 'Normalization', desc: 'Z-score normalization applied per feature to handle scale differences across modalities.' },
  { step: '04', title: 'Verification', desc: 'Cosine similarity + ML classifiers compare session feature vectors to produce a verification score.' },
]

export default function Dataset() {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 80px' }}>
      <motion.div {...fadeUp(0)}>
        <div className="section-label">Data Foundation</div>
      </motion.div>

      <motion.h1 {...fadeUp(0.1)} className="grad-cyan"
        style={{ fontSize: 'clamp(32px,4.5vw,58px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
        HMOG Dataset
      </motion.h1>
      <motion.p {...fadeUp(0.15)}
        style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 600, lineHeight: 1.8, marginBottom: 48 }}>
        Hand Movement, Orientation and Grasp — a comprehensive behavioral biometrics dataset
        collected from real smartphone users performing natural interaction tasks.
      </motion.p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 56 }}>
        {dataStats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={0.2 + i * 0.1} />
        ))}
      </div>

      {/* Event types label */}
      <motion.div {...fadeUp(0.3)}>
        <div style={{
          fontSize: 13, letterSpacing: 3, textTransform: 'uppercase',
          color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 20,
        }}>
          Captured Event Types
        </div>
      </motion.div>

      {/* Event type cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginBottom: 60 }}>
        {eventTypes.map((e, i) => (
          <motion.div
            key={e.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }}
            whileHover={{ y: -4, borderColor: `${e.color}55` }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glow)',
              borderRadius: 16,
              padding: '28px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}
          >
            <div style={{ position: 'absolute', bottom: -24, right: -24, width: 110, height: 110, borderRadius: '50%', background: `radial-gradient(circle, ${e.color}15, transparent 70%)` }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>{e.icon}</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: e.color }}>{e.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>{e.count}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {e.features.map(f => (
                <span key={f} style={{
                  fontSize: 13, fontFamily: 'var(--font-mono)',
                  padding: '5px 13px', borderRadius: 20,
                  background: `${e.color}12`,
                  color: e.color,
                  border: `1px solid ${e.color}30`,
                  letterSpacing: 0.5,
                }}>
                  {f}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Protocol */}
      <motion.div {...fadeUp(0.5)}>
        <div style={{
          fontSize: 16, letterSpacing: 3, textTransform: 'uppercase',
          color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 26,
        }}>
          Evaluation Protocol
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {protocol.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 + i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.3)' }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glow)',
                borderRadius: 14,
                padding: '30px 24px',
                position: 'relative',
                transition: 'all 0.3s',
              }}
            >
              {/* top cyan accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)',
                borderRadius: '14px 14px 0 0',
              }} />
              <div style={{
                fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--cyan)',
                letterSpacing: 2, marginBottom: 14,
              }}>
                STEP {p.step}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{p.title}</div>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.8, fontWeight: 300 }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
