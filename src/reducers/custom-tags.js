const INIT_TAGS = 'INIT_TAGS'
const PUSH_TAG = 'PUSH_TAG'

export default function customTags (state = [], action) {
  switch (action.type) {
    case INIT_TAGS:
      return action.tags
    case PUSH_TAG:
      return [...state, { id: Date.now(), name: action.name, repos: [] }]
    default:
      return state
  }
}

export const initCustomTags = tags => ({ tags, type: INIT_TAGS })

export const addCustomTag = name => ({ name, type: PUSH_TAG })
