import { SurveyData } from './types'

// Paste the URL you get after deploying the Apps Script web app
// (Extensions -> Apps Script -> Deploy -> New deployment -> Web app).
// See apps-script/Code.gs and README.md -> "Saving data to Google Sheets".
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx45TdNhM27p1bOYXoapB3UAVDwvX7vET3AwHePV29mONvc7OD0IdkHWd0J_sHA8DsywA/exec'

export async function submitData(data: SurveyData): Promise<void> {
  // Content-Type must stay 'text/plain' here, not 'application/json' -
  // that keeps this a "simple request" so the browser doesn't block it
  // with a CORS preflight (Apps Script doesn't respond to those).
  await fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
  })
}

