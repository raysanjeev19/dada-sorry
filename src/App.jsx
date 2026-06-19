import { useState, useRef, useCallback } from 'react'
import SorryFace from './components/SorryFace.jsx'
import FloatingHearts from './components/FloatingHearts.jsx'
import { fireConfetti } from './components/confetti.js'

// ── Personalize here (or via URL: ?to=Name&from=YourName) ───────────────
const params = new URLSearchParams(window.location.search)
const TO = params.get('to') || 'Bestie'
const FROM = params.get('from') || 'Dada'
// ────────────────────────────────────────────────────────────────────────

// The No button gets more desperate the more you dodge it.
const NO_LABELS = [
  'No 😤',
  'Sure?',
  'Pakka?',
  'Sachii? 🥺',
  'Soch lo na',
  'Please na?',
  'Last chance!',
  'Rehne do 😭',
  'Catch me!',
  'Areh ruk!',
  'Phir se soch',
  'Naa kar na',
  'Itni zid? 😮',
  'Dil dukhega',
  'Maan ja na 🥹',
  'Bas kar de yes',
  'Nope! 🙈',
  'Try again',
  'Haar maan le',
  'Kabhi nahi 💗',
]
const HINTS = [
  'Hehe, ye "No" button thoda sharmaata hai.',
  'No bolne hi nahi dega tujhe 😅',
  'Bas haan keh de na? 🥺',
  'Pakka jaan boojh ke bhaag raha hai ye.',
  'Itni mehnat No pe? Yes pe kar le 😭',
  'Button ne decide kar liya — Team Yes 💗',
  'Arey pakad ke toh dikha 🙈',
  'Thak jaayegi, ye nahi 😌',
]

// Pick a random index that is NOT the same as the current one.
function nextIdx(len, current) {
  if (len <= 1) return 0
  let i = Math.floor(Math.random() * len)
  if (i === current) i = (i + 1) % len
  return i
}

export default function App() {
  const [forgiven, setForgiven] = useState(false)
  const [dodges, setDodges] = useState(0)
  const [noIdx, setNoIdx] = useState(0) // which No label is showing
  const [hintIdx, setHintIdx] = useState(-1) // -1 = no hint yet
  const [noStyle, setNoStyle] = useState(null) // null = inline; object = runaway pos
  const noRef = useRef(null)
  const playRef = useRef(null) // positioned container (offset parent)
  const msgRef = useRef(null) // the message text the No button roams over

  const yesScale = Math.min(1.05 + dodges * 0.04, 1.32)

  const dodge = useCallback((e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const btn = noRef.current
    const msg = msgRef.current
    const w = btn?.offsetWidth || 100
    const h = btn?.offsetHeight || 52
    const pad = 6
    // confine the button to the MESSAGE text box only (same offset parent: .roam)
    const bx = msg?.offsetLeft ?? 0
    const by = msg?.offsetTop ?? 0
    const bw = msg?.offsetWidth || 300
    const bh = msg?.offsetHeight || 120
    const minX = bx + pad
    const minY = by + pad
    const maxX = Math.max(minX, bx + bw - w - pad)
    const maxY = Math.max(minY, by + bh - h - pad)
    const left = minX + Math.random() * (maxX - minX)
    const top = minY + Math.random() * (maxY - minY)
    setNoStyle({ left: `${left}px`, top: `${top}px` })
    setDodges((d) => d + 1)
    // every dodge → a fresh, different label + hint
    setNoIdx((cur) => nextIdx(NO_LABELS.length, cur))
    setHintIdx((cur) => nextIdx(HINTS.length, cur))
  }, [])

  const sayYes = useCallback(() => {
    setForgiven(true)
    fireConfetti()
    setTimeout(fireConfetti, 350)
  }, [])

  const reset = () => {
    setForgiven(false)
    setDodges(0)
    setNoIdx(0)
    setHintIdx(-1)
    setNoStyle(null)
  }

  // Fresh random label/hint on every No click (never the same twice in a row).
  const noLabel = NO_LABELS[noIdx]
  const hint = hintIdx < 0 ? '' : HINTS[hintIdx]

  return (
    <div className="stage">
      <FloatingHearts />

      <main className="card">
        <SorryFace happy={forgiven} />

        {!forgiven ? (
          <>
            <p className="eyebrow">A little note for you</p>
            <h1 className="title">I'm Sorry, {TO}</h1>

            {/* the No button roams anywhere inside this text area */}
            <div className="roam" ref={playRef}>
              <p className="message" ref={msgRef}>
                I messed up, and I really didn't mean to hurt you. You're my
                favourite person and our friendship means <strong>everything</strong>{' '}
                to me. Please don't stay mad at me? 🥺
              </p>
              <p className="ask">Will you forgive me?</p>

              <div className="play-zone">
                <button
                  className="btn btn-yes"
                  style={{ '--yes-scale': yesScale }}
                  onClick={sayYes}
                >
                  <span>Yes 💗</span>
                </button>

                <button
                  ref={noRef}
                  className={`btn btn-no ${noStyle ? 'runaway' : ''}`}
                  style={noStyle || undefined}
                  onPointerEnter={dodge}
                  onPointerDown={dodge}
                  onTouchStart={dodge}
                  onClick={dodge}
                  onContextMenu={(e) => e.preventDefault()}
                  aria-label="No (but good luck clicking it)"
                >
                  {noLabel}
                </button>
              </div>

              <p className="hint" key={hintIdx}>{hint}</p>
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">Yayyy 💗</p>
            <h1 className="title">Thank you, {TO}!</h1>
            <p className="message">
              You're the best friend anyone could ask for. I promise to do
              better. Sending you the biggest hug right now 🤗💗
            </p>
            <p className="signoff">— always, {FROM}</p>
            <button className="again" onClick={reset}>
              replay the apology
            </button>
          </>
        )}
      </main>
    </div>
  )
}
