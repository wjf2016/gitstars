import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { switchActiveRepo } from '../reducers/active-repo'
import '../subsidebar.css'

class SubSidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchValue: ''
    }

    this.handleChangeSearchValue = this.handleChangeSearchValue.bind(this)
  }

  handleChangeSearchValue () {

  }

  handleSwitchTag () {

  }

  render () {
    const { props, state, handleChangeSearchValue, handleSwitchTag } = this
    const { activeRepo, starredRepos, onSwitchRepo } = props
    const { searchValue } = state

    return (
      <nav id='subsidebar'>
        <label className='search-label'>
          <i className='fa fa-search' aria-hidden='true'></i>
          <input
            type='text'
            className='search-input'
            value={searchValue}
            placeholder={activeRepo.name}
            onChange={handleChangeSearchValue}
          />
        </label>
        <ul className='repo-list'>
          {
            starredRepos.map(repo => (
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
                    repo._tags.custom.map(tag => (
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
        {/* <ul v-show="repos.length" class="repo-list">
        <li
          v-for="repo in repos"
          :key="repo.id"
          :class="{ active: repo.id === activeRepoId }"
          class="repo-item"
          @click="handleSwitchRepo(repo)">
          <header>
            <h3 class="repo-title">
              <a :href="repo.html_url" target="_blank">{{ repo.owner.login }} / {{ repo.name }}</a>
              <a v-show="repo.homepage" :href="repo.homepage" target="_blank">
                <i class="fa fa-fw fa-lg fa-home" aria-hidden="true"></i>
              </a>
            </h3>
          </header>
          <p class="repo-desc">{{ repo.description }}</p>
          <ul class="tag-list">
            <li
              v-for="tag of repo._tags.custom"
              :key="tag.id"
              class="tag-item"
              @click.stop="handleSwitchTag(tag)">
              <el-tag size="small">
                {{ tag.name }}
                <el-popover :title="`${$t('areYouSure')}？`" placement="right">
                  <i slot="reference" class="el-tag__close el-icon-close tag-delete-btn" @click.stop="handleDeleteTag"></i>
                  <footer class="popover-footer">
                    <el-button size="mini" @click="handleCancelDeleteTag">{{ $t('no') }}</el-button>
                    <el-button type="primary" size="mini" @click="handleConfirmDeleteTag(repo.id, tag.id)">
                      {{ $t('yes') }}
                    </el-button>
                  </footer>
                </el-popover>
              </el-tag>
            </li>
          </ul>
          <footer class="repo-footer">
            <span class="repo-star"><i class="fa fa-star" aria-hidden="true"></i>{{ repo.stargazers_count }}</span>
            <span class="repo-fork"><i class="fa fa-code-fork" aria-hidden="true"></i>{{ repo.forks_count }}</span>
            <span class="repo-language">{{ repo.language }}</span>
          </footer>
        </li>
      </ul> */}
      </nav>
    )
  }
}

SubSidebar.propTypes = {
  activeRepo: PropTypes.object,
  starredRepos: PropTypes.array,
  onSwitchRepo: PropTypes.func.isRequired
}

SubSidebar.defaultProps = {
  activeRepo: {},
  starredRepos: []
}

const mapStateToProps = state => ({
  activeRepo: state.activeRepo,
  starredRepos: state.starredRepos
})

const mapDispatchToProps = dispatch => ({
  onSwitchRepo: repo => dispatch(switchActiveRepo(repo))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubSidebar)
