// All the shapes of data the app passes around, in one place.
// If you add a new question or screen, this is usually the first
// file to touch.

export type DisplayMode = 'expanded' | 'control'
export type AppealType = 'autonomous' | 'immediate'

export interface Condition {
  displayMode: DisplayMode
  appealType: AppealType
}

export interface LikertResponses {
  [questionId: string]: number
}

export interface SurveyData {
  prolificId: string
  studyId: string
  sessionId: string
  condition: Condition
  donationAmount: number
  stimulusClicks: number
  stimulusDwellMs: number
  donationDwellMs: number
  responses: LikertResponses
  gender: string
  genderOther: string
  age: string
  completedAt: string
}

export type Step =
  | 'consent'
  | 'info1'
  | 'info2'
  | 'stimulus'
  | 'donation'
  | 'measures'
  | 'demographics'
  | 'done'
