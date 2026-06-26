import { AppealType, LikertResponses } from './types'

// The two versions of the Food Bank USA page. Each line renders as
// its own paragraph; in "expanded" display mode they appear one at
// a time, in "control" mode they all appear together.
export const appealContent: Record<AppealType, { heading: string; lines: string[] }> = {
  autonomous: {
    heading: 'Teach to fish: Help us help others become self-sufficient!',
    lines: [
      'Help 4 Needy Center is a nonprofit coalition to combat the rising conditions of poverty.',
      'Our focus is on providing resources to help individuals become self-sufficient.',
      'Help 4 Needy provides assistance to individuals in a variety of ways that are designed to promote their self-sufficiency and ensure that these individuals can eventually support themselves moving forward (e.g., skills training; education).',
      'These services give us the opportunity to work with needy individuals so they may become self-sufficient (e.g., skills training; education).',
      'Our vision is to be the pinnacle of defense against poverty from our service area through a focus on self-sufficiency.',
      'To achieve this goal, we are currently requesting cash donations.',
      'YOUR partnership with us makes helping needy individuals become self-sufficient possible!',
      'Thank you for your support.'
    ],
  },
  immediate: {
    heading: 'Give a fish: Help us help others meet their immediate needs!',
    lines: [
      'Help 4 Needy Center is a nonprofit coalition to combat the rising conditions of poverty.',
      'Our focus is on providing resources to help individuals meet their immediate needs directly.', 
      'Help 4 Needy provides assistance to individuals in a variety of ways that are designed to meet their short-term needs and ensure that assistance is provided to address the current issues facing those in need (e.g., living materials; food).',
      'These services give us the opportunity to work with needy individuals so that their immediate needs are met (e.g., living materials; food).',
      'Our vision is to be the pinnacle of defense against poverty from our service area through a focus on meeting immediate needs.',
      'To achieve this goal, we are currently requesting cash donations.', 
      'YOUR partnership with us makes helping needy individuals meet their immediate needs possible!',
      'Thank you for your support.'
    ],
  },
}

export const appealContentSentences: Record<AppealType, { heading: string; lines: string[] }> = {
  autonomous: {
    heading: 'Teach to fish: Help us help others become self-sufficient!',
    lines: [
      'Help 4 Needy Center is a nonprofit coalition to combat the rising conditions of poverty.',
      'Our focus is on providing resources to help individuals become self-sufficient. Help 4 Needy provides assistance to individuals in a variety of ways that are designed to promote their self-sufficiency and ensure that these individuals can eventually support themselves moving forward (e.g., skills training; education).',
      'These services give us the opportunity to work with needy individuals so they may become self-sufficient (e.g., skills training; education).',
      'Our vision is to be the pinnacle of defense against poverty from our service area through a focus on self-sufficiency. To achieve this goal, we are currently requesting cash donations. YOUR partnership with us makes helping needy individuals become self-sufficient possible!',
      'Thank you for your support.'
    ],
  },
  immediate: {
    heading: 'Give a fish: Help us help others meet their immediate needs!',
    lines: [
      'Help 4 Needy Center is a nonprofit coalition to combat the rising conditions of poverty.',
      'Our focus is on providing resources to help individuals meet their immediate needs directly. Help 4 Needy provides assistance to individuals in a variety of ways that are designed to meet their short-term needs and ensure that assistance is provided to address the current issues facing those in need (e.g., living materials; food).',
      'These services give us the opportunity to work with needy individuals so that their immediate needs are met (e.g., living materials; food).',
      'Our vision is to be the pinnacle of defense against poverty from our service area through a focus on meeting immediate needs. To achieve this goal, we are currently requesting cash donations. YOUR partnership with us makes helping needy individuals meet their immediate needs possible!',
      'Thank you for your support.'
    ],
  },
}

// Page 2 - shown once, right after consent.
export const infoPage2Text =
  ['Next, you will read information about Help 4 Needy, a non-profit coalition to combat the rising conditions of poverty.',
     'Please carefully read the following information from our official website.'
];

// Page 3 - a second, separate screen with the same message (edit
// independently of infoPage2Text above if you want different wording
// for the two pages later).
export const infoPage3Text =[
  'In addition to and separate from the payment you received for your participation in this study, you would receive a $2 bonus payment to use as you wish.',
  'You could choose to keep the entire amount of the bonus, donate the entire amount, or split the $2 between yourself and Help 4 Needy. Please indicate the amount you would like to donate.'
];
// Page 5 - the donation-decision intro, shown above the $2 bonus slider.
export const donationIntroLines = [
  'In addition to and separate from the payment you received for your participation in this study, you would receive a $2 bonus payment to use as you wish.',
  'You could choose to keep the entire amount of the bonus, donate the entire amount, or split the $2 between yourself and Help 4 Needy.',
  'Please indicate the amount you would like to donate.',
]
// Shown once, on its own page, before the first questionnaire section.
export const measuresInstructionText =
  'Please answer the following questions based on the donation website you just viewed.'
export interface LikertItem {
  id: string
  text: string
  reverse?: boolean
  lowLabel?: string
  highLabel?: string
}

export interface MeasureBlock {
  id: string
  title: string
  instructions?: string
  lowLabel: string
  highLabel: string
  items: LikertItem[]
}

// Every post-stimulus scale from the study design, in order.
// "reverse: true" marks reverse-keyed items (R) - this app stores
// the raw 1-7 response; flip the scoring during analysis, not here.
export const measureBlocks: MeasureBlock[] = [
  {
    id: 'growthMindset',
    title: '',
    lowLabel: 'Strongly disagree',
    highLabel: 'Strongly agree',
    items: [
      { id: 'gm1', text: 'You have a certain amount of intelligence, and you can\u2019t really do much to change it.' },
      { id: 'gm2', text: 'Your intelligence is something about you that you can\u2019t change very much.' },
      { id: 'gm3', text: 'You can learn new things, but you can\u2019t really change your basic intelligence.' },
    ],
  },
  {
    id: 'senseOfControl',
    title: '',
    lowLabel: 'Strongly disagree',
    highLabel: 'Strongly agree',
    items: [
      { id: 'soc1', text: 'I can do just about anything I really set my mind to.' },
      { id: 'soc2', text: 'When I really want to do something, I will find a way to succeed at it.' },
      { id: 'soc3', text: 'There is little I can do to change the important things in my life.', reverse: true },
      { id: 'soc4', text: 'I feel helpless in dealing with the problems of life.', reverse: true },
      { id: 'soc5', text: 'Other people determine most of what I can and cannot do.', reverse: true },
      { id: 'soc6', text: 'What happens in my life is beyond my control.', reverse: true },
    ],
  },
  {
    id: 'dynamism',
    title: '',
    lowLabel: 'Strongly disagree',
    highLabel: 'Strongly agree',
    items: [
      { id: 'dyn1', text: 'The interface looks dynamic.' },
      { id: 'dyn2', text: 'The system appears to be in motion.' },
      { id: 'dyn3', text: 'The presentation feels lively.' },
      { id: 'dyn4', text: 'The interface appears energetic.' },
    ],
  },
  {
    id: 'arousal',
    title: '',
    instructions: 'How do you feel after viewing the donation website?',
    lowLabel: '',
    highLabel: '',
    items: [
      { id: 'ar1', text: 'I feel calm \u2013 I feel excited', lowLabel:'Feel Rather Calm', highLabel: 'Feel Rather Excited'},
      { id: 'ar2', text: 'I feel relaxed \u2013 I feel aroused', lowLabel:'Feel Rather Relaxed', highLabel: 'Feel Rather Aroused' },
      { id: 'ar3', text: 'I feel sleepy \u2013 I feel stimulated', lowLabel:'Feel Rather Sleepy', highLabel: 'Feel Rather Stimulated' },
    ],
  },
  {
    id: 'interaction',
    title: '',
    lowLabel: 'Strongly disagree',
    highLabel: 'Strongly agree',
    items: [
      { id: 'int1', text: 'I feel I can interact with the donation process.' },
      { id: 'int2', text: 'The donation website allows two-way communication.' },
      { id: 'int3', text: 'I can actively participate in the donation process.' },
      { id: 'int4', text: 'The donation website responds to my actions.' },
      { id: 'int5', text: 'The donation process feels interactive.' },
    ],
  },
  {
    id: 'personalConnection',
    title: '',
    lowLabel: 'Strongly disagree',
    highLabel: 'Strongly agree',
    items: [
      { id: 'pc1', text: 'Donating this money represents who I am.' },
      { id: 'pc2', text: 'Donating this money is a voluntary choice.' },
      { id: 'pc3', text: 'Donating this money reflects the type of person I am.' },
      { id: 'pc4', text: 'Donating this money is an important priority.' },
    ],
  },
  {
    id: 'thinkingOthers',
    title: '',
    lowLabel: 'Not at all',
    highLabel: 'Very much',
    items: [
      { id: 'to1', text: 'When considering spending this money, to what extent were you thinking about other people?' },
      { id: 'to2', text: 'When considering spending this money, to what extent were you thinking about the people the organization helps?' },
    ],
  },
  {
    id: 'warmGlow',
    title: '',
    lowLabel: 'Strongly disagree',
    highLabel: 'Strongly agree',
    items: [
      { id: 'wg1', text: 'Donating this money would improve my mood.' },
      { id: 'wg2', text: 'Donating this money would make me feel good.' },
    ],
  },
]

// Rebuilds the responses object in a fixed key order (matching the
// block/item order above) instead of whatever order the participant
// happened to click in. Without this, columns could land in different
// positions row to row in the Google Sheet.
export function orderResponses(responses: LikertResponses): LikertResponses {
  const ordered: LikertResponses = {}
  for (const block of measureBlocks) {
    for (const item of block.items) {
      ordered[item.id] = responses[item.id]
    }
  }
  return ordered
}
