const INIT_STARRED_REPOS = 'INIT_STARRED_REPOS'
const ADD_STARRED_REPO_TAG = 'ADD_STARRED_REPO_TAG'
const DELETE_STARRED_REPO_TAG = 'DELETE_STARRED_REPO_TAG'

let repoIndex = 0
let tagIndex = 0

export default function starredRepos (state = null, action) {
  switch (action.type) {
    case INIT_STARRED_REPOS:
      return action.repos
    case ADD_STARRED_REPO_TAG:
      repoIndex = state.findIndex(repo => repo.id === action.repoId)
      return state.setIn(
        [repoIndex, '_customTags'],
        state.get(repoIndex)._customTags.push(action.tag)
      )
    case DELETE_STARRED_REPO_TAG:
      repoIndex = state.findIndex(repo => repo.id === action.repoId)
      tagIndex = state.get(repoIndex)._customTags.findIndex(tag => tag.id === action.tagId)
      return state.deleteIn([repoIndex, '_customTags', tagIndex])
    default:
      return state
  }
}

export const initStarredRepos = repos => ({ repos, type: INIT_STARRED_REPOS })
export const addStarredRepoTag = (repoId, tag) => ({ repoId, tag, type: ADD_STARRED_REPO_TAG })
export const deleteStarredRepoTag = (repoId, tagId) => ({ repoId, tagId, type: DELETE_STARRED_REPO_TAG })
