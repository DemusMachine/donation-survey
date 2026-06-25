import { useState, useEffect, useRef} from 'react'
import { appealContent, measureBlocks, measuresInstructionText } from '../content'
import { AppealType, LikertResponses, DisplayMode } from '../types'
import LikertScale from './LikertScale'
import logoImg from '../assets/q.jpg'

interface Props {
  appealType: AppealType
  displayMode: DisplayMode
  responses: LikertResponses
  setResponses: (r: LikertResponses) => void
  onNext: () => void
}

export default function MeasuresScreen({
  appealType,
  displayMode,
  responses,
  setResponses,
  onNext,
}: Props) {
  const [section, setSection] = useState(0)
  const { heading, lines } = appealContent[appealType]
  const [visibleCount, setVisibleCount] = useState(
    displayMode === 'control' ? lines.length : 1,
  )
  const [showButton,setShowButton] = useState(false)

  useEffect(() => {
        if (section !== 1) return
    if (displayMode !== 'expanded') return
    if (visibleCount >= lines.length) return
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 1500)
    return () => clearTimeout(timer)
  }, [section, displayMode, visibleCount, lines.length])

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

  function handleChange(id: string, value: number) {
    setResponses({ ...responses, [id]: value })
  }

  // Page 0: instructions only, shown once before section 1
  if (section === 0) {
    return (
      <div className="card">
        <p>{measuresInstructionText}</p>
        <button onClick={() => setSection(1)}>Continue</button>
      </div>
    )
  }

  // Pages 1..N: one measure block per page
  const block = measureBlocks[section - 1]
  const answered = block.items.every((item) => responses[item.id] !== undefined)

  function handleContinue() {
    if (section < measureBlocks.length) {
      setSection(section + 1)
    } else {
      onNext()
    }
  }

  return (
    <div>
      <div className="preview-mini-frame">
        <div className="stimulus-shell">
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
        <section>
          <h1 className="stimulus-heading">{heading}</h1>

          <div className="stimulus-card">
            {(section === 1 ? lines.slice(0, visibleCount) : lines).map((line, i) => (
              <p 
                key={i} 
                className={`stimulus-line ${displayMode === 'expanded' ? 'reveal' : ''}`}
              >
                {line}
              </p>
            ))}
          </div>
          <div className="stimulus-actions">
            {showButton &&(
              <button
              type="button"
              disabled={!allVisible}
              className="donate-open-button"
            >
              ♥ Donate
            </button>
            )}
          </div>
        </section>

        
      </main>
        </div>
      </div>

      <div className="card measure-page-card">
        {/*<p className="section-label">
          Section {section} of {measureBlocks.length}
        </p>*/}
        {block.instructions && <p className="instructions">{block.instructions}</p>}
        {block.items.map((item) => (
          <LikertScale
            key={item.id}
            item={item}
            value={responses[item.id]}
            onChange={handleChange}
            lowLabel={block.lowLabel}
            highLabel={block.highLabel}
          />
        ))}
        <button disabled={!answered} onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  )
}