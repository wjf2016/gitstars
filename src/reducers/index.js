import { combineReducers } from 'redux'
import activeTag from './active-tag'
// import activeTagCategory from './active-tag-category'
import customTags from './custom-tags'

export default combineReducers({
  activeTag,
  // activeTagCategory,
  customTags
})
