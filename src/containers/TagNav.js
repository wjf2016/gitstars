import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'
import { Popover, notification } from 'antd'
import PopoverFooter from '../components/PopoverFooter'
import { moveCustomTag, deleteCustomTag, modifyCustomTagName } from '../reducers/custom-tags'
import dndDragDrap from '../hocs/dndDragDrap'
import validateCustomTagName from '../hocs/validateCustomTagName'

class TagNav extends Component {
  state = {
    inputVisible: false,
    newName: '',
    popoverVisible: false
  }

  handleSwitch = () => {
    const { isActive, isEditingTags, canDrag, tag, onClick } = this.props

    if (isEditingTags && !canDrag) {
      return notification.warning({
        message: '切换标签失败',
        description: '编辑状态下无法切换标签'
      })
    }

    if (isActive || canDrag) return

    onClick(tag)
  }

  handleToggleInputVisible = e => {
    const { canDrag, tag } = this.props

    if (!canDrag) return

    this.setState({
      inputVisible: true,
      newName: tag.name
    }, () => this.tagNameInput.focus())
  }

  handleChangeName = e => {
    this.setState({ newName: e.target.value })
  }

  handleChangeNameComplete = () => {
    const { props, state } = this
    const { tag, validateCustomTagName, modifyName } = props
    const { inputVisible, newName } = state

    if (!inputVisible && !newName) return

    const name = newName.trim()

    if (tag.name === name) return this.setState({ inputVisible: false, newName: '' })

    validateCustomTagName(name)
      .then(name => {
        modifyName(this.props.index, name)
        this.setState({ inputVisible: false, newName: '' })
      })
      .catch(err => {
        notification.warning({
          message: '修改标签名称失败',
          description: err.message
        })
        this.tagNameInput.focus()
      })
  }

  handleChangeNameByKeyUp = e => {
    const { keyCode } = e
    if (keyCode === 13) { // enter
      this.handleChangeNameComplete()
    } else if (keyCode === 27) { // esc
      this.setState({ inputVisible: false, newName: '' })
    }
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
    this.props.deleteTag(this.props.index)
  }

  render () {
    const {
      props,
      state,
      handleSwitch,
      handleToggleInputVisible,
      handleChangeName,
      handleChangeNameComplete,
      handleChangeNameByKeyUp,
      handleDelete,
      handleCancelDelete,
      handleConfirmDelete
    } = this
    const {
      tag,
      isActive,
      isEditingTags,
      canDrag,
      draggable,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = props
    const { inputVisible, newName, popoverVisible } = state

    const tagNavNode = (() => (
      <li
        className={`nav-item ${isActive && !isEditingTags ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
        onClick={handleSwitch}>
        <label className='nav-item__label' onDoubleClick={handleToggleInputVisible}>
          <i className={`fa fa-fw ${tag.icon ? tag.icon : 'fa-tag'}`} aria-hidden />
          {
            draggable &&
            <input
              type='text'
              className={`nav-item__input--name ${inputVisible ? '' : 'dn'}`}
              ref={input => (this.tagNameInput = input)}
              value={newName}
              onClick={e => e.stopPropagation()}
              onChange={handleChangeName}
              onBlur={handleChangeNameComplete}
              onKeyUp={handleChangeNameByKeyUp}
            />
          }
          <span className={`${inputVisible ? 'dn' : ''}`}>{tag.name}</span>
        </label>
        <span className={`nav-item-badge ${isEditingTags && canDrag ? 'dn' : ''}`}>{tag.repos.size}</span>
        {
          draggable &&
          <Popover
            placement='right'
            title='确定删除？'
            trigger='click'
            visible={popoverVisible}
            content={<PopoverFooter onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />}
          >
            <i className={`fa fa-times-circle ${isEditingTags && canDrag ? '' : 'dn'}`} onClick={handleDelete} aria-hidden />
          </Popover>
        }
      </li>
    ))()

    return draggable ? connectDragSource(connectDropTarget(tagNavNode)) : tagNavNode
  }
}

TagNav.propTypes = {
  index: PropTypes.number.isRequired,
  tag: PropTypes.object.isRequired,
  isEditingTags: PropTypes.bool,
  isActive: PropTypes.bool,
  canDrag: PropTypes.bool,
  draggable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isDragging: PropTypes.bool,
  validateCustomTagName: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  modifyName: PropTypes.func.isRequired
}

TagNav.defaultProps = {
  isEditingTags: false,
  canDrag: false,
  draggable: false,
  isDragging: false
}

const mapDispatchToProps = dispatch => ({
  // 提供给 HOC dndDragDrap
  // 当拖动标签导致顺序变化时调用
  move: (fromIndex, toIndex) => dispatch(moveCustomTag(fromIndex, toIndex)),
  deleteTag: index => dispatch(deleteCustomTag(index)),
  modifyName: (index, name) => dispatch(modifyCustomTagName(index, name))
})

export default connect(
  null,
  mapDispatchToProps
)(dndDragDrap(
  'tagNav',
  DragSource,
  DropTarget
)(validateCustomTagName(TagNav)))
