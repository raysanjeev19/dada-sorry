// Decorative hearts drifting upward in the background.
const HEARTS = Array.from({ length: 16 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rnd = seed / 233280
  return {
    left: Math.round(rnd * 100),
    size: 14 + Math.round((1 - rnd) * 26),
    duration: 9 + Math.round(rnd * 10),
    delay: Math.round(rnd * 12),
    opacity: 0.35 + rnd * 0.4,
  }
})

export default function FloatingHearts() {
  return (
    <div className="bg-hearts" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <svg
          key={i}
          className="bg-heart"
          width={h.size}
          height={h.size}
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            color: ['#ff9cbd', '#c9b6ff', '#ffd7be'][i % 3],
          }}
        >
          <path d="M12 21s-7.5-4.9-10-9.3C.3 8.2 1.9 4.5 5.3 4.5c2 0 3.4 1.2 4.7 2.8 1.3-1.6 2.7-2.8 4.7-2.8 3.4 0 5 3.7 3.3 7.2C19.5 16.1 12 21 12 21z" />
        </svg>
      ))}
    </div>
  )
}
