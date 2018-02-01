import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import RepoTag from './RepoTag'
import { switchActiveRepo } from '../reducers/active-repo'
import config from '../config'

const { defaultTags } = config

const filterReposByTag = (allRepos, tag) => {
  const { id, repos } = tag

  switch (id) {
    case defaultTags.all.id:
      return allRepos
    case defaultTags.untagged.id:
      return allRepos.filter(repo => !repo._customTags.size)
    default:
      return repos.map(repoId => allRepos.find(repo => repo.id === repoId))
  }
}

const filterReposBySearch = (repos, search) => {
  return repos.filter(({ owner = { login: '' }, name = '' }) => {
    return (
      owner.login.toLowerCase().includes(search) ||
      name.toLowerCase().includes(search)
    )
  })
}

class RepoList extends Component {
  state = {
    activeRepos: List()
  }

  componentWillReceiveProps (nextProps) {
    const { allRepos, activeTag, search } = nextProps
    const { props } = this

    if (
      !allRepos.equals(props.allRepos) ||
      activeTag !== props.activeTag ||
      search !== props.search
    ) {
      this.setState({
        activeRepos: filterReposBySearch(filterReposByTag(allRepos, activeTag), search)
      })
    }
  }

  render () {
    const { props, state } = this

    return (
      <ul className='repo-list'>
        {
          props.allRepos.map(repo => (
            <li
              key={repo.id}
              className={`repo-item ${repo.id === props.activeRepo.id ? 'active' : ''} ${state.activeRepos.includes(repo) ? '' : 'dn'}`}
              onClick={_ => props.switchRepo(repo)}>
              <header>
                <h3 className='repo-title'>
                  <a href={repo.html_url} target="_blank" rel='noopener noreferrer'>
                    {repo.owner.login} / {repo.name}
                  </a>
                  {
                    repo.homepage &&
                    <a href={repo.homepage} target='_blank' rel='noopener noreferrer'>
                      <i className='fa fa-fw fa-lg fa-home' aria-hidden></i>
                    </a>
                  }
                </h3>
              </header>
              <p className='repo-desc'>{repo.description}</p>
              <ul className='tag-list'>
                {repo._customTags.map(tag => <RepoTag key={tag.id} repo={repo} tag={tag} />)}
              </ul>
              <footer className='repo-footer'>
                <span className='repo-star'><i className='fa fa-star' aria-hidden></i>{repo.stargazers_count}</span>
                <span className='repo-fork'><i className='fa fa-code-fork' aria-hidden></i>{repo.forks_count}</span>
                <span className='repo-language'>{repo.language}</span>
              </footer>
            </li>
          ))
        }
      </ul>
    )
  }
}

RepoList.propTypes = {
  search: PropTypes.string,
  allRepos: PropTypes.instanceOf(List).isRequired,
  activeTag: PropTypes.object.isRequired,
  activeRepo: PropTypes.object.isRequired,
  switchRepo: PropTypes.func.isRequired
}

RepoList.defaultTags = {
  search: ''
}

const mapStateToProps = state => ({
  allRepos: state.starredRepos,
  activeTag: state.activeTag,
  activeRepo: state.activeRepo
})

const mapDispatchToProps = dispatch => ({
  switchRepo: repo => dispatch(switchActiveRepo(repo))
})

export default connect(mapStateToProps, mapDispatchToProps)(RepoList)
