import { useState } from 'react'
import { appealContent, measureBlocks, measuresInstructionText } from '../content'
import { AppealType, LikertResponses } from '../types'
import LikertScale from './LikertScale'
import logoImg from '../assets/q.jpg'

interface Props {
  appealType: AppealType
  responses: LikertResponses
  setResponses: (r: LikertResponses) => void
  onNext: () => void
}

export default function MeasuresScreen({
  appealType,
  responses,
  setResponses,
  onNext,
}: Props) {
  const [section, setSection] = useState(0)
  
  // 1. SAFEST FALLBACK EXTRACTION LOGIC
  // If appealType or displayMode are missing or undefined, default gracefully
  const { heading, lines } = appealContent[appealType]

  function handleChange(id: string, value: number) {
    setResponses({ ...responses, [id]: value })
  }

  // Page 0: instructions only, shown once before section 1
  if (section === 0) {
    return (
      <div className="card">
        <h2>Instructions</h2>
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
            <section className="stimulus-main">
              <h1 className="stimulus-heading">{heading}</h1>
              <div className="stimulus-card">
                {lines.map((line, i) => (
                  <p key={i} className="stimulus-line">
                    {line}
                  </p>
                ))}
              </div>
              <div className="stimulus-actions">
              <button
                className="donate-open-button"
              >
                ♥ Donate
              </button>
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