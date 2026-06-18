import { motion } from 'framer-motion'
import StatCard from '../components/StatCard'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

function WorkflowNode({ children, color = 'var(--border-bright)', style = {}, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, borderColor: color }}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${color}`,
        borderRadius: 12,
        padding: '14px 28px',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 1,
        minWidth: 160,
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedArrow({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.4, delay }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        padding: '4px 0',
      }}
    >
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--cyan)' }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  )
}

const infoCards = [
  {
    title: 'Project Goal',
    text: 'Build a continuous authentication system that verifies smartphone users through behavioral biometrics — no passwords, no active authentication steps required.',
  },
  {
    title: 'Problem Statement',
    text: 'Traditional one-time authentication fails against session hijacking. Behavioral biometrics enable continuous passive verification after initial login.',
  },
  {
    title: 'HMOG Dataset',
    text: 'Hand Movement, Orientation & Grasp dataset. 98 users, 723 sessions captured via sensor logging. Touch, scroll, stroke, and keypress interactions at raw event level.',
  },
  {
    title: 'Verification Approach',
    text: 'Pair-wise session verification using extracted behavioral features combined with One-Class SVM & Random Forest fusion. Sessions labeled as Genuine or Impostor pairs.',
  },
]

export default function Dashboard() {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 40px 80px' }}>
      {/* Hero */}
      <motion.div {...fadeUp(0)}>
        <div className="section-label">Behavioral Biometrics · HMOG Dataset</div>
      </motion.div>

      <motion.div
        {...fadeUp(0.1)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--cyan)',
          border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 20,
          padding: '5px 14px',
          marginBottom: 24,
          letterSpacing: 2,
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >●</motion.span>
        CONTINUOUS USER VERIFICATION SYSTEM
      </motion.div>

      <motion.h1
        {...fadeUp(0.15)}
        className="grad-cyan"
        style={{ fontSize: 'clamp(30px,5vw,60px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}
      >
        Behavioral Biometric<br />Verification System
      </motion.h1>

      <motion.p
        {...fadeUp(0.2)}
        style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 560, lineHeight: 1.7, marginBottom: 52 }}
      >
        Continuous smartphone user verification using behavioral biometrics —
        passively authenticating users through natural interaction patterns without any active involvement.
      </motion.p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 64 }}>
        <StatCard num={98} label="Users" color="var(--cyan)" delay={0.25} icon="👤" />
        <StatCard num={723} label="Sessions" color="var(--blue)" delay={0.35} icon="📱" />
        <StatCard num={4} label="Behavioral Events" color="var(--purple)" delay={0.45} icon="⚡" />
        <StatCard num="Verification" suffix="" label="Authentication Mode" color="var(--green)" delay={0.55} icon="🔐" />
      </div>

      {/* Workflow */}
      <motion.div {...fadeUp(0.3)} className="glass" style={{ padding: 36, marginBottom: 40 }}>
        <div style={{
          fontSize: 13, letterSpacing: 3, textTransform: 'uppercase',
          color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 28,
        }}>
          Verification Engine Workflow
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {/* Sessions row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 4 }}>
            <WorkflowNode delay={0.35} color="rgba(0,212,255,0.4)">📱 Session A</WorkflowNode>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: 22, color: 'var(--text-muted)', fontWeight: 300 }}
            >+</motion.span>
            <WorkflowNode delay={0.4} color="rgba(0,212,255,0.4)">📱 Session B</WorkflowNode>
          </div>

          <AnimatedArrow delay={0.45} />

          {/* Engine */}
          <WorkflowNode
            delay={0.5}
            color="rgba(124,58,237,0.5)"
            style={{
              background: 'linear-gradient(135deg, rgba(0,112,255,0.15), rgba(124,58,237,0.15))',
              minWidth: 280,
            }}
          >
            <div style={{ fontWeight: 700 }}>⚡ Verification Engine</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, fontFamily: 'var(--font-mono)', fontWeight: 400 }}>
              Feature Extraction + ML Scoring
            </div>
          </WorkflowNode>

          <AnimatedArrow delay={0.55} />

          {/* Decision row */}
          <div style={{ display: 'flex', gap: 32 }}>
            <WorkflowNode delay={0.6} color="rgba(0,255,136,0.5)" style={{ color: 'var(--green)' }}>
              ✓ Genuine User
            </WorkflowNode>
            <WorkflowNode delay={0.65} color="rgba(255,68,68,0.5)" style={{ color: 'var(--red)' }}>
              ✗ Impostor
            </WorkflowNode>
          </div>
        </div>
      </motion.div>

      {/* Info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
        {infoCards.map((card, i) => (
          <motion.div
            key={card.title}
            {...fadeUp(0.4 + i * 0.1)}
            whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.3)' }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glow)',
              borderRadius: 14,
              padding: 24,
              transition: 'border-color 0.3s',
            }}
          >
            <div style={{
              fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 10,
            }}>
              {card.title}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, fontFamily: 'var(--font-mono)', fontWeight: 300 }}>
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
