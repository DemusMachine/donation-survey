import {useState, useEffect} from 'react'
import { appealContent, measureBlocks, measuresInstructionText } from '../content'
import { AppealType, LikertResponses, DisplayMode } from '../types'
import LikertScale from './LikertScale'
import logoImg from '../assets/q.jpg'

interface Props {
  appealType: AppealType
  displayMode: DisplayMode
  gender: string
  setGender: (v: string) => void
  genderOther: string
  setGenderOther: (v: string) => void
  age: string
  setAge: (v: string) => void
  onSubmit: () => void
}

export default function Demographics({
  appealType,
  displayMode,
  gender,
  setGender,
  genderOther,
  setGenderOther,
  age,
  setAge,
  onSubmit,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const ageNumber = parseInt(age, 10);
  const isAgeValid = !isNaN(ageNumber) && ageNumber >= 18 && ageNumber <= 100;
  const isGenderValid =
    gender.trim() !== '' && (gender !== 'Other' || genderOther.trim() !== '');

  const canSubmit = gender.trim() !== '' && age.trim() !== '' && isGenderValid && isAgeValid && !isSubmitting
  const { heading, lines } = appealContent[appealType]
  const [visibleCount, setVisibleCount] = useState(
    displayMode === 'control' ? lines.length : 1,
  )
  const [showButton,setShowButton] = useState(false)

    useEffect(() => {
    if (displayMode !== 'expanded') return
    if (visibleCount >= lines.length) return
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 3000)
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

function handleFormSubmit() {
  if (!canSubmit) return

  setIsSubmitting(true)
  onSubmit()           


    setTimeout(() => {
      setIsSubmitting(false)
    }, 4000)
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
              className={`donate-open-button ${displayMode === 'expanded' ? 'reveal' : ''}`}
            >
              ♥ Donate
            </button>
            )}
          </div>
        </section>

        
      </main>
        </div>
      </div>

    
    <div className="card">
      <fieldset className="field">
        <legend>What is your gender?</legend>
        <div className="gender-group">
          {['Male', 'Female', 'Other'].map((option) => (
            <label
              key={option}
              className={'gender-option' + (gender === option ? ' selected' : '')}
            >
              <input
                type="radio"
                name="gender"
                value={option}
                checked={gender === option}
                onChange={() => setGender(option)}
              />
              {option}
            </label>
          ))}
        </div>
        {gender === 'Other' && (
          <input
            placeholder="Please specify"
            value={genderOther}
            onChange={(e) => setGenderOther(e.target.value)}
          />
        )}
      </fieldset>
      <label className="field">
        What is your age?
        <input
          type="number"
          min={18}
          max={100}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
              }
            }}
        />
          {age.trim() !== '' && !isAgeValid && (
            <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>
              Please, enter a valid age between 18 and 100.
            </span>
          )}
      </label>
      <p>Please, click the "Submit" button only 1 time and wait.</p>
      <button disabled={!canSubmit} onClick={handleFormSubmit}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
    </div>
  )
}
