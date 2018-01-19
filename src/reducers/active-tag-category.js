import config from '../config'

const SWITCH_TAG_CATEGORY = 'SWITCH_TAG_CATEGORY'

const { custom: customTagCategory } = config.tagCategorys
export default function activeTagCategory (state = customTagCategory, action) {
  switch (action.type) {
    case SWITCH_TAG_CATEGORY:
      return action.category
    default:
      return state
  }
}

export const switchTagCategory = category => ({ category, type: SWITCH_TAG_CATEGORY })
