import config from '../config'

const SWITCH_ACTIVE_TAG = 'SWITCH_ACTIVE_TAG'

export default function activeTag (state = config.defaultTags.all, action) {
  switch (action.type) {
    case SWITCH_ACTIVE_TAG:
      return action.tag
    default:
      return state
  }
}

export const switchActiveTag = tag => ({ tag, type: SWITCH_ACTIVE_TAG })
