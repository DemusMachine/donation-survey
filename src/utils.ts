import { SurveyData } from './types'

// Turns one participant's data into a one-row CSV and downloads it.
// This is the "good enough to start" option - see README.md for how
// to send data to a shared spreadsheet or database instead.
export function downloadCSV(data: SurveyData) {
  const flat: Record<string, string | number> = {
    prolificId: data.prolificId,
    displayMode: data.condition.displayMode,
    appealType: data.condition.appealType,
    donationAmount: data.donationAmount,
    stimulusClicks: data.stimulusClicks,
    stimulusDwellMs: data.stimulusDwellMs,
    gender: data.gender,
    genderOther: data.genderOther,
    age: data.age,
    completedAt: data.completedAt,
    ...data.responses,
  }
  const headers = Object.keys(flat)
  const row = headers.map((h) => String(flat[h]).replace(/,/g, ';'))
  const csv = headers.join(',') + '\n' + row.join(',')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `donation-survey-${data.prolificId || 'participant'}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
