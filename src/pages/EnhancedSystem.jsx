import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

/* ══════════════════════════════════
   ARCHITECTURE FLOW
══════════════════════════════════ */
const archNodes = [
  {
    id: 'apk',
    icon: '📱',
    title: 'Android APK',
    desc: 'Sensor event listener · Background service',
    color: 'rgba(0,255,136,0.4)',
    bg: 'rgba(0,255,136,0.05)',
    packet: 'sensor_data[]',
  },
  {
    id: 'raw',
    icon: '📊',
    title: 'Raw Events',
    desc: 'Touch · Scroll · Stroke · KeyPress logs',
    color: 'rgba(0,200,255,0.4)',
    bg: 'rgba(0,200,255,0.05)',
    packet: 'event_stream',
  },
  {
    id: 'feat',
    icon: '⚙️',
    title: 'Feature Extraction',
    desc: 'Statistical · Temporal · Spatial features',
    color: 'rgba(0,112,255,0.4)',
    bg: 'rgba(0,112,255,0.05)',
    packet: 'feature_vector',
  },
  {
    id: 'engine',
    icon: '🤖',
    title: 'Verification Engine',
    desc: 'One-Class SVM · Random Forest · Fusion',
    color: 'rgba(124,58,237,0.5)',
    bg: 'linear-gradient(135deg, rgba(0,112,255,0.1), rgba(124,58,237,0.12))',
    packet: 'similarity_score',
  },
  {
    id: 'decision',
    icon: '🎯',
    title: 'Authentication Decision',
    desc: 'Genuine · Impostor · Confidence output',
    color: 'rgba(168,85,247,0.4)',
    bg: 'rgba(168,85,247,0.06)',
    packet: null,
  },
]

function ArchConnector({ packet, index }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 0', gap: 3 }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--cyan)' }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35 + index * 0.1 }}
        />
      ))}
      {packet && (
        <motion.span
          style={{
            fontSize: 11, fontFamily: 'var(--font-mono)',
            color: 'var(--cyan)', letterSpacing: 1, marginTop: 2,
          }}
          animate={{ opacity: [0, 1, 0], y: [4, 0, -18] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.4 }}
        >
          {packet}
        </motion.span>
      )}
    </div>
  )
}

function ArchNode({ node, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
      whileHover={{ scale: 1.03, borderColor: node.color.replace('0.4', '0.8') }}
      style={{
        background: typeof node.bg === 'string' && node.bg.startsWith('linear')
          ? node.bg
          : node.bg,
        border: `1px solid ${node.color}`,
        borderRadius: 14,
        padding: '22px 40px',
        textAlign: 'center',
        width: 340,
        cursor: 'default',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: typeof node.bg === 'string' && !node.bg.startsWith('linear') ? node.bg : undefined }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 30, marginBottom: 8 }}>{node.icon}</div>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>{node.title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{node.desc}</div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════
   SIMULATOR
══════════════════════════════════ */
const sessionsA = [
  { id: 1, label: 'Session 001', user: 'User 023', modality: 'Touch' },
  { id: 2, label: 'Session 045', user: 'User 007', modality: 'Scroll' },
  { id: 3, label: 'Session 112', user: 'User 091', modality: 'KeyPress' },
  { id: 4, label: 'Session 299', user: 'User 055', modality: 'Stroke' },
]
const sessionsB = [
  { id: 1, label: 'Session 002', user: 'User 023', modality: 'Touch' },
  { id: 2, label: 'Session 046', user: 'User 099', modality: 'Scroll' },
  { id: 3, label: 'Session 113', user: 'User 044', modality: 'KeyPress' },
  { id: 4, label: 'Session 300', user: 'User 088', modality: 'Stroke' },
]

const genuinePairs = new Set(['1-1', '1-3', '3-1'])

function SessionBtn({ s, selected, onClick }) {
  return (
    <motion.button
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        background: selected ? 'rgba(0,212,255,0.08)' : 'var(--bg-card2)',
        border: `1px solid ${selected ? 'rgba(0,212,255,0.5)' : 'var(--border-glow)'}`,
        borderRadius: 12,
        padding: '15px 18px',
        cursor: 'pointer',
        fontFamily: 'var(--font-display)',
        fontSize: 15, fontWeight: 700,
        color: selected ? 'var(--cyan)' : 'var(--text-primary)',
        letterSpacing: 0.5,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transition: 'all 0.25s',
      }}
    >
      <motion.div
        animate={selected ? { opacity: [1, 0.4, 1] } : { opacity: 0.3 }}
        transition={selected ? { duration: 1.5, repeat: Infinity } : {}}
        style={{
          width: 7, height: 7, borderRadius: '50%',
          background: selected ? 'var(--cyan)' : 'var(--text-dim)',
          boxShadow: selected ? '0 0 8px var(--cyan)' : 'none',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{s.label} · {s.user}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{s.modality} events</div>
      </div>
    </motion.button>
  )
}

function ScanEffect() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 16, pointerEvents: 'none' }}>
      <motion.div
        style={{
          position: 'absolute', left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
        }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  )
}

function ResultDisplay({ result, score, confidence, analyzing }) {
  if (analyzing) {
    return (
      <div style={{ textAlign: 'center', position: 'relative', width: '100%' }}>
        <ScanEffect />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ fontSize: 48, marginBottom: 16, display: 'inline-block' }}
        >
          ⚙️
        </motion.div>
        <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: 'var(--cyan)', letterSpacing: 2 }}>
          ANALYZING SESSIONS...
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
          {['EXTRACT', 'COMPARE', 'DECIDE'].map((s, i) => (
            <motion.span
              key={s}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4 }}
              style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: 2 }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
        <div style={{ fontSize: 52, marginBottom: 16, opacity: 0.4 }}>🔐</div>
        <p style={{ fontSize: 13, fontFamily: 'var(--font-mono)', letterSpacing: 1, lineHeight: 1.6 }}>
          Select sessions and click<br />VERIFY IDENTITY to run analysis
        </p>
      </div>
    )
  }

  const isGenuine = result === 'genuine'
  const color = isGenuine ? 'var(--green)' : 'var(--red)'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ textAlign: 'center', width: '100%' }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ fontSize: 52, marginBottom: 12, filter: `drop-shadow(0 0 14px ${color})` }}
      >
        {isGenuine ? '🛡️' : '⚠️'}
      </motion.div>

      <div style={{
        fontSize: 48, fontWeight: 800, color,
        fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: 8,
        textShadow: `0 0 20px ${color}60`,
      }}>
        {score}
      </div>

      <div style={{ fontSize: 18, fontWeight: 700, color, letterSpacing: 2, marginBottom: 6 }}>
        {isGenuine ? '✓ GENUINE USER' : '✗ IMPOSTOR DETECTED'}
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: 1, marginBottom: 16 }}>
        {isGenuine ? 'Identity verified — sessions match' : 'Identity mismatch — sessions differ'}
      </div>

      {/* confidence bar */}
      <div style={{ width: '60%', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Confidence</span>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color }}>{confidence}%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            style={{
              height: '100%', borderRadius: 3,
              background: isGenuine
                ? 'linear-gradient(90deg, #00ff88, #00cc66)'
                : 'linear-gradient(90deg, #ff4444, #cc0000)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════
   MAIN PAGE
══════════════════════════════════ */
export default function EnhancedSystem() {
  const [selA, setSelA] = useState(1)
  const [selB, setSelB] = useState(1)
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(null)
  const [confidence, setConfidence] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)

  const runVerification = () => {
    setAnalyzing(true)
    setResult(null)
    setTimeout(() => {
      const key = `${selA}-${selB}`
      const isGenuine = genuinePairs.has(key)
      let s, conf
      if (isGenuine) {
        s = (Math.random() * 0.12 + 0.82).toFixed(3)
        conf = Math.round(parseFloat(s) * 100)
      } else {
        s = (Math.random() * 0.18 + 0.14).toFixed(3)
        conf = Math.round((1 - parseFloat(s)) * 88)
      }
      setScore(s)
      setConfidence(conf)
      setResult(isGenuine ? 'genuine' : 'impostor')
      setAnalyzing(false)
    }, 2400)
  }

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 80px' }}>

      {/* ── ARCHITECTURE ── */}
      <motion.div {...fadeUp(0)}>
        <div className="section-label">System Architecture</div>
        <h1 className="grad-green"
          style={{ fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          APK Integration Pipeline
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 580, lineHeight: 1.7, marginBottom: 52 }}>
          End-to-end data flow from raw Android sensor capture to final authentication decision.
          Each stage processes and transforms behavioral signals.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start', marginBottom: 80 }}>
        {/* left: flow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {archNodes.map((node, i) => (
            <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <ArchNode node={node} index={i} />
              {i < archNodes.length - 1 && (
                <ArchConnector packet={node.packet} index={i} />
              )}
            </div>
          ))}
        </div>

        {/* right: feature categories + data chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <motion.div {...fadeUp(0.3)} className="glass-sm" style={{ padding: 24 }}>
            <div style={{
              fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 16,
            }}>
              Feature Categories
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '📐', title: 'Statistical', desc: 'Mean, std, min, max, skewness, kurtosis', color: 'var(--cyan)' },
                { icon: '⏱️', title: 'Temporal', desc: 'Inter-event timing, dwell, flight time', color: 'var(--blue)' },
                { icon: '📍', title: 'Spatial', desc: 'Coordinates, velocity, acceleration, area', color: '#a855f7' },
                { icon: '🔗', title: 'Cross-modal', desc: 'Fusion scores, session-level aggregates', color: 'var(--green)' },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px',
                    background: `${f.color}08`,
                    border: `1px solid ${f.color}20`,
                    borderRadius: 10,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: f.color }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.45)} className="glass-sm" style={{ padding: 24 }}>
            <div style={{
              fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 14,
            }}>
              Live Data Packet Flow
            </div>
            {[
              ['sensor_data', '→', 'event_log', '→', 'feature_vec'],
              ['similarity', '→', 'fusion_score', '→', 'decision'],
            ].map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 8, marginBottom: ri === 0 ? 10 : 0, flexWrap: 'wrap' }}>
                {row.map((item, ii) => (
                  item === '→'
                    ? <span key={ii} style={{ color: 'var(--text-dim)', fontSize: 16, alignSelf: 'center' }}>→</span>
                    : (
                      <motion.span
                        key={ii}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: (ri * 3 + ii) * 0.3 }}
                        style={{
                          fontSize: 13, fontFamily: 'var(--font-mono)',
                          padding: '5px 13px', borderRadius: 20,
                          background: 'rgba(0,212,255,0.08)',
                          color: 'var(--cyan)',
                          border: '1px solid rgba(0,212,255,0.2)',
                          letterSpacing: 0.5,
                        }}
                      >
                        {item}
                      </motion.span>
                    )
                ))}
              </div>
            ))}
          </motion.div>

          {/* ML models */}
          <motion.div {...fadeUp(0.55)} className="glass-sm" style={{ padding: 24 }}>
            <div style={{
              fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 14,
            }}>
              Classifiers Used
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { name: 'One-Class SVM', color: '#a855f7', icon: '🔵' },
                { name: 'Random Forest', color: 'var(--green)', icon: '🌲' },
                { name: 'Score Fusion', color: 'var(--cyan)', icon: '⚡' },
                { name: 'Cosine Sim.', color: 'var(--blue)', icon: '📐' },
              ].map(m => (
                <div key={m.name} style={{
                  padding: '12px 14px',
                  background: `${m.color}0a`,
                  border: `1px solid ${m.color}25`,
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: 20 }}>{m.icon}</span>
                  <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: m.color }}>{m.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* divider */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,200,255,0.2), transparent)', marginBottom: 80 }} />

      {/* ── SIMULATOR ── */}
      <motion.div {...fadeUp(0.1)}>
        <div className="section-label">Authentication Simulator</div>
        <h2 className="grad-cyan"
          style={{ fontSize: 'clamp(24px,3.5vw,44px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          Live Verification Demo
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
          Select two sessions and run the verification engine to see the authentication decision in real time.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'start' }}>
        {/* controls */}
        <motion.div
          {...fadeUp(0.2)}
          className="glass"
          style={{ padding: 28 }}
        >
          <div style={{
            fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
            color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 18,
          }}>
            Session Selection
          </div>

          <div style={{ fontSize: 14, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: 12, letterSpacing: 1 }}>
            Session A — Enrollment:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {sessionsA.map(s => (
              <SessionBtn key={s.id} s={s} selected={selA === s.id} onClick={() => { setSelA(s.id); setResult(null) }} />
            ))}
          </div>

          <div style={{ fontSize: 14, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: 12, letterSpacing: 1 }}>
            Session B — Probe:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {sessionsB.map(s => (
              <SessionBtn key={s.id} s={s} selected={selB === s.id} onClick={() => { setSelB(s.id); setResult(null) }} />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(0,128,255,0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={runVerification}
            disabled={analyzing}
            style={{
              width: '100%',
              padding: '15px',
              background: analyzing
                ? 'rgba(30,40,60,0.5)'
                : 'linear-gradient(135deg, rgba(0,112,255,0.3), rgba(124,58,237,0.3))',
              border: '1px solid rgba(0,112,255,0.5)',
              borderRadius: 12,
              color: analyzing ? 'var(--text-muted)' : 'var(--cyan)',
              fontFamily: 'var(--font-display)',
              fontSize: 14, fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {analyzing ? '⏳ ANALYZING...' : '⚡ VERIFY IDENTITY'}
          </motion.button>
        </motion.div>

        {/* result panel */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            background: result === 'genuine'
              ? 'linear-gradient(135deg, rgba(0,255,136,0.04), rgba(6,20,45,0.75))'
              : result === 'impostor'
                ? 'linear-gradient(135deg, rgba(255,68,68,0.05), rgba(6,20,45,0.75))'
                : 'var(--bg-card)',
            border: result === 'genuine'
              ? '1px solid rgba(0,255,136,0.3)'
              : result === 'impostor'
                ? '1px solid rgba(255,68,68,0.3)'
                : '1px solid var(--border-glow)',
            borderRadius: 16,
            padding: 36,
            minHeight: 380,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.5s',
          }}
        >
          <AnimatePresence mode="wait">
            <ResultDisplay
              key={analyzing ? 'loading' : result || 'idle'}
              result={result}
              score={score}
              confidence={confidence}
              analyzing={analyzing}
            />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* footer info box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: 60,
          padding: '28px 36px',
          background: 'linear-gradient(135deg, rgba(0,112,255,0.07), rgba(124,58,237,0.07))',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: 16, textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 10, letterSpacing: 3, color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
          Research Project
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
          Behavioral Biometric Verification System
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: 1 }}>
          HMOG Dataset · 98 Users · 723 Sessions · 4 Behavioral Events · ROC-AUC 96.79%
        </div>
      </motion.div>
    </section>
  )
}
