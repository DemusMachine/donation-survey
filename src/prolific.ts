// Prolific appends these three values to your study URL automatically
// for every participant - we just read them off window.location instead
// of asking the participant to type anything.
export function getProlificParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    prolificId: params.get('PROLIFIC_PID') ?? '',
    studyId: params.get('STUDY_ID') ?? '',
    sessionId: params.get('SESSION_ID') ?? '',
  }
}
