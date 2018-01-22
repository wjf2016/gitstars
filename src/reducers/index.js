import { combineReducers } from 'redux'
import activeTag from './active-tag'
import customTags from './custom-tags'
import activeRepos from './active-repos'
import activeRepo from './active-repo'

export default combineReducers({
  activeTag,
  customTags,
  activeRepos,
  activeRepo
})
