import { combineReducers } from 'redux'

function reposFilter (state = [], action) {
  switch (action.type) {
    case 'SHOW_ALL':
      return state
    case 'SHOW_UNTAGGED':
      return
    default:
      return state
  }
}

export default combineReducers({
  reposFilter
})
