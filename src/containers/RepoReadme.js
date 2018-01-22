import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRepoReadme, getRenderedReadme } from '../api'

class RepoReadme extends Component {
  constructor (props) {
    super(props)

    this.state = {
      repoReadme: ''
    }
  }

  async componentWillReceiveProps (nextProps) {
    const { id, owner, name } = nextProps.activeRepo

    if (id !== this.props.activeRepo.id) {
      const { content } = await getRepoReadme(owner.login, name)

      // 包含中文内容的 base64 解码
      const repoReadme = await getRenderedReadme(decodeURIComponent(escape(atob(content))))
      this.setState({ repoReadme })
    }
  }

  render () {
    const { activeRepo } = this.props
    const { repoReadme } = this.state

    return (
      Object.keys(activeRepo).length &&
      <div className='content'>
        <header className='repo-readme__header'>
          <h3 className='repo-title'>
            <a href={activeRepo.html_url} target='_blank' rel='noopener noreferrer'>
              <i className='fa fa-fw fa-lg fa-github' aria-hidden></i>
            </a>
            {activeRepo.owner.login} / {activeRepo.name}
          </h3>
        </header>
        <article dangerouslySetInnerHTML={{ __html: repoReadme }} className='markdown-body'></article>
      </div >
    )
  }
}

RepoReadme.propTypes = {
  activeRepo: PropTypes.object
}

RepoReadme.defaultProps = {
  activeRepo: {}
}

const mapStateToProps = state => ({
  activeRepo: state.activeRepo
})

export default connect(mapStateToProps)(RepoReadme)
