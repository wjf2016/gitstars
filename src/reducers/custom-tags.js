const INIT_TAGS = 'INIT_TAGS'

export default function customTags (state = [], action) {
  switch (action.type) {
    case INIT_TAGS:
      return action.tags
    default:
      return state
  }
}
