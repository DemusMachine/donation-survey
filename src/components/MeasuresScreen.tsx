import { appealContent, measureBlocks } from '../content'
import { AppealType, DisplayMode, LikertResponses } from '../types'
import LikertScale from './LikertScale'

interface Props {
  appealType?: AppealType    // Made optional to prevent crashes
  displayMode?: DisplayMode  // Made optional to prevent crashes
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
  
  // 1. SAFEST FALLBACK EXTRACTION LOGIC
  // If appealType or displayMode are missing or undefined, default gracefully
  const safeType = appealType || 'autonomous'
  const activeContent = appealContent[safeType] || { heading: 'Help 4 Needy Appeal', lines: [] }
  const heading = activeContent.heading
  const lines = activeContent.lines || []

  // 2. DEFENSIVE RESPONSES CHECK
  // Fallback to an empty object if responses is completely missing to avoid property lookup errors
  const safeResponses = responses || {}
  const allItems = measureBlocks ? measureBlocks.flatMap((b) => b.items || []) : []
  const allAnswered = allItems.length > 0 && allItems.every((item) => safeResponses[item.id] !== undefined)

  function handleChange(id: string, value: number) {
    if (setResponses) {
      setResponses({ ...safeResponses, [id]: value })
    }
  }

  const focusLabel = safeType === 'autonomous' ? 'Long-term support' : 'Immediate support'

  return (
    <div className="stimulus-shell">
      {/* ORIGINAL WEBSITE HEADER */}
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

      {/* MAIN LAYOUT (Website Text & Sidebar Summary Panels) */}
      <main className="stimulus-layout">
        <section className="stimulus-main">
          <div className="stimulus-kicker">{focusLabel}</div>
          <h1 className="stimulus-heading">{heading}</h1>

          <div className="stimulus-card">
            {lines.map((line, i) => (
              <p 
                key={i} 
                className={`stimulus-line ${displayMode === 'expanded' ? 'reveal' : ''}`}
              >
                {line}
              </p>
            ))}
          </div>
          <div className="stimulus-actions">
            <button
              type="button"
              className="donate-open-button"
            >
              ♥ Donate
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

      {/* QUESTIONNAIRE AREA */}
      <div className="stimulus-layout-compact" style={{ marginTop: '40px', padding: '0 2rem' }}>
        <div className="card" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '12px', marginBottom: '24px', textAlign: 'left' }}>
            <p style={{ color: '#64748b', margin: '4px 0 0 0', fontSize: '13px', fontWeight: 'bold'}}>
              Please answer the following questions based on the information displayed above.
            </p>
          </div>
          
          {measureBlocks && measureBlocks.map((block) => (
            <section key={block.id} className="measure-block" style={{ marginBottom: '32px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '0px', fontWeight: 600, color: '#1e293b' }}>{block.title}</h3>
              {block.instructions && <p className="instructions">{block.instructions}</p>}
              {block.items && block.items.map((item) => (
                <LikertScale
                  key={item.id}
                  item={item}
                  value={safeResponses[item.id]}
                  onChange={handleChange}
                  lowLabel={block.lowLabel}
                  highLabel={block.highLabel}
                />
              ))}
            </section>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button 
              className="stimulus-button" 
              disabled={!allAnswered} 
              onClick={onNext}
              style={{ minWidth: '200px' }}
            >
              Submit Questionnaire
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
