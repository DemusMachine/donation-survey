export default function ThankYou() {
  const handleCompleteStudy = () => {
  window.location.href = 'https://app.prolific.com/submissions/complete?cc=CE2HI81Y';
  };
  return (
    <div className="card">
      <h1>Thank you!</h1>
      <p>
        Your responses have been recorded.
      </p>
      <p>You may now close this window and return to Prolific.</p>
        <a href = "https://app.prolific.com/submissions/complete?cc=CE2HI81Y" className="qwe">
          Return to Prolific
        </a>
    </div>
  )
}
