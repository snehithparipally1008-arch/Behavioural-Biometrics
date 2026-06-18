import { motion } from 'framer-motion'
import ModalityCard from '../components/ModalityCard'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from 'recharts'

const modalities = [
  {
    name: 'Touch',
    icon: '👆',
    color: 'var(--cyan)',
    desc: 'Pressure, area, duration & position of finger contact events',
    badge: '2nd Strongest',
    badgeColor: 'var(--cyan)',
  },
  {
    name: 'Scroll',
    icon: '📜',
    color: 'var(--blue)',
    desc: 'Velocity, acceleration & direction of scrolling gestures',
    badge: 'Moderate',
    badgeColor: 'var(--blue)',
  },
  {
    name: 'Stroke',
    icon: '✍️',
    color: '#a855f7',
    desc: 'Swipe trajectory, speed & curvature of gesture paths',
    badge: 'Moderate',
    badgeColor: '#a855f7',
  },
  {
    name: 'KeyPress',
    icon: '⌨️',
    color: 'var(--green)',
    desc: 'Inter-key timing, dwell time & typing rhythm patterns',
    badge: '★ Strongest',
    badgeColor: 'var(--green)',
  },
]

const radarData = [
  { subject: 'KeyPress', A: 95, B: 79 },
  { subject: 'Touch', A: 89, B: 79 },
  { subject: 'Stroke', A: 78, B: 79 },
  { subject: 'Scroll', A: 73, B: 79 },
]

const customTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(4,16,35,0.95)',
        border: '1px solid rgba(0,212,255,0.3)',
        borderRadius: 8, padding: '10px 16px',
        fontFamily: 'var(--font-mono)', fontSize: 13,
        color: 'var(--text-primary)',
      }}>
        {payload.map(p => (
          <div key={p.name} style={{ color: p.color }}>
            {p.dataKey === 'A' ? 'Individual' : 'Baseline'}: {p.value}%
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Modalities() {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 80px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Behavioral Modalities</div>
        <h1 className="grad-cyan"
          style={{ fontSize: 'clamp(32px,4.5vw,58px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          4 Interaction Channels
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 600, lineHeight: 1.8, marginBottom: 48 }}>
          Each modality captures a unique dimension of user behavior during natural smartphone interaction.
          Combined, they form a powerful multi-modal identity fingerprint.
        </p>
      </motion.div>

      {/* Modality cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, marginBottom: 52 }}>
        {modalities.map((m, i) => (
          <ModalityCard key={m.name} {...m} delay={0.1 + i * 0.1} />
        ))}
      </div>

      {/* Highlight banners */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ display: 'flex', gap: 16, marginBottom: 48 }}
      >
        {[
          { label: '★ KeyPress is the Strongest Modality', color: 'var(--green)', bg: 'rgba(0,255,136,0.05)', border: 'rgba(0,255,136,0.2)' },
          { label: '⬡ Touch is the Second Strongest Modality', color: 'var(--cyan)', bg: 'rgba(0,212,255,0.05)', border: 'rgba(0,212,255,0.2)' },
        ].map(h => (
          <div key={h.label} style={{
            flex: 1,
            padding: '18px 24px',
            background: h.bg,
            border: `1px solid ${h.border}`,
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 16,
            color: h.color,
            letterSpacing: 0.5,
          }}>
            {h.label}
          </div>
        ))}
      </motion.div>

      {/* Radar + strength bars */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="glass"
        style={{ padding: 40 }}
      >
        <div style={{
          fontSize: 13, letterSpacing: 3, textTransform: 'uppercase',
          color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 32,
        }}>
          Modality Strength Comparison
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>

          {/* Radar chart */}
          <div style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 16, right: 48, bottom: 16, left: 48 }}>
                <PolarGrid stroke="rgba(0,180,255,0.15)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'var(--text-muted)', fontSize: 15, fontFamily: 'var(--font-mono)' }}
                />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="rgba(0,212,255,0.9)"
                  fill="rgba(0,212,255,0.12)"
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: 'var(--cyan)' }}
                />
                <Radar
                  name="Baseline"
                  dataKey="B"
                  stroke="rgba(124,58,237,0.5)"
                  fill="rgba(124,58,237,0.05)"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
                <Tooltip content={customTooltip} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Strength bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { name: 'KeyPress', score: 95, color: 'var(--green)', note: 'Strongest — typing rhythm biometrics' },
              { name: 'Touch', score: 89, color: 'var(--cyan)', note: 'Rich pressure & spatial features' },
              { name: 'Stroke', score: 78, color: '#a855f7', note: 'Swipe trajectory patterns' },
              { name: 'Scroll', score: 73, color: 'var(--blue)', note: 'Velocity & acceleration patterns' },
            ].map(m => (
              <motion.div
                key={m.name}
                whileHover={{ x: 5 }}
                style={{
                  padding: '16px 20px',
                  background: `${m.color}08`,
                  border: `1px solid ${m.color}22`,
                  borderRadius: 12,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: m.color }}>{m.name}</span>
                  <span style={{ fontSize: 16, fontFamily: 'var(--font-mono)', fontWeight: 700, color: m.color }}>{m.score}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.score}%` }}
                    transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
                    style={{ height: '100%', borderRadius: 3, background: m.color }}
                  />
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {m.note}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
