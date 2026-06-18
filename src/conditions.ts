import { Condition } from './types'

// Random 2x2 between-subjects assignment, 25% chance per cell.
// Each participant gets exactly one combination and keeps it for
// the whole session.
export function assignCondition(): Condition {
  const displayMode = Math.random() < 0.5 ? 'expanded' : 'control'
  const appealType = Math.random() < 0.5 ? 'autonomous' : 'immediate'
  return { displayMode, appealType }
}
