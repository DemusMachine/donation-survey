interface Props {
  text: string[]
  onNext: () => void
}

// One paragraph of text and a Continue button. Used twice in a row
// (info1 then info2) between consent and the main stimulus page.
export default function InfoScreen({ text, onNext }: Props) {
  return (
    <div className="card">
      <div className="info-text-container">
        {text.map((sentence, index) => (
          <p key={index} className="info-sentence">{sentence}</p>
        ))}
      </div>
      <button onClick={onNext}>Continue</button>
    </div>
  )
}
