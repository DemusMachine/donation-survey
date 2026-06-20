import { useEffect, useRef, useState } from 'react'
import { AppealType, DisplayMode } from '../types'
import { appealContent } from '../content'
import logoImg from '../assets/q.jpg'

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
  const [showButton,setShowButton] = useState(false)
  const startTime = useRef(Date.now())

  useEffect(() => {
    if (displayMode !== 'expanded') return
    if (visibleCount >= lines.length) return
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 1500)
    return () => clearTimeout(timer)
  }, [displayMode, visibleCount, lines.length])

  const allVisible = visibleCount >= lines.length

  useEffect(() => {
    if (!allVisible) return
    if (displayMode === 'control') {
      setShowButton(true)
      return
    }
    const timer = setTimeout(() => setShowButton(true), 1500)
    return () => clearTimeout(timer)
  }, [allVisible, displayMode])

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
            <img src={logoImg} alt="" />
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

          <div className="stimulus-card">
            {lines.slice(0, visibleCount).map((line, i) => (
              <p 
                key={i} 
                className={`stimulus-line ${displayMode === 'expanded' ? 'reveal' : ''}`}
              >
                {line}
              </p>
            ))}
          </div>

          <div className="stimulus-actions">
            {showButton && (
              <button
                className="stimulus-button"
                onClick={handleNext}
              >
                Continue →
              </button>
            )}
          </div>
        </section>

        
      </main>
    </div>
  )
}