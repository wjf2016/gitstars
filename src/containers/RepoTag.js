import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tag, Popover, Icon, notification } from 'antd'
import PopoverFooter from '../components/PopoverFooter'
import { switchTag } from '../reducers/active-tag'
import { updateCustomTags, deleteCustomTagRepo } from '../reducers/custom-tags'
import { deleteRepoCustomTag } from '../reducers/active-repos'

class RepoTag extends Component {
  state = {
    popoverVisible: false
  }

  handleClick = _ => {
    const { tag, switchTag } = this.props
    switchTag(tag)
  }

  handleDelete = e => {
    e.stopPropagation()
    this.setState({ popoverVisible: true })
  }

  handleCancelDelete = e => {
    e.stopPropagation()
    this.setState({ popoverVisible: false })
  }

  handleConfirmDelete = e => {
    e.stopPropagation()

    const { repo, repoIndex, tag, tagIndex, deleteRepoCustomTag, deleteCustomTagRepo } = this.props

    deleteRepoCustomTag(repoIndex, tagIndex)

    deleteCustomTagRepo(tag.id, repo.id)
      .then(_ => {
        notification.success({
          message: `${repo.owner.login} / ${repo.name}`,
          description: `删除标签：${tag.name}`
        })
      })
      .catch(_ => {
        // TODO
      })

    this.setState({ popoverVisible: false })
  }

  render () {
    const { props, state, handleClick, handleCancelDelete, handleConfirmDelete, handleDelete } = this

    return (
      <Tag
        className='tag-item'
        color='blue'
        onClick={handleClick}
      >
        {props.tag.name}
        <Popover
          placement='right'
          title='确定删除？'
          trigger='click'
          visible={state.popoverVisible}
          content={<PopoverFooter onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />}
        >
          <Icon type='close' onClick={handleDelete} />
        </Popover>
      </Tag>
    )
  }
}

RepoTag.propTypes = {
  repo: PropTypes.object.isRequired,
  repoIndex: PropTypes.number.isRequired,
  tag: PropTypes.object.isRequired,
  tagIndex: PropTypes.number.isRequired,
  switchTag: PropTypes.func.isRequired,
  deleteRepoCustomTag: PropTypes.func.isRequired,
  deleteCustomTagRepo: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  switchTag: tag => dispatch(switchTag(tag)),
  deleteRepoCustomTag: (repoIndex, tagIndex) => dispatch(deleteRepoCustomTag(repoIndex, tagIndex)),
  deleteCustomTagRepo: (tagId, repoId) => dispatch(updateCustomTags(deleteCustomTagRepo(tagId, repoId)))
})

export default connect(null, mapDispatchToProps)(RepoTag)
