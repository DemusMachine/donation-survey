import {useState} from 'react'
import { appealContent, measureBlocks, measuresInstructionText } from '../content'
import { AppealType, LikertResponses } from '../types'
import LikertScale from './LikertScale'
import logoImg from '../assets/q.jpg'

interface Props {
  appealType: AppealType
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
  gender,
  setGender,
  genderOther,
  setGenderOther,
  age,
  setAge,
  onSubmit,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = gender.trim() !== '' && age.trim() !== '' && !isSubmitting
  const { heading, lines } = appealContent[appealType]

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
        />
      </label>
      <p>Please, click the "Submit" button only 1 time and wait.</p>
      <button disabled={!canSubmit} onClick={handleFormSubmit}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
    </div>
  )
}
