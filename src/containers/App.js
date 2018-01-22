import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import Sidebar from './Sidebar'
import Main from './Main'
import { initCustomTags } from '../reducers/custom-tags'
import { initStarredRepos } from '../reducers/starred-repos'
import { getStarredRepos, getGitstarsGist } from '../api'
import config from '../config'

function loadStarredRepos (page = 1) {
  return new Promise(async (resolve, reject) => {
    const starredRepos = []
    let repos = []

    do {
      repos = await getStarredRepos(page++)
      repos.forEach(repo => (repo._tags = { custom: [], language: [] }))
      starredRepos.push(...repos)
    } while (repos.length === config.starredReposPerPage)
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
    /* eslint-disable no-new */
    new Promise(async (resolve, reject) => {
      let gist = window.localStorage.getItem(config.gistId)
      let starredRepos = []

      if (gist) {
        // this.props.initCustomTags(JSON.parse(gist.tags))
        starredRepos = await loadStarredRepos()
      } else {
        await (axios.spread(async () => {
          const [repos, { files }] = [...await axios.all([loadStarredRepos(), getGitstarsGist(config.gistId)])]
          starredRepos = repos
          gist = files[config.filename].content
        }))()
      }

      return resolve({
        starredRepos,
        customTags: JSON.parse(gist).tags
      })
    }).then(({ customTags, starredRepos }) => {
      let dateNow = Date.now()

      starredRepos.forEach(({ id: repoId, language, _tags }) => {
        if (!language) return

        const { language: languageTags } = _tags
        const tag = this.state.languageTags.find(tag => tag.name === language)

        if (tag) {
          tag.repos.push(repoId)
          languageTags.push({ id: tag.id, name: tag.name })
        } else {
          this.state.languageTags.push({ id: dateNow, name: language, repos: [repoId] })
          languageTags.push({ id: dateNow, name: language })
          dateNow += 1
        }
      })

      this.props.initStarredRepos(starredRepos)

      customTags.forEach(tag => {
        tag.repos.forEach((repoId, index, repos) => {
          const { _tags } = starredRepos.find(({ id }) => id === repoId) || {}
          if (_tags) {
            _tags.custom.push({ id: tag.id, name: tag.name })
          } else {
            // isIncludeInvalidId = true
            repos[index] = undefined
          }
        })
        tag.repos = tag.repos.filter(repo => !!repo)
      })

      this.props.initCustomTags(customTags)
    })
  }

  render () {
    return (
      <div id='app'>
        <Sidebar />
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
  initStarredRepos: repos => dispatch(initStarredRepos(repos)),
  initCustomTags: tags => dispatch(initCustomTags(tags))
})

export default connect(null, mapDispatchToProps)(App)
