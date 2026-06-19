// Tiny dependency-free confetti burst on a full-screen canvas.
export function fireConfetti() {
  if (typeof window === 'undefined') return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  const canvas = document.createElement('canvas')
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1

  const resize = () => {
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  window.addEventListener('resize', resize)

  const colors = ['#ff6b9d', '#f8467f', '#ffd9c0', '#ff9bbb', '#ffe3ec', '#ffc2d6']
  const W = window.innerWidth
  const H = window.innerHeight
  const pieces = []
  const count = Math.min(180, Math.round(W / 6))

  for (let i = 0; i < count; i++) {
    pieces.push({
      x: W / 2 + (Math.random() - 0.5) * 120,
      y: H / 2 + (Math.random() - 0.5) * 60,
      r: 4 + Math.random() * 6,
      color: colors[(i * 7) % colors.length],
      vx: (Math.random() - 0.5) * 14,
      vy: -8 - Math.random() * 12,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    })
  }

  let frame = 0
  const gravity = 0.32
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    for (const p of pieces) {
      p.vy += gravity
      p.vx *= 0.99
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      if (p.y < H + 40) alive = true

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.globalAlpha = Math.max(0, 1 - frame / 160)
      if (p.shape === 'rect') {
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6)
      } else {
        ctx.beginPath()
        ctx.arc(0, 0, p.r / 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }
    frame++
    if (alive && frame < 170) {
      requestAnimationFrame(tick)
    } else {
      window.removeEventListener('resize', resize)
      canvas.remove()
    }
  }
  requestAnimationFrame(tick)
}
