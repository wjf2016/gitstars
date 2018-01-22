import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { switchActiveRepo } from '../reducers/active-repo'
import { filterActiveReposByTag } from '../reducers/active-repos'
import '../subsidebar.css'

class SubSidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchValue: ''
    }

    this.handleChangeSearchValue = this.handleChangeSearchValue.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeTag.id !== this.props.activeTag.id) {
      this.props.onFilterReposByTag(nextProps.activeTag)
    }
  }

  handleChangeSearchValue () {

  }

  handleSwitchTag () {

  }

  render () {
    const { props, state, handleChangeSearchValue, handleSwitchTag } = this
    const { activeTag, activeRepo, activeRepos, onSwitchRepo } = props
    const { searchValue } = state

    return (
      <nav id='subsidebar'>
        <label className='search-label'>
          <i className='fa fa-search' aria-hidden='true'></i>
          <input
            type='text'
            className='search-input'
            value={searchValue}
            placeholder={activeTag.name}
            onChange={handleChangeSearchValue}
          />
        </label>
        <ul className='repo-list'>
          {
            activeRepos.map(repo => (
              <li
                key={repo.id}
                className={`repo-item ${repo.id === activeRepo.id ? 'active' : ''}`}
                onClick={onSwitchRepo.bind(this, repo)}>
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
                    repo._customTags.map(tag => (
                      <li key={tag.id} className='tag-item' onClick={handleSwitchTag.bind(this, tag)}>
                        {tag.name}
                      </li>
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
      </nav>
    )
  }
}

SubSidebar.propTypes = {
  activeTag: PropTypes.object,
  activeRepo: PropTypes.object,
  activeRepos: PropTypes.array,
  onSwitchRepo: PropTypes.func.isRequired,
  onFilterReposByTag: PropTypes.func.isRequired
}

SubSidebar.defaultProps = {
  activeTag: {},
  activeRepo: {},
  activeRepos: []
}

const mapStateToProps = state => ({
  activeTag: state.activeTag,
  activeRepo: state.activeRepo,
  activeRepos: state.activeRepos
})

const mapDispatchToProps = dispatch => ({
  onSwitchRepo: repo => dispatch(switchActiveRepo(repo)),
  onFilterReposByTag: tag => dispatch(filterActiveReposByTag(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubSidebar)
