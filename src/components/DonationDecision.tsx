import { useState, useEffect } from 'react'
import { AppealType, DisplayMode } from '../types'
import { appealContent } from '../content'
import logoImg from '../assets/q.jpg'

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
  const [showButton,setShowButton] = useState(false)
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

    useEffect(() => {
    if (!allVisible) return
    if (displayMode === 'control') {
      setShowButton(true)
      return
    }
    const timer = setTimeout(() => setShowButton(true), 1500)
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
    onNext(value)
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
          <section className="stimulus-main stimulus-main-compact">
            <h1 className="stimulus-heading stimulus-heading-compact">{heading}</h1>

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
            {showButton &&(
              <button
              type="button"
              disabled={!allVisible}
              className="donate-open-button"
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