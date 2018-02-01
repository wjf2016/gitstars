import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AutoComplete, Input } from 'antd'
import { List } from 'immutable'
import { addStarredRepoTag } from '../reducers/starred-repos'
import { getRepoReadme, getRenderedReadme } from '../api'

class RepoReadme extends Component {
  state = {
    readme: ''
  }

  async componentWillReceiveProps (nextProps) {
    const { activeRepo, customTags } = nextProps

    if (activeRepo.id !== this.props.activeRepo.id) {
      const { content } = await getRepoReadme(activeRepo.owner.login, activeRepo.name)

      // 包含中文内容的 base64 解码
      const readme = await getRenderedReadme(decodeURIComponent(escape(atob(content))))
      this.setState({ readme })
    }

    // if (!customTags.equals(this.props.customTags)) {
    //   this.set
    // }
  }

  handleSelectTag = name => {
    const { customTags, activeRepo } = this.props
    const tag = customTags.find(tag => tag.name === name) || { id: Date.now(), name, repos: [activeRepo.id] }

    this.props.addRepoTag(activeRepo.id, tag)
  }

  handleChangeTagName = name => {
    console.log(name)
  }

  render () {
    const { props, state, handleSelectTag, handleChangeTagName } = this
    const { activeRepo, customTags } = props
    const { readme } = state

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
          <AutoComplete
            dataSource={
              customTags
                .filter(tag => !tag.repos.includes(activeRepo.id))
                .map(({ name }) => ({ value: name, text: name }))
                .toArray()
            }
            defaultActiveFirstOption={false}
            onChange={handleChangeTagName}
            onSelect={handleSelectTag}
          >
            <Input addonAfter='添加' placeholder='新增标签' />
          </AutoComplete>
        </header>
        <article className='markdown-body' dangerouslySetInnerHTML={{ __html: readme }}></article>
      </div >
    )
  }
}

RepoReadme.propTypes = {
  activeRepo: PropTypes.object,
  customTags: PropTypes.instanceOf(List).isRequired
}

RepoReadme.defaultProps = {
  activeRepo: {}
}

const mapStateToProps = state => ({
  activeRepo: state.activeRepo,
  customTags: state.customTags
})

const mapDispatchToProps = dispatch => ({
  addRepoTag: (repoId, tag) => dispatch(addStarredRepoTag(repoId, tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(RepoReadme)
