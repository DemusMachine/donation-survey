export default function ThankYou() {
  const handleCompleteStudy = () => {
  window.location.href = 'https://app.prolific.com/submissions/complete?cc=CALS53S3';
  };
  return (
    <div className="card">
      <h1>Thank you!</h1>
      <p>
        Your responses have been recorded.
      </p>
      <p>You may now close this window and return to Prolific.</p>
        <button onClick={handleCompleteStudy}>
          Return to Prolific
        </button>
    </div>
  )
}
