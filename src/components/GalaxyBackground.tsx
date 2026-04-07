"use client"

import { useEffect, useRef, useState } from "react"

interface Star {
  x: number
  y: number
  r: number
  a: number
  s: number
  g: boolean
}

interface Comet {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  life: number
  active: boolean
}

interface Flare {
  angle: number
  life: number
  active: boolean
}

interface Nebula {
  x: number
  y: number
  r: number
  color: string
  phase: number
  speed: number
  dx: number
  dy: number
}

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const cometsRef = useRef<Comet[]>([])
  const flaresRef = useRef<Flare[]>([])
  const nebulaeRef = useRef<Nebula[]>([])
  const timeRef = useRef(0)
  const [scroll, setScroll] = useState(0)

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScroll(maxScroll > 0 ? window.scrollY / maxScroll : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // All canvas animations
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const w = canvas.width
      const h = canvas.height
      timeRef.current = 0

      // === STARS: 220 stars with realistic twinkle ===
      if (starsRef.current.length === 0) {
        for (let i = 0; i < 220; i++) {
          starsRef.current.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.6 + 0.2,
            a: Math.random() * Math.PI * 2,
            s: 0.003 + Math.random() * 0.012,
            g: Math.random() > 0.72,
          })
        }
      }

      // === COMETS: 4 comets, initially staggered ===
      cometsRef.current = []
      for (let i = 0; i < 5; i++) {
        cometsRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.5,
          vx: (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 3),
          vy: 0.3 + Math.random() * 1.2,
          len: 40 + Math.random() * 80,
          life: Math.random(),
          active: Math.random() > 0.5,
        })
      }

      // === SOLAR FLARES: 6 rays from the crown ===
      flaresRef.current = []
      for (let i = 0; i < 6; i++) {
        flaresRef.current.push({
          angle: (Math.PI * 2 * i) / 6 + Math.random() * 0.3,
          life: 0,
          active: false,
        })
      }

      // === NEBULA DRIFT CLOUDS: 5 large, slow-moving ===
      nebulaeRef.current = []
      const nebColors = [
        "rgba(212,175,55,0.008)",
        "rgba(91,141,239,0.006)",
        "rgba(180,100,220,0.006)",
        "rgba(212,175,55,0.005)",
        "rgba(60,120,200,0.006)",
      ]
      for (let i = 0; i < 5; i++) {
        nebulaeRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 200 + Math.random() * 250,
          color: nebColors[i],
          phase: Math.random() * Math.PI * 2,
          speed: 0.002 + Math.random() * 0.003,
          dx: (Math.random() - 0.5) * 0.08,
          dy: (Math.random() - 0.5) * 0.04,
        })
      }
    }

    const resize = () => { init() }
    window.addEventListener("resize", resize)
    init()

    const draw = () => {
      timeRef.current += 0.012
      const t = timeRef.current
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // ============================
      // 1. NEBULA CLOUDS — slow cosmic drift + breathing
      // ============================
      for (const n of nebulaeRef.current) {
        n.phase += n.speed
        n.x += n.dx
        n.y += n.dy
        // Wrap
        if (n.x > w + n.r) n.x = -n.r
        if (n.x < -n.r) n.x = w + n.r
        if (n.y > h + n.r) n.y = -n.r
        if (n.y < -n.r) n.y = h + n.r

        const breathe = Math.sin(n.phase) * 0.5 + 0.5
        const currentR = n.r * (0.92 + breathe * 0.16)
        const currentY = n.y + Math.sin(n.phase * 0.6) * 20

        const grad = ctx.createRadialGradient(n.x, currentY, 0, n.x, currentY, currentR)
        grad.addColorStop(0, n.color)
        grad.addColorStop(0.5, n.color)
        grad.addColorStop(1, "transparent")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.x, currentY, currentR, 0, Math.PI * 2)
        ctx.fill()
      }

      // ============================
      // 2. TOP-DOWN SOLAR RADIANCE — the crown's light
      // ============================
      const sunX = w * 0.5
      const sunY = -h * 0.05
      const topGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, h * 0.7)
      const topAlpha = 0.035 + Math.sin(t * 0.4) * 0.008
      topGlow.addColorStop(0, `rgba(212,175,55,${topAlpha}))`)
      topGlow.addColorStop(0.25, `rgba(212,175,55,${topAlpha * 0.4})`)
      topGlow.addColorStop(0.6, `rgba(212,175,55,${topAlpha * 0.1})`)
      topGlow.addColorStop(1, "transparent")
      ctx.fillStyle = topGlow
      ctx.fillRect(0, 0, w, h)

      // ============================
      // 3. BOTTOM WARMTH — rising energy
      // ============================
      const bottomGlow = ctx.createRadialGradient(
        w * 0.5, h * 1.08, 0,
        w * 0.5, h * 0.8, h * 0.45
      )
      const botAlpha = 0.02 + Math.cos(t * 0.35) * 0.006
      bottomGlow.addColorStop(0, `rgba(255,195,90,${botAlpha})`)
      bottomGlow.addColorStop(1, "transparent")
      ctx.fillStyle = bottomGlow
      ctx.fillRect(0, 0, w, h)

      // ============================
      // 4. SOLAR FLARES — emanating from the crown
      // ============================
      for (const f of flaresRef.current) {
        // Spawn new flares organically
        if (!f.active && Math.random() < 0.0006) {
          f.active = true
          f.life = 1
          f.angle = Math.random() * Math.PI * 2
        }
        if (!f.active) continue

        f.life -= 0.004 + Math.random() * 0.002
        if (f.life <= 0) { f.active = false; continue }

        const rayLen = 80 + f.life * 180
        const spread = 0.03
        const fx = sunX + Math.cos(f.angle) * 30
        const fy = sunY + Math.sin(f.angle) * 30
        const ex = sunX + Math.cos(f.angle) * (30 + rayLen)
        const ey = sunY + Math.sin(f.angle) * (30 + rayLen)

        // Ray beam
        const rayGrad = ctx.createLinearGradient(fx, fy, ex, ey)
        rayGrad.addColorStop(0, `rgba(212,175,55,${0.05 * f.life})`)
        rayGrad.addColorStop(0.4, `rgba(212,175,55,${0.02 * f.life})`)
        rayGrad.addColorStop(1, "rgba(212,175,55,0)")

        ctx.strokeStyle = rayGrad
        ctx.lineWidth = 1.5 + f.life * 5
        ctx.beginPath()
        ctx.moveTo(fx - Math.sin(f.angle) * spread * rayLen, fy + Math.cos(f.angle) * spread * rayLen)
        ctx.lineTo(ex, ey)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(fx + Math.sin(f.angle) * spread * rayLen, fy - Math.cos(f.angle) * spread * rayLen)
        ctx.lineTo(ex, ey)
        ctx.stroke()

        // Tip glow
        const tipGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, 6 * f.life)
        tipGrad.addColorStop(0, `rgba(255,230,160,${0.12 * f.life})`)
        tipGrad.addColorStop(1, "transparent")
        ctx.fillStyle = tipGrad
        ctx.beginPath()
        ctx.arc(ex, ey, 6 * f.life, 0, Math.PI * 2)
        ctx.fill()
      }

      // ============================
      // 5. OCCASIONAL SHOOTING STARS (fast, bright, brief)
      // ============================
      if (Math.random() < 0.0004) {
        const sx = Math.random() * w * 0.4
        const sy = Math.random() * h * 0.25
        const len = 30 + Math.random() * 40
        const angle = Math.random() * 0.5 + 0.3
        const ex = sx + Math.cos(angle) * len
        const ey = sy + Math.sin(angle) * len
        const grad = ctx.createLinearGradient(sx, sy, ex, ey)
        grad.addColorStop(0, "rgba(255,255,255,0.5)")
        grad.addColorStop(0.5, "rgba(212,175,55,0.2)")
        grad.addColorStop(1, "rgba(212,175,55,0)")
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(ex, ey)
        ctx.stroke()
      }

      // ============================
      // 6. STARS — twinkling with gold halos
      // ============================
      for (const star of starsRef.current) {
        star.a += star.s
        // Sine-based twinkle: realistic, non-uniform
        const twinkle = Math.sin(star.a)
        const alpha = 0.15 + (twinkle + 1) * 0.425

        if (star.g) {
          // Gold halo — soft, large
          const haloR = star.r * (3.5 + twinkle * 1.5)
          const haloGrad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, haloR)
          haloGrad.addColorStop(0, `rgba(212,175,55,${alpha * 0.1})`)
          haloGrad.addColorStop(0.6, `rgba(212,175,55,${alpha * 0.03})`)
          haloGrad.addColorStop(1, "rgba(212,175,55,0)")
          ctx.fillStyle = haloGrad
          ctx.beginPath()
          ctx.arc(star.x, star.y, haloR, 0, Math.PI * 2)
          ctx.fill()
        }

        // Star core — bright center
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = star.g
          ? `rgba(212,175,55,${alpha})`
          : `rgba(235,235,240,${alpha * 0.8})`
        ctx.fill()

        // Extra sparkle on brightest peaks
        if (twinkle > 0.9) {
          const sparkleGrad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 2)
          sparkleGrad.addColorStop(0, "rgba(255,255,255,0.15)")
          sparkleGrad.addColorStop(1, "transparent")
          ctx.fillStyle = sparkleGrad
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.r * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // ============================
      // 7. COMETS WITH GOLDEN TAILS
      // ============================
      for (let i = cometsRef.current.length - 1; i >= 0; i--) {
        const c = cometsRef.current[i]

        if (!c.active) {
          // Respawn with random delay
          if (Math.random() < 0.0003) {
            const fromLeft = Math.random() > 0.35
            c.x = fromLeft ? -50 : w + 50
            c.y = Math.random() * h * 0.5
            c.vx = fromLeft ? (1.5 + Math.random() * 3) : -(1.5 + Math.random() * 3)
            c.vy = 0.3 + Math.random() * 1.2
            c.len = 50 + Math.random() * 90
            c.life = 1
            c.active = true
          }
          continue
        }

        c.x += c.vx
        c.y += c.vy
        c.life -= 0.002

        if (c.life <= 0 || c.x < -300 || c.x > w + 300 || c.y > h + 100) {
          c.active = false
          continue
        }

        const tailLen = c.len * c.life
        const tailAngle = Math.atan2(-c.vy, -c.vx)
        const ex = c.x + Math.cos(tailAngle) * tailLen
        const ey = c.y + Math.sin(tailAngle) * tailLen

        // Comet head glow
        const headGrad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 6)
        headGrad.addColorStop(0, `rgba(255,255,255,${0.6 * c.life})`)
        headGrad.addColorStop(0.3, `rgba(212,175,55,${0.3 * c.life})`)
        headGrad.addColorStop(1, "rgba(212,175,55,0)")
        ctx.fillStyle = headGrad
        ctx.beginPath()
        ctx.arc(c.x, c.y, 6, 0, Math.PI * 2)
        ctx.fill()

        // Comet tail — golden trail
        const tailGrad = ctx.createLinearGradient(c.x, c.y, ex, ey)
        tailGrad.addColorStop(0, `rgba(212,175,55,${0.2 * c.life})`)
        tailGrad.addColorStop(0.2, `rgba(212,175,55,${0.08 * c.life})`)
        tailGrad.addColorStop(1, "rgba(212,175,55,0)")
        ctx.strokeStyle = tailGrad
        ctx.lineWidth = 1.5 * c.life
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(c.x, c.y)
        ctx.lineTo(ex, ey)
        ctx.stroke()

        // Secondary thin tail — wispy gold
        const wispyAngle = tailAngle + (Math.random() - 0.5) * 0.15
        const wex = c.x + Math.cos(wispyAngle) * tailLen * 0.6
        const wey = c.y + Math.sin(wispyAngle) * tailLen * 0.6
        const wispyGrad = ctx.createLinearGradient(c.x, c.y, wex, wey)
        wispyGrad.addColorStop(0, `rgba(255,220,140,${0.06 * c.life})`)
        wispyGrad.addColorStop(1, "rgba(212,175,55,0)")
        ctx.strokeStyle = wispyGrad
        ctx.lineWidth = 0.8 * c.life
        ctx.beginPath()
        ctx.moveTo(c.x, c.y)
        ctx.lineTo(wex, wey)
        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      {/* ============================================ */}
      {/* CANVAS LAYER: stars, comets, flares, nebulae */}
      {/* ============================================ */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* ============================================ */}
      {/* ACT 1: Hero Sun Galaxy                       */}
      {/* ============================================ */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: Math.max(0, 0.35 - scroll * 1.5),
        }}
      >
        <img
          src="/kareem-crown-hero-section-site-reference-image-(1).webp"
          alt="Hero Galaxy"
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "101%",
            height: "101%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* ============================================ */}
      {/* ACT 2: Main Galaxy — deep space backdrop     */}
      {/* ============================================ */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.32,
          transition: "opacity 0.8s ease",
        }}
      >
        <img
          src="/galaxy-bg/Dark galaxy 2 (1).webp"
          alt="Galaxy Background"
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "101%",
            height: "101%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* ============================================ */}
      {/* ACT 3: Earth — Calm Before the Storm (70-75%)*/}
      {/* ============================================ */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: scroll > 0.55 ? Math.min(0.32, (scroll - 0.55) * 1.28) : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <img
          src="/galaxy-bg/dark galaxy earth 1 (1).webp"
          alt="Earth Galaxy"
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "101%",
            height: "101%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* ============================================ */}
      {/* ACT 4: AI Impact — The Storm (90-95%)        */}
      {/* ============================================ */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: scroll > 0.78 ? Math.min(0.32, (scroll - 0.78) * 1.45) : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <img
          src="/galaxy-bg/dark galaxy ai asteroid hit (1).webp"
          alt="AI Impact"
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "101%",
            height: "101%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* ============================================ */}
      {/* LIGHT OVERLAY — top-down + bottom-up         */}
      {/* ============================================ */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(180deg, rgba(5,5,16,0.3) 0%, rgba(5,5,16,0.0) 15%, rgba(5,5,16,0.0) 70%, rgba(5,5,16,0.6) 100%)",
        }}
      />
    </>
  )
}
