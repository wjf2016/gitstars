const INIT_REPOS = 'INIT_REPOS'

export default function starredReois (state = [], action) {
  switch (action.type) {
    case INIT_REPOS:
      return action.repos
    default:
      return state
  }
}

export const initStarredRepos = repos => ({ repos, type: INIT_REPOS })
