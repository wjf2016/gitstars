import { List } from 'immutable'
import config from '../config'

const INIT_STARRED_REPOS = 'INIT_STARRED_REPOS'
const ADD_STARRED_REPOS_TAG = 'ADD_STARRED_REPOS_TAG'
const DELETE_STARRED_REPOS_TAG = 'DELETE_STARRED_REPOS_TAG'

export default function (state = List(), action) {
  let repoIndex = 0
  let tagIndex = 0

  switch (action.type) {
    case INIT_STARRED_REPOS:
      return List(action.repos)
    case ADD_STARRED_REPOS_TAG:
      repoIndex = state.findIndex(repo => repo.id === action.repoId)
      return state.setIn(
        [repoIndex, '_customTags'],
        state[repoIndex]._customTags.push(action.tagId)
      )
    case DELETE_STARRED_REPOS_TAG:
      repoIndex = state.findIndex(repo => repo.id === action.repoId)
      tagIndex = state[repoIndex]._customTags.find(tag => tag.id === action.tagId)
      return state.deleteIn([repoIndex, '_customTags', tagIndex])
    default:
      return state
  }
}

export const initStarredRepos = repos => ({ repos, type: INIT_STARRED_REPOS })
export const addStarredReposTag = (repoId, tagId) => ({ repoId, tagId, type: ADD_STARRED_REPOS_TAG })
export const deleteStarredReposTag = repoId => ({ repoId, type: DELETE_STARRED_REPOS_TAG })
