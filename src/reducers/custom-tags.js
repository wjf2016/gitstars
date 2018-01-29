import React from 'react'
import { List } from 'immutable'
import { notification } from 'antd'
import { saveGitstarsGist } from '../api'
import config from '../config'

const INIT_CUSTOM_TAGS = 'INIT_CUSTOM_TAGS'
const ADD_CUSTOM_TAG = 'ADD_CUSTOM_TAG'
const MODIFY_CUSTOM_TAG_NAME = 'MODIFY_CUSTOM_TAG_NAME'
const DELETE_CUSTOM_TAG = 'DELETE_CUSTOM_TAG'
const MOVE_CUSTOM_TAG = 'MOVE_CUSTOM_TAG'
const ADD_CUSTOM_TAG_REPO = 'ADD_CUSTOM_TAG_REPO'
const DELETE_CUSTOM_TAG_REPO = 'DELETE_CUSTOM_TAG_REPO'

export default function customTagsReducer (state = List(), action) {
  switch (action.type) {
    case INIT_CUSTOM_TAGS:
      return List(action.tags)
    case ADD_CUSTOM_TAG:
      return state.push(action.tag)
    case MODIFY_CUSTOM_TAG_NAME:
      return state.setIn([action.index, 'name'], action.name)
    case DELETE_CUSTOM_TAG:
      return state.delete(action.index)
    case MOVE_CUSTOM_TAG:
      return state.delete(action.fromIndex).insert(action.toIndex, state.get(action.fromIndex))
    case ADD_CUSTOM_TAG_REPO:
      return state.setIn(
        [action.tagIndex, 'repos'],
        state.get(action.tagIndex).repos.push(action.id)
      )
    case DELETE_CUSTOM_TAG_REPO:
      const tag = state.find(tag => tag.id === action.tagId)
      const tagIndex = state.findIndex(tag => tag.id === action.tagId)
      const repoIndex = tag.repos.findIndex(repo => repo.id === action.repoId)
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
export const addCustomTagRepo = (tagIndex, id) => ({ tagIndex, id, type: ADD_CUSTOM_TAG_REPO })
export const deleteCustomTagRepo = (tagId, repoId) => ({ tagId, repoId, type: DELETE_CUSTOM_TAG_REPO })

export const updateCustomTags = action => (dispatch, getState) => {
  const DateNow = Date.now()
  notification.info({
    key: DateNow,
    icon: <i className="fa fa-cog fa-spin fa-fw"></i>,
    message: '正在更新',
    description: '请稍后...',
    duration: 0
  })

  const { customTags } = getState()
  let newCustomTags = customTags

  if (action) {
    newCustomTags = customTagsReducer(customTags, action)
    dispatch(action)
  }

  const gist = { lastModified: DateNow, tags: newCustomTags }
  return saveGitstarsGist(gist)
    .then(_ => notification.close(DateNow))
    .then(_ => window.localStorage.setItem(config.gistId, JSON.stringify(gist)))
    .catch(_ => dispatch(initCustomTags(customTags)))
}
