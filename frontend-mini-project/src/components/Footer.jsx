import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      style={{
        position: 'relative',
        zIndex: 1,
        marginTop: 80,
        padding: '32px 40px',
        borderTop: '1px solid rgba(0,200,255,0.1)',
        background: 'rgba(2,11,24,0.6)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="22" height="22" viewBox="0 0 28 28">
            <polygon points="14,2 24,8 24,20 14,26 4,20 4,8"
              fill="none" stroke="rgba(0,212,255,0.6)" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="3" fill="rgba(0,212,255,0.5)" />
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: 2, color: 'var(--cyan)' }}>
            BIOMETRIC AI
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-muted)',
          letterSpacing: 1,
          textAlign: 'center',
        }}>
          Behavioral Biometric Verification System · HMOG Dataset · 98 Users · 723 Sessions
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-dim)',
          letterSpacing: 1,
        }}>
          ROC-AUC 96.79% · All Modalities Fusion
        </div>
      </div>
    </motion.footer>
  )
}
