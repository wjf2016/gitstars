import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Sidebar from './Sidebar'
import Main from './Main'
import { initCustomTags } from '../reducers/custom-tags'
import { initActiveRepos } from '../reducers/active-repos'
import { getStarredRepos, getGitstarsGist } from '../api'
import config from '../config'

const { gistId, starredReposPerPage, defaultTags } = config

function loadStarredRepos (page = 1) {
  return new Promise(async (resolve, reject) => {
    const starredRepos = []
    let repos = []

    do {
      repos = await getStarredRepos(page++)
      repos.forEach(repo => (repo._customTags = []))
      starredRepos.push(...repos)
    } while (repos.length === starredReposPerPage)
    // this.loadStarredReposCompleted = true
    // resolve(this.starredRepos)

    resolve(starredRepos)
  })
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      languageTags: []
    }
  }

  componentDidMount () {
    let isCustomTagsFromLocalStorage = false

    /* eslint-disable no-new */
    new Promise(async (resolve, reject) => {
      let starredRepos = []
      let gistContent = window.localStorage.getItem(gistId)

      if (gistContent) {
        isCustomTagsFromLocalStorage = true
        starredRepos = await loadStarredRepos()
      } else {
        let gist = {};
        [starredRepos, gist] = await axios.all([loadStarredRepos(), getGitstarsGist(gistId)])
        gistContent = gist.files[config.filename].content
      }

      return resolve({
        starredRepos,
        customTags: JSON.parse(gistContent).tags
      })
    }).then(({ customTags, starredRepos }) => {
      const languageTags = []
      let dateNow = Date.now()

      starredRepos.forEach(({ id: repoId, language }) => {
        defaultTags.all.repos.push(repoId)

        if (!language) return

        const tag = languageTags.find(tag => tag.name === language)

        if (tag) {
          tag.repos.push(repoId)
        } else {
          languageTags.push({ id: dateNow, name: language, repos: [repoId] })
          dateNow += 1
        }
      })

      this.setState({ languageTags })

      customTags.forEach(tag => {
        tag.repos.forEach((repoId, index, repos) => {
          const { _customTags } = starredRepos.find(({ id }) => id === repoId) || {}
          if (_customTags) {
            _customTags.push({ id: tag.id, name: tag.name })
          } else {
            // isIncludeInvalidId = true
            repos[index] = undefined
          }
        })
        tag.repos = tag.repos.filter(repo => repo)
      })

      defaultTags.untagged.repos = starredRepos.filter(repo => !repo._customTags.length).map(repo => repo.id)

      this.props.initStarredRepos(starredRepos)
      this.props.initCustomTags(customTags)

      if (!isCustomTagsFromLocalStorage) {
        window.localStorage.setItem(gistId, JSON.stringify({
          lastModified: Date.now(),
          tags: customTags
        }))
      }
    })
  }

  render () {
    return (
      <div id='app'>
        <Sidebar languageTags={this.state.languageTags} />
        <Main />
      </div>
    )
  }
}

App.propTypes = {
  initStarredRepos: PropTypes.func.isRequired,
  initCustomTags: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  initStarredRepos: repos => dispatch(initActiveRepos(repos)),
  initCustomTags: tags => dispatch(initCustomTags(tags))
})

export default connect(null, mapDispatchToProps)(App)
