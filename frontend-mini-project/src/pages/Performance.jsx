import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, AreaChart, Area, Cell,
} from 'recharts'

/* ── helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

function useCountUp(target, duration = 1600, trigger = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const isFloat = String(target).includes('.')
    const dec = isFloat ? 2 : 0
    let st = null
    const step = (ts) => {
      if (!st) st = ts
      const prog = Math.min((ts - st) / duration, 1)
      const ease = 1 - Math.pow(1 - prog, 3)
      setVal(parseFloat((target * ease).toFixed(dec)))
      if (prog < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, trigger])
  return val
}

/* ── custom tooltip ── */
const GlassTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(2,11,28,0.96)',
      border: '1px solid rgba(0,212,255,0.3)',
      borderRadius: 8, padding: '8px 14px',
      fontFamily: 'var(--font-mono)', fontSize: 12,
      color: 'var(--text-primary)',
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color || 'var(--cyan)' }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

/* ── animated metric card ── */
function MetricCard({ label, value, suffix = '%', color, desc, barColor, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const displayed = useCountUp(parseFloat(value), 1600, visible)
  const isFloat = String(value).includes('.')

  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-glow)',
        borderRadius: 14,
        padding: '22px 16px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* top bar */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
      {/* bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: barColor || color, opacity: 0.8, borderRadius: '0 0 14px 14px',
      }} />
      {/* corner glow */}
      <div style={{
        position: 'absolute', bottom: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
      }} />

      <div style={{
        fontSize: 30, fontWeight: 800,
        fontFamily: 'var(--font-mono)',
        fontVariantNumeric: 'tabular-nums',
        background: `linear-gradient(135deg, ${color}, #ffffffaa)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        marginBottom: 4,
      }}>
        {isFloat ? displayed.toFixed(2) : Math.round(displayed)}{suffix}
      </div>
      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        {label}
      </div>
      {desc && (
        <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>
          {desc}
        </div>
      )}
    </motion.div>
  )
}

/* ── ROC curve data ── */
const rocData = Array.from({ length: 51 }, (_, i) => {
  const fpr = i / 50
  const tpr = Math.min(1, Math.pow(fpr, 0.11) * 0.95 + 0.87 * (1 - Math.exp(-9 * fpr)))
  return { fpr: parseFloat(fpr.toFixed(2)), tpr: parseFloat(Math.max(fpr, Math.min(1, tpr)).toFixed(3)) }
})

/* ── bar data ── */
const perfBarData = [
  { name: 'Accuracy', value: 89.93, fill: '#00d4ff' },
  { name: 'ROC-AUC', value: 96.79, fill: '#7c3aed' },
  { name: 'TAR', value: 87.55, fill: '#00ff88' },
  { name: 'FAR', value: 7.69, fill: '#ff4444' },
  { name: 'FRR', value: 12.45, fill: '#ffaa00' },
]

/* ── fusion configs ── */
const fusions = [
  {
    id: 1,
    label: 'Fusion 1',
    name: 'Touch + Scroll + Stroke',
    roc: 0.791,
    rocColor: 'var(--blue)',
    accent: 'rgba(0,112,255,0.7)',
    chartType: 'area',
  },
  {
    id: 2,
    label: 'Fusion 2',
    name: 'Touch + KeyPress',
    roc: 0.952,
    rocColor: 'var(--green)',
    accent: 'rgba(0,255,136,0.7)',
    chartType: 'hbar',
    hbarData: [
      { name: 'Touch', value: 89 },
      { name: 'KeyPress', value: 93 },
      { name: 'Fusion Score', value: 95.2 },
    ],
  },
  {
    id: 3,
    label: 'Fusion 3 — Best',
    name: 'All Modalities',
    roc: 0.968,
    rocColor: '#a855f7',
    accent: 'rgba(168,85,247,0.7)',
    chartType: 'compare',
    compareData: [
      { name: 'Fusion 1\nTouch+Scroll+Stroke', value: 0.791, fill: '#0070ff' },
      { name: 'Fusion 2\nTouch+KeyPress', value: 0.952, fill: '#00ff88' },
      { name: 'Fusion 3\nAll Modalities', value: 0.968, fill: '#a855f7' },
    ],
  },
]

/* ── fusion chart renderers ── */
const fusion1AreaData = [
  { modality: 'Touch', individual: 82, fused: 79 },
  { modality: 'Scroll', individual: 71, fused: 74 },
  { modality: 'Stroke', individual: 75, fused: 77 },
  { modality: 'Fusion', individual: 79, fused: 79 },
]

function FusionArea() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={fusion1AreaData} margin={{ left: 0, right: 16, top: 12, bottom: 4 }}>
        <defs>
          <linearGradient id="areaGradIndividual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0070ff" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#0070ff" stopOpacity={0.03} />
          </linearGradient>
          <linearGradient id="areaGradFused" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#00d4ff" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,255,0.08)" vertical={false} />
        <XAxis
          dataKey="modality"
          tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          domain={[60, 100]}
          tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
          tickFormatter={v => `${v}%`}
          axisLine={false} tickLine={false}
        />
        <Tooltip content={<GlassTooltip />} formatter={v => `${v}%`} />
        <Area
          type="monotone"
          dataKey="individual"
          name="Individual"
          stroke="#0070ff"
          strokeWidth={2.5}
          fill="url(#areaGradIndividual)"
          dot={{ r: 5, fill: '#0070ff', strokeWidth: 2, stroke: '#041020' }}
          activeDot={{ r: 7, fill: '#0070ff', boxShadow: '0 0 12px #0070ff' }}
        />
        <Area
          type="monotone"
          dataKey="fused"
          name="Fused Score"
          stroke="#00d4ff"
          strokeWidth={2}
          strokeDasharray="5 3"
          fill="url(#areaGradFused)"
          dot={{ r: 4, fill: '#00d4ff', strokeWidth: 2, stroke: '#041020' }}
          activeDot={{ r: 6, fill: '#00d4ff' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function FusionHBar({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} layout="vertical" margin={{ left: 80, right: 30, top: 8, bottom: 8 }}>
        <XAxis type="number" domain={[50, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
          tickFormatter={v => v + '%'} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
          axisLine={false} tickLine={false} width={80} />
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,255,0.07)" horizontal={false} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
          {data.map((_, i) => (
            <Cell key={i} fill={i === 2 ? '#00ff88' : i === 1 ? '#00d4ff' : '#0070ff'} />
          ))}
        </Bar>
        <Tooltip content={<GlassTooltip />} />
      </BarChart>
    </ResponsiveContainer>
  )
}

function FusionCompare({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ left: 20, right: 20, top: 10, bottom: 40 }}>
        <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
          axisLine={false} tickLine={false} interval={0}
          tickFormatter={v => v.split('\n')[0]} />
        <YAxis domain={[0.5, 1.0]} tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
          tickFormatter={v => v.toFixed(2)} axisLine={false} tickLine={false} />
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,255,0.07)" vertical={false} />
        <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={52}>
          {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
        </Bar>
        <Tooltip content={<GlassTooltip />} formatter={v => v.toFixed(3)} />
      </BarChart>
    </ResponsiveContainer>
  )
}

function FusionBlock({ fusion, index }) {
  const isBest = fusion.id === 3
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.15 }}
      style={{
        background: isBest
          ? 'linear-gradient(135deg, rgba(0,112,255,0.07), rgba(168,85,247,0.1))'
          : 'var(--bg-card)',
        border: `1px solid ${isBest ? 'rgba(168,85,247,0.35)' : 'var(--border-glow)'}`,
        borderRadius: 16,
        padding: '28px 28px 24px',
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* left accent stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 3,
        background: fusion.accent, borderRadius: '16px 0 0 16px',
      }} />

      {/* header */}
      <div style={{ marginBottom: 6 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 3,
          textTransform: 'uppercase', color: fusion.rocColor,
        }}>
          {fusion.label}
        </span>
      </div>
      <div style={{
        fontSize: 22, fontWeight: 700, marginBottom: 4,
        background: isBest
          ? 'linear-gradient(135deg, var(--cyan), #a855f7)'
          : undefined,
        WebkitBackgroundClip: isBest ? 'text' : undefined,
        WebkitTextFillColor: isBest ? 'transparent' : undefined,
        backgroundClip: isBest ? 'text' : undefined,
        color: isBest ? undefined : 'var(--text-primary)',
      }}>
        {fusion.name}
      </div>
      <div style={{
        fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 20,
      }}>
        ROC-AUC:{' '}
        <span style={{ color: fusion.rocColor, fontWeight: 600, fontSize: 15 }}>
          {fusion.roc}
        </span>
      </div>

      {/* chart */}
      {fusion.chartType === 'area' && <FusionArea />}
      {fusion.chartType === 'hbar' && <FusionHBar data={fusion.hbarData} />}
      {fusion.chartType === 'compare' && <FusionCompare data={fusion.compareData} />}
    </motion.div>
  )
}

/* ── main page ── */
export default function Performance() {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 80px' }}>
      {/* header */}
      <motion.div {...fadeUp(0)}>
        <div className="section-label">Model Performance</div>
        <h1 className="grad-purple"
          style={{ fontSize: 'clamp(28px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          Verification Results
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 580, lineHeight: 1.7, marginBottom: 48 }}>
          All Modalities Fusion · Best performing configuration evaluated on the HMOG protocol.
          ROC-AUC of <strong style={{ color: 'var(--purple)' }}>96.79%</strong> across 98 users and 723 sessions.
        </p>
      </motion.div>

      {/* 5 metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 44 }}>
        <MetricCard label="Accuracy" value="89.93" color="var(--cyan)"
          barColor="linear-gradient(90deg,var(--cyan),var(--blue))" desc="Overall correct" delay={0.1} />
        <MetricCard label="ROC-AUC" value="96.79" color="var(--purple)"
          barColor="linear-gradient(90deg,var(--purple),var(--cyan))" desc="Discrimination" delay={0.2} />
        <MetricCard label="FAR" value="7.69" color="#ff4444"
          barColor="linear-gradient(90deg,#ff4444,#ff8800)" desc="False Accept" delay={0.3} />
        <MetricCard label="FRR" value="12.45" color="#ffaa00"
          barColor="linear-gradient(90deg,#ffaa00,#ffdd00)" desc="False Reject" delay={0.4} />
        <MetricCard label="TAR" value="87.55" color="var(--green)"
          barColor="linear-gradient(90deg,var(--green),var(--cyan))" desc="True Accept" delay={0.5} />
      </div>

      {/* two charts side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 52 }}>

        {/* performance bar */}
        <motion.div {...fadeUp(0.35)} className="glass" style={{ padding: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
            Performance Overview
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={perfBarData} margin={{ left: 0, right: 10, top: 4, bottom: 4 }}>
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                axisLine={false} tickLine={false} />
              <YAxis domain={[0, 110]} tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                tickFormatter={v => v + '%'} axisLine={false} tickLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,255,0.07)" vertical={false} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
                {perfBarData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Bar>
              <Tooltip content={<GlassTooltip />} formatter={v => `${v}%`} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ROC curve */}
        <motion.div {...fadeUp(0.4)} className="glass" style={{ padding: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
            ROC Curve · AUC = 96.79%
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={rocData} margin={{ left: 0, right: 10, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,255,0.07)" />
              <XAxis dataKey="fpr" domain={[0, 1]}
                tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                axisLine={false} tickLine={false} label={{ value: 'FPR', position: 'insideBottom', fill: 'var(--text-muted)', fontSize: 11, dy: 8 }} />
              <YAxis domain={[0, 1]}
                tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                axisLine={false} tickLine={false} label={{ value: 'TPR', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11, dx: -4 }} />
              <Line type="monotone" dataKey="tpr" stroke="var(--cyan)" strokeWidth={2.5}
                dot={false} fill="rgba(0,212,255,0.1)" />
              {/* diagonal reference */}
              <Line
                data={[{ fpr: 0, tpr: 0 }, { fpr: 1, tpr: 1 }]}
                type="linear" dataKey="tpr" stroke="rgba(255,255,255,0.12)"
                strokeWidth={1} strokeDasharray="5 5" dot={false} />
              <Tooltip content={<GlassTooltip />} formatter={(v, n) => [v.toFixed(3), n === 'tpr' ? 'TPR' : n]} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ── FUSION RESULTS ── */}
      <motion.div {...fadeUp(0.45)} style={{ marginBottom: 28 }}>
        <div style={{
          fontSize: 13, letterSpacing: 3, textTransform: 'uppercase',
          color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 6,
        }}>
          Multi-Modal Fusion
        </div>
        <h2 style={{
          fontSize: 28, fontWeight: 800, marginBottom: 4,
          background: 'linear-gradient(135deg, var(--cyan), var(--blue))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Fusion Model Results
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 28, letterSpacing: 1 }}>
          // Multi-modal combination performance — ROC-AUC scores per fusion strategy
        </p>
      </motion.div>

      {fusions.map((f, i) => (
        <FusionBlock key={f.id} fusion={f} index={i} />
      ))}

      {/* summary row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 8,
        }}
      >
        {[
          { label: 'Touch+Scroll+Stroke', roc: '0.791', color: 'var(--blue)' },
          { label: 'Touch+KeyPress', roc: '0.952', color: 'var(--green)' },
          { label: 'All Modalities ★', roc: '0.968', color: '#a855f7' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--bg-card2)',
            border: `1px solid ${s.color}30`,
            borderRadius: 12, padding: '16px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{s.label}</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>{s.roc}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
