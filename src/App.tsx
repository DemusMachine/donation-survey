import { useState } from 'react'
import { Step, Condition, LikertResponses, SurveyData } from './types'
import { assignCondition } from './conditions'
import { orderResponses, infoPage2Text, infoPage3Text } from './content'
import { getProlificParams } from './prolific'
import { submitData } from './submitData'
import ConsentScreen from './components/ConsentScreen'
import InfoScreen from './components/InfoScreen'
import Stimulus from './components/Stimulus'
import DonationDecision from './components/DonationDecision'
import MeasuresScreen from './components/MeasuresScreen'
import Demographics from './components/Demographics'
import ThankYou from './components/ThankYou'

// The whole survey is one linear flow, controlled by `step`.
// Each screen below is a separate component; this file just decides
// which one is on screen and passes it the data + callback it needs.
export default function App() {

  const isMobile =
  window.innerWidth < 768 ||
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
 
  if (isMobile) {
    return (
      <main className="page">
        <div className="card mobile-block">
          <p className="mobile-icon">💻</p>
          <h1>Please use a laptop or computer</h1>
          <p>
            This questionnaire is not optimised for smartphones. Please
            open the link on a laptop or desktop computer to participate.
          </p>
        </div>
      </main>
    )
  }
  const [step, setStep] = useState<Step>('consent')
  const [condition] = useState<Condition>(() => assignCondition())
  const [{ prolificId, studyId, sessionId }] = useState(() => getProlificParams())
  const [stimulusClicks, setStimulusClicks] = useState(0)
  const [stimulusDwellMs, setStimulusDwellMs] = useState(0)
  const [donationAmount, setDonationAmount] = useState(0)
  const [responses, setResponses] = useState<LikertResponses>({})
  const [gender, setGender] = useState('')
  const [genderOther, setGenderOther] = useState('')
  const [age, setAge] = useState('')

  async function handleSubmit() {
    const data: SurveyData = {
      prolificId,
      studyId,
      sessionId,
      condition,
      donationAmount,
      stimulusClicks,
      stimulusDwellMs,
      responses: orderResponses(responses),
      gender,
      genderOther,
      age,
      completedAt: new Date().toISOString(),
    }
    await submitData(data)
    setStep('done')
  }

  return (
    <main className="page">
      {step === 'consent' && (
        <ConsentScreen onNext={() => setStep('info1')} />
      )}

      {step === 'info1' && (
        <InfoScreen text={infoPage2Text} onNext={() => setStep('stimulus')} />
      )}

      {step === 'stimulus' && (
        <Stimulus
          appealType={condition.appealType}
          displayMode={condition.displayMode}
          onNext={(clicks, dwellMs) => {
            setStimulusClicks(clicks)
            setStimulusDwellMs(dwellMs)
            setStep('info2')
          }}
        />
      )}
      
      {step === 'info2' && (
        <InfoScreen text={infoPage3Text} onNext={() => setStep('donation')} />
      )}
      
      {step === 'donation' && (
        <DonationDecision
          appealType={condition.appealType}
          displayMode={condition.displayMode}
          onNext={(amount) => {
            setDonationAmount(amount)
            setStep('measures')
          }}
        />
      )}

      {step === 'measures' && (
        <MeasuresScreen
          responses={responses}
          setResponses={setResponses}
          onNext={() => setStep('demographics')}
        />
      )}

      {step === 'demographics' && (
        <Demographics
          gender={gender}
          setGender={setGender}
          genderOther={genderOther}
          setGenderOther={setGenderOther}
          age={age}
          setAge={setAge}
          onSubmit={handleSubmit}
        />
      )}

      {step === 'done' && <ThankYou />}
    </main>
  )
}
