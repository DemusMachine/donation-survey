interface Props {
  onNext: () => void
}

export default function ConsentScreen({ onNext }: Props) {
  return (
    <div className="card">
      <h1>Thank you for participating in this study!</h1>
      <p>
        This survey will take approximately 2 minutes to complete. We are
        investigating consumer choices, and the information you provide will
        be used exclusively for academic research. Please read the
        instructions carefully and answer the questions truthfully.
      </p>
      <p>
        There are no right or wrong answers. All responses are confidential
        and recorded anonymously. To ensure data quality, we have included
        attention-check questions. Failure to answer these correctly may
        result in a deduction in your payment.
      </p>
      <p>By clicking continue below, you agree to take part in this study.</p>
      <button onClick={onNext}>Continue</button>
    </div>
  )
}
