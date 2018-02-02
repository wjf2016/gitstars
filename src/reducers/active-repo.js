const SWITCH_ACTIVE_REPO = 'SWITCH_ACTIVE_REPO'

export default function activeRepo (state = null, action) {
  switch (action.type) {
    case SWITCH_ACTIVE_REPO:
      return action.repo
    default:
      return state
  }
}

export const switchActiveRepo = repo => ({ repo, type: SWITCH_ACTIVE_REPO })
