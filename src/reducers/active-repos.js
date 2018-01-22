import config from '../config'

const INIT_REPOS = 'INIT_REPOS'
const FILTER_REPOS_BY_TAG = 'FILTER_REPOS_BY_TAG'

const { defaultTags } = config
let repos = []

export default function activeRepos (state = repos, action) {
  switch (action.type) {
    case INIT_REPOS:
      repos = action.repos
      return repos
    case FILTER_REPOS_BY_TAG:
      const { id: tagId, repos: tagRepos } = action.tag

      if (tagId === defaultTags.all.id) {
        return repos
      } else if (tagId === defaultTags.untagged.id) {
        return repos.filter(repo => !repo._customTags.length)
      } else {
        return tagRepos.map(repoId => repos.find(repo => repo.id === repoId))
      }
    default:
      return state
  }
}

export const initActiveRepos = repos => ({ repos, type: INIT_REPOS })

export const filterActiveReposByTag = tag => ({ tag, type: FILTER_REPOS_BY_TAG })
