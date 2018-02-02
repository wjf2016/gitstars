import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { AutoComplete, Input, notification } from 'antd'
import { List } from 'immutable'
import { updateCustomTags, addCustomTagRepo } from '../reducers/custom-tags'
import { getRepoReadme, getRenderedReadme } from '../api'

let isSelectTag = false

class RepoReadme extends Component {
  state = {
    readme: '',
    tagName: '',
    unstoredTags: List()
  }

  async componentWillReceiveProps (nextProps) {
    const { activeRepo: nextActiveRepo, customTags: nextCustomTags } = nextProps
    const { activeRepo, customTags } = this.props

    if (activeRepo) {
      if (!nextCustomTags.equals(customTags) || nextActiveRepo.id !== activeRepo.id) {
        this.setState({ unstoredTags: nextCustomTags.filter(tag => !tag.repos.includes(nextActiveRepo.id)) })
      }

      if (nextActiveRepo.id !== activeRepo.id) {
        this.setState({ readme: '' })
        const { content } = await getRepoReadme(nextActiveRepo.owner.login, nextActiveRepo.name)

        // 包含中文内容的 base64 解码
        const readme = await getRenderedReadme(decodeURIComponent(escape(atob(content))))
        this.setState({ readme })
      }
    }
  }

  handleSelectTag = name => {
    const { customTags, activeRepo, addRepoTag } = this.props
    const tag = customTags.find(tag => tag.name === name) || { id: Date.now(), name, repos: [activeRepo.id] }

    addRepoTag(activeRepo.id, tag)
      .then(() => {
        notification.success({
          message: `${activeRepo.owner.login} / ${activeRepo.name}`,
          description: `添加标签：${tag.name}`
        })
      })

    isSelectTag = true
  }

  handleChangeTagName = name => {
    const tagName = isSelectTag ? '' : name
    this.setState({ tagName })
    isSelectTag = false
  }

  render () {
    const { props, state, handleSelectTag, handleChangeTagName } = this
    const { activeRepo } = props
    const { readme, unstoredTags, tagName } = state
    // const hasActiveRepo = !!Object.keys(activeRepo).length

    return (
      <div className='content'>
        {
          activeRepo &&
          <section className='repo-readme'>
            <header className='repo-readme__header'>
              <h3 className='repo-title'>
                <a href={activeRepo.html_url} target='_blank' rel='noopener noreferrer'>
                  <i className='fa fa-fw fa-lg fa-github' aria-hidden />
                </a>
                {activeRepo.owner.login} / {activeRepo.name}
              </h3>
              <AutoComplete
                dataSource={
                  unstoredTags
                    .filter(tag => tag.name.toLowerCase().includes(tagName.toLowerCase()))
                    .map(({ name }) => ({ value: name, text: name }))
                    .toArray()
                }
                defaultActiveFirstOption={false}
                onChange={handleChangeTagName}
                onSelect={handleSelectTag}
                value={tagName}
              >
                <Input addonAfter='添加' placeholder='新增标签' />
              </AutoComplete>
            </header>
            <article className='markdown-body' dangerouslySetInnerHTML={{ __html: readme }}></article>
          </section>
        }
        <section className={`waiting vc-p ${readme ? 'dn' : ''}`}>
          <h4 className='readme'>README.md</h4>
          <p className='loader'>
            <i className={`fa fa-cog fa-spin fa-2x fa-fw ${activeRepo ? '' : 'dn'}`}></i>
            <span className={`${activeRepo ? 'dn' : ''}`}>
              <i className='fa fa-hand-o-left fa-lg' aria-hidden />
              <span className='ttc'>点击左侧 Starred 仓库查看</span>
            </span>
          </p>
        </section>
      </div >
    )
  }
}

RepoReadme.propTypes = {
  activeRepo: PropTypes.object,
  customTags: PropTypes.instanceOf(List),
  addRepoTag: PropTypes.func.isRequired
}

RepoReadme.defaultProps = {
  activeRepo: {}
}

const mapStateToProps = state => ({
  activeRepo: state.activeRepo,
  customTags: state.customTags
})

const mapDispatchToProps = dispatch => ({
  addRepoTag: (repoId, tag) => dispatch(updateCustomTags(addCustomTagRepo(repoId, tag)))
})

export default connect(mapStateToProps, mapDispatchToProps)(RepoReadme)
