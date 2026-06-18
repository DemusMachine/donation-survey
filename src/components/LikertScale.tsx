import { LikertItem } from '../content'

interface Props {
  item: LikertItem
  value: number | undefined
  onChange: (id: string, value: number) => void
  lowLabel: string
  highLabel: string
}

// One question row: the statement, then radio buttons 1-7 with
// anchor labels at each end. Used for every scale in the study,
// agree/disagree and semantic-differential alike.
export default function LikertScale({ item, value, onChange, lowLabel, highLabel }: Props) {
  return (
    <div className="likert-row">
      <p className="likert-text">{item.text}</p>
      <div className="likert-scale">
        <span className="likert-anchor">{lowLabel}</span>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <label key={n} className="likert-option">
            <input
              type="radio"
              name={item.id}
              value={n}
              checked={value === n}
              onChange={() => onChange(item.id, n)}
            />
            <span>{n}</span>
          </label>
        ))}
        <span className="likert-anchor">{highLabel}</span>
      </div>
    </div>
  )
}
