import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DragSource, DropTarget } from 'react-dnd'
import { Popover } from 'antd'
import PopoverFooter from '../components/PopoverFooter'
import { moveCustomTag, deleteCustomTag } from '../reducers/custom-tags'
import wrapWithDragDrap from '../hocs/wrapWithDragDrap'

class TagNav extends Component {
  state = {
    popoverVisible: false
  }

  handleSwitch = _ => {
    const { canDrag, tag, onClick } = this.props
    if (canDrag) return
    onClick(tag)
  }

  handleChangeName = _ => {
    if (!this.props.canDrag) return
    console.log(111)
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
    this.props.deleteCustomTag(this.props.index)
  }

  render () {
    const {
      props,
      state,
      handleSwitch,
      handleChangeName,
      handleDelete,
      handleCancelDelete,
      handleConfirmDelete
    } = this
    const {
      tag,
      isActive,
      canDrag,
      draggable,
      connectDragSource,
      connectDropTarget,
      isDragging
    } = props

    const tagNavNode = (_ => (
      <li
        className={`nav-item ${isActive ? 'active' : ''} ${isDragging ? 'dragging' : ''}`}
        onClick={handleSwitch}>
        <label className='nav-item__label' onDoubleClick={handleChangeName}>
          <i className={`fa fa-fw ${tag.icon ? tag.icon : 'fa-tag'}`} aria-hidden />
          {tag.name}
        </label>
        <span className={`nav-item-badge ${canDrag ? 'dn' : ''}`}>{tag.repos.size}</span>
        {
          draggable &&
          <Popover
            placement='right'
            title='确定删除？'
            trigger='click'
            visible={state.popoverVisible}
            content={<PopoverFooter onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />}
          >
            <i className={`fa fa-times-circle ${canDrag ? '' : 'dn'}`} onClick={handleDelete} aria-hidden />
          </Popover>
        }
      </li >
    ))()

    return draggable ? connectDragSource(connectDropTarget(tagNavNode)) : tagNavNode
  }
}

TagNav.propTypes = {
  index: PropTypes.number.isRequired,
  tag: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  canDrag: PropTypes.bool,
  draggable: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isDragging: PropTypes.bool,
  deleteCustomTag: PropTypes.func.isRequired
}

TagNav.defaultProps = {
  canDrag: false,
  draggable: false,
  isDragging: false
}

const mapDispatchToProps = dispatch => ({
  onMove: (fromIndex, toIndex) => dispatch(moveCustomTag(fromIndex, toIndex)),
  deleteCustomTag: index => dispatch(deleteCustomTag(index))
})

export default connect(
  null,
  mapDispatchToProps
)(wrapWithDragDrap(
  'tagNav',
  DragSource,
  DropTarget
)(TagNav))
