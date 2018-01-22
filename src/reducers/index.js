import { combineReducers } from 'redux'
import activeTag from './active-tag'
import customTags from './custom-tags'
import starredRepos from './starred-repos'
import activeRepo from './active-repo'

export default combineReducers({
  activeTag,
  customTags,
  starredRepos,
  activeRepo
})
