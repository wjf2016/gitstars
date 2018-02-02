import React from 'react'
import { notification } from 'antd'
import { saveGitstarsGist } from '../api'
import { deleteStarredRepoTag, initStarredRepos, addStarredRepoTag } from './starred-repos'
import config from '../config'

const INIT_CUSTOM_TAGS = 'INIT_CUSTOM_TAGS'
const ADD_CUSTOM_TAG = 'ADD_CUSTOM_TAG'
const MODIFY_CUSTOM_TAG_NAME = 'MODIFY_CUSTOM_TAG_NAME'
const DELETE_CUSTOM_TAG = 'DELETE_CUSTOM_TAG'
const MOVE_CUSTOM_TAG = 'MOVE_CUSTOM_TAG'
const ADD_CUSTOM_TAG_REPO = 'ADD_CUSTOM_TAG_REPO'
const DELETE_CUSTOM_TAG_REPO = 'DELETE_CUSTOM_TAG_REPO'

let tagIndex = 0
let repoIndex = 0

export default function customTagsReducer (state = null, action) {
  switch (action.type) {
    case INIT_CUSTOM_TAGS:
      return action.tags
    case ADD_CUSTOM_TAG:
      return state.push(action.tag)
    case MODIFY_CUSTOM_TAG_NAME:
      return state.setIn([action.index, 'name'], action.name)
    case DELETE_CUSTOM_TAG:
      return state.delete(action.index)
    case MOVE_CUSTOM_TAG:
      return state.delete(action.fromIndex).insert(action.toIndex, state.get(action.fromIndex))
    case ADD_CUSTOM_TAG_REPO:
      tagIndex = state.findIndex(tag => tag.id === action.tag.id)
      return state.setIn(
        [tagIndex, 'repos'],
        state.get(tagIndex).repos.push(action.repoId)
      )
    case DELETE_CUSTOM_TAG_REPO:
      tagIndex = state.findIndex(tag => tag.id === action.tag.id)
      repoIndex = action.tag.repos.findIndex(repoId => repoId === action.repoId)
      return state.deleteIn([tagIndex, 'repos', repoIndex])
    default:
      return state
  }
}

export const initCustomTags = tags => ({ tags, type: INIT_CUSTOM_TAGS })
export const addCustomTag = tag => ({ tag, type: ADD_CUSTOM_TAG })
export const modifyCustomTagName = (index, name) => ({ index, name, type: MODIFY_CUSTOM_TAG_NAME })
export const deleteCustomTag = index => ({ index, type: DELETE_CUSTOM_TAG })
export const moveCustomTag = (fromIndex, toIndex) => ({ fromIndex, toIndex, type: MOVE_CUSTOM_TAG })
export const addCustomTagRepo = (repoId, tag) => ({ repoId, tag, type: ADD_CUSTOM_TAG_REPO })
export const deleteCustomTagRepo = (tag, repoId) => ({ tag, repoId, type: DELETE_CUSTOM_TAG_REPO })

export const updateCustomTags = action => (dispatch, getState) => {
  const DateNow = Date.now()
  notification.info({
    key: DateNow,
    icon: <i className="fa fa-cog fa-spin fa-fw"></i>,
    message: '正在更新',
    description: '请稍后...',
    duration: 0
  })

  const { customTags, starredRepos } = getState()
  let newCustomTags = customTags

  if (action) {
    newCustomTags = customTagsReducer(customTags, action)
    dispatch(action)

    if (action.type === DELETE_CUSTOM_TAG_REPO) {
      const { repoId, tag } = action
      dispatch(deleteStarredRepoTag(repoId, tag.id))
    } else if (action.type === ADD_CUSTOM_TAG_REPO) {
      const { repoId, tag } = action
      dispatch(addStarredRepoTag(repoId, tag))
    }
  }

  const gist = { lastModified: DateNow, tags: newCustomTags }
  return saveGitstarsGist(gist)
    .then(() => {
      notification.close(DateNow)
      window.localStorage.setItem(config.gistId, JSON.stringify(gist))
    })
    .catch(() => {
      dispatch(initCustomTags(customTags))

      if (
        action.type === DELETE_CUSTOM_TAG_REPO ||
        action.type === ADD_CUSTOM_TAG_REPO
      ) {
        dispatch(initStarredRepos(starredRepos))
      }
    })
}
