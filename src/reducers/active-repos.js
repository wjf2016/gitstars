import { List } from 'immutable'
import config from '../config'

const INIT_REPOS = 'INIT_REPOS'
const FILTER_REPOS_BY_TAG = 'FILTER_REPOS_BY_TAG'
const DELETE_REPO_CUSTOM_TAG = 'DELETE_REPO_CUSTOM_TAG'

const { defaultTags } = config
let repos = List()

export default function activeRepos (state = repos, action) {
  switch (action.type) {
    case INIT_REPOS:
      repos = List(action.repos)
      return repos
    case FILTER_REPOS_BY_TAG:
      const { id: tagId, repos: tagRepos } = action.tag

      if (tagId === defaultTags.all.id) {
        return repos
      } else if (tagId === defaultTags.untagged.id) {
        return repos.filter(repo => !repo._customTags.size)
      } else {
        // tagRepos 是 Immutable List 数据
        // activeRepos 的数据类型为 Array
        return List(tagRepos.map(repoId => repos.find(repo => repo.id === repoId)))
      }
    case DELETE_REPO_CUSTOM_TAG:
      return state.deleteIn([action.repoIndex, '_customTags', action.tagIndex])
    default:
      return state
  }
}

export const initActiveRepos = repos => ({ repos, type: INIT_REPOS })
export const filterActiveReposByTag = tag => ({ tag, type: FILTER_REPOS_BY_TAG })
export const deleteRepoCustomTag = (repoIndex, tagIndex) => ({ repoIndex, tagIndex, type: DELETE_REPO_CUSTOM_TAG })
