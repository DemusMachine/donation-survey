import { useEffect, useRef, useState } from 'react'
import { AppealType, DisplayMode } from '../types'
import { appealContent } from '../content'

interface Props {
  appealType: AppealType
  displayMode: DisplayMode
  onNext: (clicks: number, dwellMs: number) => void
}

export default function Stimulus({ appealType, displayMode, onNext }: Props) {
  const { heading, lines } = appealContent[appealType]
  const [visibleCount, setVisibleCount] = useState(
    displayMode === 'control' ? lines.length : 1,
  )
  const [clicks, setClicks] = useState(0)
  const startTime = useRef(Date.now())

  useEffect(() => {
    if (displayMode !== 'expanded') return
    if (visibleCount >= lines.length) return
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 1500)
    return () => clearTimeout(timer)
  }, [displayMode, visibleCount, lines.length])

  const allVisible = visibleCount >= lines.length

  function handleNext() {
    onNext(clicks, Date.now() - startTime.current)
  }

  const focusLabel =
    appealType === 'autonomous'
      ? 'Long-term support'
      : 'Immediate support'

  return (
    <div className="stimulus-shell" onClick={() => setClicks((c) => c + 1)}>
      <header className="stimulus-topbar">
        <div className="stimulus-brand">
          <div className="stimulus-brand-mark" aria-hidden="true">
            H4N
          </div>
          <div>
            <div className="stimulus-brand-title">Help 4 Needy</div>
            <div className="stimulus-brand-subtitle">
              Official donation information portal
            </div>
          </div>
        </div>
          <nav className="stimulus-menu">
            <a href="#">Home</a>
            <a href="#">About Us</a>
            <a href="#">Our Programs</a>
            <a href="#">Get Involved</a>
            <a href="#">Contact Us</a>
          </nav>
      </header>

      <main className="stimulus-layout">
        <section className="stimulus-main">
          <div className="stimulus-kicker">{focusLabel}</div>
          <h1 className="stimulus-heading">{heading}</h1>
          <p className="stimulus-intro">
            Please read the message below before continuing.
          </p>

          <div className="stimulus-card">
            {lines.slice(0, visibleCount).map((line, i) => (
              <p key={i} className="stimulus-line reveal">
                {line}
              </p>
            ))}
          </div>

          <div className="stimulus-actions">
            <button
              className="stimulus-button"
              disabled={!allVisible}
              onClick={handleNext}
            >
              Continue →
            </button>

          </div>
        </section>

        <aside className="stimulus-sidebar" aria-label="Impact statistics">
          <div className="impact-card">
            <div className="impact-top">
              <div className="impact-stat">12,450</div>
              <div className="impact-pill">Children Supported</div>
            </div>
            <div className="impact-bar">
              <span style={{ width: '86%' }} />
            </div>
            <p className="impact-desc">
              Reaching children and families through direct food assistance programs.
            </p>
          </div>

          <div className="impact-card">
            <div className="impact-top">
              <div className="impact-stat">58</div>
              <div className="impact-pill">Community Partners</div>
            </div>
            <div className="impact-bar">
              <span style={{ width: '68%' }} />
            </div>
            <p className="impact-desc">
              Working with local schools, agencies, and community groups.
            </p>
          </div>

          <div className="impact-card">
            <div className="impact-top">
              <div className="impact-stat">97%</div>
              <div className="impact-pill">Program Funding</div>
            </div>
            <div className="impact-bar">
              <span style={{ width: '97%' }} />
            </div>
            <p className="impact-desc">
              A strong share of resources is directed toward programs and services.
            </p>
          </div>
        </aside>
      </main>
    </div>
  )
}