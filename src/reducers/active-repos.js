import { List } from 'immutable'
import config from '../config'

const INIT_ACTIVE_REPOS = 'INIT_ACTIVE_REPOS'
const FILTER_REPOS_BY_TAG = 'FILTER_REPOS_BY_TAG'
const DELETE_REPO_CUSTOM_TAG = 'DELETE_REPO_CUSTOM_TAG'
const INSERT_REPO_CUSTOM_TAG = 'INSERT_REPO_CUSTOM_TAG'

const { defaultTags } = config
let allRepos = List()

export default function activeRepos (state = allRepos, action) {
  switch (action.type) {
    case INIT_ACTIVE_REPOS:
      if (action.repos.size === defaultTags.all.repos.size) {
        // bug
        // 删除标签后切换标签在切换回标签
        // 被删除的标签依然存在
        allRepos = action.repos
      }
      return action.repos
    case FILTER_REPOS_BY_TAG:
      const { id: tagId, repos: tagRepos } = action.tag
      if (tagId === defaultTags.all.id) {
        return allRepos
      } else if (tagId === defaultTags.untagged.id) {
        return allRepos.filter(repo => !repo._customTags.size)
      } else {
        return tagRepos.map(repoId => allRepos.find(repo => repo.id === repoId))
      }
    case DELETE_REPO_CUSTOM_TAG:
      return state.deleteIn([action.repoIndex, '_customTags', action.tagIndex])
    // case INSERT_REPO_CUSTOM_TAG:
    //   const repoIndex = state.findIndex(repo => repo.id === action.repoId)
    //   return state.setIn(
    //     [repoIndex, '_customTags'],
    //     state.get(repoIndex)._customTags.splice(action.tagIndex, 0, action.tag)
    //   )
    default:
      return state
  }
}

export const initActiveRepos = repos => ({ repos, type: INIT_ACTIVE_REPOS })
export const filterActiveReposByTag = tag => ({ tag, type: FILTER_REPOS_BY_TAG })
export const deleteRepoCustomTag = (repoIndex, tagIndex) => ({ repoIndex, tagIndex, type: DELETE_REPO_CUSTOM_TAG })
export const insertRepoCustomTag = (repoId, tagIndex, tag) => ({ repoId, tagIndex, tag, type: INSERT_REPO_CUSTOM_TAG })
