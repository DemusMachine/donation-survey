// Paste this into Extensions -> Apps Script in a Google Sheet,
// then Deploy -> New deployment -> type "Web app" ->
// Execute as: Me, Who has access: Anyone.
// Copy the resulting URL into SHEET_URL in src/submitData.ts.

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const data = JSON.parse(e.postData.contents)

  const flat = {
    prolificId: data.prolificId,
    studyId: data.studyId,
    sessionId: data.sessionId,
    displayMode: data.condition.displayMode,
    appealType: data.condition.appealType,
    donationAmount: data.donationAmount,
    stimulusClicks: data.stimulusClicks,
    stimulusDwellMs: data.stimulusDwellMs,
    gender: data.gender,
    genderOther: data.genderOther,
    age: data.age,
    completedAt: data.completedAt,
  }
  // Spread the Likert responses (gm1, soc1, dyn1, ...) into the same row.
  Object.assign(flat, data.responses)

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(Object.keys(flat))
  }
  sheet.appendRow(Object.values(flat))

  return ContentService.createTextOutput('OK')
}
