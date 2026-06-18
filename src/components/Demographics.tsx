import {useState} from 'react'

interface Props {
  gender: string
  setGender: (v: string) => void
  genderOther: string
  setGenderOther: (v: string) => void
  age: string
  setAge: (v: string) => void
  onSubmit: () => void
}

export default function Demographics({
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

function handleFormSubmit() {
  if (!canSubmit) return

  setIsSubmitting(true)
  onSubmit()           


    setTimeout(() => {
      setIsSubmitting(false)
    }, 4000)
  }

  return (
    <div className="card">
      <h2>Section 8 of 8</h2>
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
  )
}
