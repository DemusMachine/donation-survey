import { useState, useEffect } from 'react'
import { AppealType, DisplayMode } from '../types'
import { appealContent } from '../content'

interface Props {
  appealType: AppealType
  displayMode: DisplayMode
  onNext: (amount: number) => void
}

export default function DonationDecision({
  appealType,
  displayMode,
  onNext,
}: Props) {
  const { heading, lines } = appealContent[appealType]
  const [showModal, setShowModal] = useState(false)
  const [amount, setAmount] = useState('0')
  const [error, SetError] = useState('')
  
  const [visibleCount, setVisibleCount] = useState(
    displayMode === 'control' ? lines.length : 1,
  )
 
  useEffect(() => {
      if (displayMode !== 'expanded') return
      if (visibleCount >= lines.length) return
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), 1500)
      return () => clearTimeout(timer)
    }, [displayMode, visibleCount, lines.length])
  
    const allVisible = visibleCount >= lines.length

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
    onNext(value)
  }

  return (
    <div className="donation-page-shell">
      <div className="donation-page-mini">
        <header className="stimulus-topbar stimulus-topbar-compact">
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

        <main className="stimulus-layout stimulus-layout-compact">
          <section className="stimulus-main stimulus-main-compact">
            <div className="stimulus-kicker">Donation preview</div>
            <h1 className="stimulus-heading stimulus-heading-compact">{heading}</h1>
            <p className="stimulus-intro">
              Please read the message below, then open the donation window.
            </p>

            <div className="stimulus-card stimulus-card-compact">
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
            <button
              type="button"
              disabled={!allVisible}
              className="donate-open-button"
              onClick={() => setShowModal(true)}
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