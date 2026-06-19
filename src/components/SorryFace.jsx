// A cute blob character. Sad puppy-eyes by default, big smile when forgiven.
export default function SorryFace({ happy }) {
  return (
    <svg
      className={`face ${happy ? 'happy' : ''}`}
      viewBox="0 0 120 120"
      role="img"
      aria-label={happy ? 'A happy, smiling face' : 'A sad, sorry face'}
    >
      <defs>
        <radialGradient id="blob" cx="42%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#ffe0ea" />
          <stop offset="100%" stopColor="#ff9bbb" />
        </radialGradient>
      </defs>

      {/* body */}
      <circle cx="60" cy="60" r="46" fill="url(#blob)" />

      {/* cheeks */}
      <circle cx="38" cy="70" r="8" fill="#ff7aa6" opacity="0.55" />
      <circle cx="82" cy="70" r="8" fill="#ff7aa6" opacity="0.55" />

      {happy ? (
        <>
          {/* happy curved eyes */}
          <path d="M40 54 q6 -8 12 0" fill="none" stroke="#5b2333" strokeWidth="4" strokeLinecap="round" />
          <path d="M68 54 q6 -8 12 0" fill="none" stroke="#5b2333" strokeWidth="4" strokeLinecap="round" />
          {/* big smile */}
          <path d="M44 72 q16 18 32 0" fill="none" stroke="#5b2333" strokeWidth="4.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* sad puppy eyes */}
          <circle cx="46" cy="56" r="6.5" fill="#5b2333" />
          <circle cx="74" cy="56" r="6.5" fill="#5b2333" />
          <circle cx="44" cy="53.5" r="2.2" fill="#fff" />
          <circle cx="72" cy="53.5" r="2.2" fill="#fff" />
          {/* worried brows */}
          <path d="M38 46 q8 -4 14 -1" fill="none" stroke="#5b2333" strokeWidth="3" strokeLinecap="round" />
          <path d="M82 46 q-8 -4 -14 -1" fill="none" stroke="#5b2333" strokeWidth="3" strokeLinecap="round" />
          {/* small frown */}
          <path d="M50 78 q10 -8 20 0" fill="none" stroke="#5b2333" strokeWidth="4" strokeLinecap="round" />
          {/* tear */}
          <path d="M46 64 q-3 6 0 9 q3 -3 0 -9z" fill="#7ec8ff" />
        </>
      )}
    </svg>
  )
}
