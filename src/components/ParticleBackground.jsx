import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, particles = [], orbs = [], dataNodes = []

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouse)

    // Particles
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.4,
        hue: Math.random() > 0.5 ? 195 : 220,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    // Floating glowing orbs
    for (let i = 0; i < 8; i++) {
      orbs.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 180 + 100,
        hue: [195, 215, 240, 280][Math.floor(Math.random() * 4)],
        opacity: Math.random() * 0.06 + 0.03,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // Data nodes (floating auth symbols)
    const symbols = ['●', '◆', '▲', '⬡', '◉', '⊕', '⊗', '⟐']
    for (let i = 0; i < 14; i++) {
      dataNodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vy: -0.22 - Math.random() * 0.18,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: Math.random() * 0.18 + 0.04,
        size: Math.random() * 8 + 8,
        hue: Math.random() > 0.5 ? 195 : 260,
      })
    }

    let streamLines = []
    for (let i = 0; i < 22; i++) {
      const angle = Math.random() * Math.PI * 2
      streamLines.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: Math.cos(angle) * (0.6 + Math.random() * 0.8),
        vy: Math.sin(angle) * (0.6 + Math.random() * 0.8),
        length: Math.random() * 120 + 80,
        hue: [195, 205, 220, 250][Math.floor(Math.random() * 4)],
        opacity: Math.random() * 0.05 + 0.02,
        width: Math.random() * 1.2 + 0.6,
      })
    }

    let frame = 0
    const draw = () => {
      frame++
      ctx.fillStyle = 'rgba(2, 11, 24, 0.28)'
      ctx.fillRect(0, 0, W, H)

      // Gradient mesh bg waves
      const t = frame * 0.003
      for (let i = 0; i < 3; i++) {
        const gx = W * 0.3 + Math.sin(t + i * 2.1) * W * 0.2
        const gy = H * 0.4 + Math.cos(t * 0.7 + i * 1.4) * H * 0.25
        const gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.35)
        gr.addColorStop(0, `hsla(${195 + i * 30}, 100%, 50%, 0.025)`)
        gr.addColorStop(1, 'transparent')
        ctx.fillStyle = gr
        ctx.fillRect(0, 0, W, H)
      }

      // Biometric wave pattern
      ctx.beginPath()
      ctx.moveTo(0, H * 0.5)
      for (let x = 0; x <= W; x += 3) {
        const y = H * 0.5
          + Math.sin(x * 0.008 + t * 2) * 28
          + Math.sin(x * 0.02 + t * 1.3) * 14
          + Math.sin(x * 0.005 + t * 0.8) * 8
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = `rgba(0,200,255,0.045)`
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Second wave offset
      ctx.beginPath()
      ctx.moveTo(0, H * 0.5)
      for (let x = 0; x <= W; x += 3) {
        const y = H * 0.5
          + Math.sin(x * 0.009 + t * 1.7 + 1) * 22
          + Math.sin(x * 0.018 + t * 2.1) * 10
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = `rgba(120, 0, 255, 0.03)`
      ctx.lineWidth = 1
      ctx.stroke()

      // Accent pulse wave
      ctx.beginPath()
      ctx.moveTo(0, H * 0.44)
      for (let x = 0; x <= W; x += 3) {
        const y = H * 0.44
          + Math.sin(x * 0.011 + t * 1.9) * 18
          + Math.sin(x * 0.015 + t * 0.9) * 12
        ctx.lineTo(x, y)
      }
      ctx.strokeStyle = `rgba(0, 255, 136, 0.03)`
      ctx.lineWidth = 1
      ctx.stroke()

      // Glowing orbs
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy
        if (o.x < -o.r) o.x = W + o.r
        if (o.x > W + o.r) o.x = -o.r
        if (o.y < -o.r) o.y = H + o.r
        if (o.y > H + o.r) o.y = -o.r
        const pulse = Math.sin(t * 1.2 + o.phase) * 0.4 + 0.6
        const gr = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * pulse)
        gr.addColorStop(0, `hsla(${o.hue}, 100%, 60%, ${o.opacity * pulse})`)
        gr.addColorStop(1, 'transparent')
        ctx.fillStyle = gr
        ctx.fillRect(o.x - o.r, o.y - o.r, o.r * 2, o.r * 2)
      })

      // Data stream streaks
      streamLines.forEach(line => {
        line.x += line.vx; line.y += line.vy
        if (line.x < -line.length) line.x = W + line.length
        if (line.x > W + line.length) line.x = -line.length
        if (line.y < -line.length) line.y = H + line.length
        if (line.y > H + line.length) line.y = -line.length
        const endX = line.x - line.vx * line.length
        const endY = line.y - line.vy * line.length
        const grad = ctx.createLinearGradient(line.x, line.y, endX, endY)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.6, `hsla(${line.hue}, 90%, 75%, ${line.opacity * 0.4})`)
        grad.addColorStop(1, 'transparent')
        ctx.strokeStyle = grad
        ctx.lineWidth = line.width
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      })

      // Particle network
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.opacity})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0,180,255,${(1 - d / 110) * 0.13})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      // Data nodes floating up
      ctx.save()
      dataNodes.forEach(n => {
        n.y += n.vy
        if (n.y < -20) {
          n.y = H + 20
          n.x = Math.random() * W
        }
        ctx.font = `${n.size}px monospace`
        ctx.fillStyle = `hsla(${n.hue}, 100%, 65%, ${n.opacity})`
        ctx.fillText(n.symbol, n.x, n.y)
      })
      ctx.restore()

      // Mouse reactive glow
      const { x: mx, y: my } = mouseRef.current
      if (mx && my) {
        const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 220)
        mg.addColorStop(0, 'rgba(0,128,255,0.055)')
        mg.addColorStop(1, 'transparent')
        ctx.fillStyle = mg
        ctx.fillRect(0, 0, W, H)
      }

      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
