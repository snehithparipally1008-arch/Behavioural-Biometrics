import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const isFloat = String(target).includes('.')
    const decimals = isFloat ? 2 : 0
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(parseFloat((target * eased).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return value
}

export default function StatCard({ num, suffix = '', label, color = 'var(--cyan)', delay = 0, icon }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const displayNum = useCountUp(parseFloat(num), 1600, visible)
  const isFloat = String(num).includes('.')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-glow)',
        borderRadius: 14,
        padding: '24px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Top accent bar */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
      />

      {/* Corner glow */}
      <div style={{
        position: 'absolute',
        bottom: -20, right: -20,
        width: 80, height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {icon && (
        <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      )}

      <div style={{
        fontSize: typeof num === 'string' ? 20 : 40,
        fontWeight: 800,
        fontFamily: typeof num !== 'string' ? 'var(--font-mono)' : 'var(--font-display)',
        fontVariantNumeric: 'tabular-nums',
        color,
        lineHeight: 1,
        marginBottom: 6,
        background: typeof num !== 'string'
          ? `linear-gradient(135deg, ${color}, #ffffff88)`
          : undefined,
        WebkitBackgroundClip: typeof num !== 'string' ? 'text' : undefined,
        WebkitTextFillColor: typeof num !== 'string' ? 'transparent' : undefined,
        backgroundClip: typeof num !== 'string' ? 'text' : undefined,
      }}>
        {typeof num === 'string'
          ? num
          : `${isFloat ? displayNum.toFixed(2) : Math.round(displayNum)}${suffix}`
        }
      </div>

      <div style={{
        fontSize: 11,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
      }}>
        {label}
      </div>
    </motion.div>
  )
}
