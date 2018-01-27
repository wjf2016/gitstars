import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
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
      repos.forEach(repo => (repo._customTags = List()))
      starredRepos.push(...repos)
    } while (repos.length === starredReposPerPage)

    resolve(starredRepos)
  })
}

class App extends Component {
  state = {
    defaultTags: List(),
    languageTags: List()
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

      return resolve({ starredRepos, gistContent })
    }).then(({ starredRepos, gistContent }) => {
      const { tags: customTags } = JSON.parse(gistContent)
      let languageTags = List()
      let dateNow = Date.now()

      console.time('init language tags')
      starredRepos.forEach(({ id: repoId, language }) => {
        defaultTags.all.repos = defaultTags.all.repos.push(repoId)

        if (!language) return

        const languageTag = languageTags.find(tag => tag.name === language)
        if (languageTag) {
          languageTag.repos = languageTag.repos.push(repoId)
        } else {
          languageTags = languageTags.push({ id: dateNow, name: language, repos: List([repoId]) })
          dateNow += 1
        }
      })
      console.timeEnd('init language tags')

      this.setState({ languageTags })

      console.time('init starred repositories custom tags')
      customTags.forEach(tag => {
        tag.repos.forEach((repoId, index, repos) => {
          const repo = starredRepos.find(({ id }) => id === repoId)
          if (repo) {
            repo._customTags = repo._customTags.push({ id: tag.id, name: tag.name })
          } else {
            // isIncludeInvalidId = true
            repos[index] = undefined
          }
        })
        tag.repos = List(tag.repos.filter(repo => repo))
      })
      console.timeEnd('init starred repositories custom tags')

      defaultTags.untagged.repos = List(starredRepos.filter(repo => !repo._customTags.size).map(repo => repo.id))

      this.setState({ defaultTags: Object.values(defaultTags) })

      this.props.initStarredRepos(starredRepos)
      this.props.initCustomTags(customTags)

      if (!isCustomTagsFromLocalStorage) {
        window.localStorage.setItem(gistId, gistContent)
      }
    })
  }

  render () {
    const { defaultTags, languageTags } = this.state
    return (
      <div id='app'>
        <Sidebar defaultTags={defaultTags} languageTags={languageTags} />
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
