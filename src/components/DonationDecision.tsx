import { useState, useEffect , useRef, useMemo} from 'react'
import { AppealType, DisplayMode } from '../types'
import { appealContent, appealContentSentences } from '../content'
import logoImg from '../assets/q.jpg'

function splitSentences(paragraph: string): string[] {
  return paragraph.split(/(?<=[.!?])\s+/).filter(Boolean)
}

interface Props {
  appealType: AppealType
  displayMode: DisplayMode
  onNext: (amount: number, donationDwellMs: number) => void
}

export default function DonationDecision({
  appealType,
  displayMode,
  onNext,
}: Props) {
  const { heading, lines } = appealContentSentences[appealType]
  const sentenceUnits = useMemo(
    () =>
      lines.flatMap((line, paragraphIndex) =>
        splitSentences(line).map((sentence) => ({ paragraphIndex, sentence })),
      ),
    [lines],
  )

  const paragraphSentenceGroups = useMemo(() => {
    const groups: { paragraphIndex: number; sentence: string; globalIndex: number }[][] =
      lines.map(() => [])
    sentenceUnits.forEach((unit, globalIndex) => {
      groups[unit.paragraphIndex].push({ ...unit, globalIndex })
    })
    return groups
  }, [lines, sentenceUnits])

  const [visibleCount, setVisibleCount] = useState(
    displayMode === 'control' ? sentenceUnits.length : Math.min(1, sentenceUnits.length),
  )


  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState('0')
  const [error, SetError] = useState('')
  const [showButton,setShowButton] = useState(false)

  const startTime = useRef(Date.now())
 
    useEffect(() => {
    if (displayMode !== 'expanded') return
    if (visibleCount >= sentenceUnits.length) return
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 3000)
    return () => clearTimeout(timer)
  }, [displayMode, visibleCount, sentenceUnits.length])

  const allVisible =
    displayMode === 'control' ? true : visibleCount >= sentenceUnits.length

  useEffect(() => {
    if (!allVisible) return
    if (displayMode === 'control') {
      setShowButton(true)
      return
    }
    const timer = setTimeout(() => setShowButton(true), 2500)
    return () => clearTimeout(timer)
  }, [allVisible, displayMode])
  
    function handleDonateNow() {
    if (!amount || amount.trim() === '') {
      SetError('Type real amount of money')
      return
    }
    const value = Number.parseFloat(amount)
    
    // 2. Strict validation check for NaN, negative values, and zero
    if (Number.isNaN(value) || !Number.isFinite(value) || value < 0) {
      SetError('Type real amount of money')
      return 
    }

    SetError('') 
    const donationDwellMs = Date.now() - startTime.current
    onNext(value, donationDwellMs)
  }

  return (
    <div className="donation-page-shell">
      <div className="donation-page-mini">
        <header className="stimulus-topbar stimulus-topbar-compact">
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

        <main className="stimulus-layout stimulus-layout-compact">
          <section>
            <h1 className="stimulus-heading stimulus-heading-compact">{heading}</h1>
          <div className="stimulus-card">
            {displayMode === 'control'
              ? lines.map((line, i) => (
                  <p key={i} className="stimulus-line">
                    {line}
                  </p>
                ))
              : paragraphSentenceGroups.map((sentences, paragraphIndex) => (
                  <p key={paragraphIndex} className="stimulus-line">
                    {sentences.map(({ sentence, globalIndex }, i) => (
                      <span
                        key={i}
                        className={`sentence ${globalIndex < visibleCount ? 'is-visible' : ''}`}
                      >
                        {sentence}{' '}
                      </span>
                    ))}
                  </p>
                ))}
          </div>
            
          <div className="stimulus-actions">
            {showButton &&(
              <button
              type="button"
              disabled={!allVisible}
              className={`donate-open-button ${displayMode === 'expanded' ? 'reveal' : ''}`}
              onClick={() => setShowModal(true)}
            >
              ♥ Donate
            </button>
            )}
          </div>

          </section>

        </main>
      </div>

      {showModal && (
        <div className="donation-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="donation-modal-header">
              <div className="donation-modal-icon">♥</div>
              <h2>Make a Donation</h2>
            </div>

            <div className="donation-modal-rule" />

            <label className="donation-amount-label">
              Enter the amount you would like to donate:
            </label>

            <div className="donation-amount-input-wrap">
              <span className="donation-dollar">$</span>
              <input
                className="donation-amount-input"
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-label="Donation amount"
              />
            </div>
            {error && (
              <div className="donation-amount-error" style={{ color: '#dc2626', fontSize: '14px', marginTop: '8px', fontWeight: '500' }}>
                {error}
              </div>
            )}
            <button
              type="button"
              className="donation-now-button"
              onClick={handleDonateNow}
            >
              Donate Now <span aria-hidden="true">♡</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}