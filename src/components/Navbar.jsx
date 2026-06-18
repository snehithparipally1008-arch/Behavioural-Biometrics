import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to: '/', label: 'Overview' },
  { to: '/dataset', label: 'Dataset' },
  { to: '/modalities', label: 'Modalities' },
  { to: '/performance', label: 'Performance' },
  { to: '/system', label: 'Architecture' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 48px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(2,11,24,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0,200,255,0.12)',
      }}
    >
      {/* Brand */}
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Animated hex logo */}
        <svg width="28" height="28" viewBox="0 0 28 28">
          <motion.polygon
            points="14,2 24,8 24,20 14,26 4,20 4,8"
            fill="none"
            stroke="rgba(0,212,255,0.8)"
            strokeWidth="1.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '14px 14px' }}
          />
          <circle cx="14" cy="14" r="4" fill="rgba(0,212,255,0.6)" />
          <circle cx="14" cy="14" r="2" fill="#00d4ff" />
        </svg>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: '3px',
          color: 'var(--cyan)',
          textTransform: 'uppercase',
        }}>
          BiometricAI
        </span>
      </motion.div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 4 }}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Status indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-muted)',
        letterSpacing: 1,
      }}>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: 7, height: 7,
            borderRadius: '50%',
            background: 'var(--green)',
            boxShadow: '0 0 8px var(--green)',
          }}
        />
        SYSTEM ONLINE
      </div>
    </motion.nav>
  )
}
