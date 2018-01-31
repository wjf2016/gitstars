import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import RepoTag from './RepoTag'
import { switchActiveRepo } from '../reducers/active-repo'

class RepoList extends Component {
  render () {
    const { activeRepos, activeRepo, switchRepo } = this.props

    return (
      <ul className='repo-list'>
        {
          activeRepos.map((repo, repoIndex) => (
            <li
              key={repo.id}
              className={`repo-item ${repo.id === activeRepo.id ? 'active' : ''}`}
              onClick={_ => switchRepo(repo)}>
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
                {
                  repo._customTags.map((tag, tagIndex) => (
                    <RepoTag key={tag.id} repo={repo} repoIndex={repoIndex} tag={tag} tagIndex={tagIndex} />
                  ))
                }
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
  activeRepos: PropTypes.instanceOf(List).isRequired,
  activeRepo: PropTypes.object.isRequired,
  switchRepo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  activeRepos: state.activeRepos,
  activeRepo: state.activeRepo
})

const mapDispatchToProps = dispatch => ({
  switchRepo: repo => dispatch(switchActiveRepo(repo))
})

export default connect(mapStateToProps, mapDispatchToProps)(RepoList)
