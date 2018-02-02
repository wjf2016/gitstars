import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import RepoList from './RepoList'
import config from '../config'

const { defaultTags } = config

const filterReposByTag = (starredRepos, tag) => {
  const { id, repos } = tag

  switch (id) {
    case defaultTags.all.id:
      return starredRepos
    case defaultTags.untagged.id:
      return starredRepos.filter(repo => !repo._customTags.size)
    default:
      return repos.map(repoId => starredRepos.find(repo => repo.id === repoId))
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

class SubSidebar extends Component {
  state = {
    searchValue: '',
    activeRepos: List()
  }

  componentWillReceiveProps (nextProps) {
    const { starredRepos, activeTag } = nextProps
    const { props, state } = this

    if (
      !starredRepos.equals(props.starredRepos) ||
      activeTag !== props.activeTag
    ) {
      this.setState({
        activeRepos: filterReposBySearch(filterReposByTag(starredRepos, activeTag), state.searchValue)
      })
    }
  }

  handleChangeSearchValue = e => {
    const searchValue = e.target.value
    const { starredRepos, activeTag } = this.props

    this.setState({
      searchValue,
      activeRepos: filterReposBySearch(filterReposByTag(starredRepos, activeTag), searchValue)
    })
  }

  render () {
    const { props, state, handleChangeSearchValue } = this
    const { starredRepos, activeTag } = props
    const { searchValue, activeRepos } = state

    return (
      <nav id='subsidebar'>
        <label className='search-label'>
          <i className='fa fa-search' aria-hidden='true'></i>
          <input
            type='text'
            className='search-input'
            value={searchValue}
            placeholder={`开发者 | 仓库名 @${activeTag.name}`}
            onChange={handleChangeSearchValue}
          />
        </label>
        <RepoList activeRepos={activeRepos} />
        <div className={`no-match vc-p ${starredRepos && !activeRepos.size ? '' : 'dn'}`}>
          <i className='fa fa-bell-o fa-3x' aria-hidden='true'></i>
          <p className='ttc'>没有匹配仓库</p>
          <p>
            <i className='fa fa-hand-o-left fa-lg' aria-hidden='true'></i>
            <span>切换标签 或 调整搜索</span>
            <i className='fa fa-hand-o-up fa-lg' aria-hidden='true'></i>
          </p>
        </div>
        <div className={`loader vc-p ${starredRepos ? 'dn' : ''}`}>
          <i className='fa fa-cog fa-spin fa-2x'></i>
          <p className='ttc'>正在获取 Starred 仓库...</p>
        </div>
      </nav>
    )
  }
}

SubSidebar.propTypes = {
  starredRepos: PropTypes.instanceOf(List),
  activeTag: PropTypes.object,
  activeRepo: PropTypes.object
}

SubSidebar.defaultProps = {
  activeTag: {},
  activeRepo: {}
}

const mapStateToProps = state => ({
  starredRepos: state.starredRepos,
  activeTag: state.activeTag,
  activeRepo: state.activeRepo
})

export default connect(mapStateToProps)(SubSidebar)
