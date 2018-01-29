import config from '../config'

const INIT_TAG = 'INIT_TAG'
const SWITCH_TAG = 'SWITCH_TAG'

const { all: tagAll } = config.defaultTags
export default function activeTag (state = tagAll, action) {
  switch (action.type) {
    case INIT_TAG:
      return tagAll
    case SWITCH_TAG:
      return action.tag
    default:
      return state
  }
}

export const initactiveTag = tag => ({ tag, type: INIT_TAG })
export const switchTag = tag => ({ tag, type: SWITCH_TAG })
