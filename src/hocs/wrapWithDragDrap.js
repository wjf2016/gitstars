import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function wrapWithDragDrap (type, DragSource, DropTarget) {
  const source = {
    beginDrag: props => ({ index: props.index }),
    canDrag: props => props.canDrag
  }

  const sourceCollect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })

  const target = {
    hover (props, monitor) {
      const dragIndex = monitor.getItem().index
      const hoverIndex = props.index

      if (dragIndex === hoverIndex) return

      props.onMove(dragIndex, hoverIndex)

      monitor.getItem().index = hoverIndex
    }
  }

  const targetCollect = connect => ({
    connectDropTarget: connect.dropTarget()
  })

  const drapTarget = DropTarget(type, target, targetCollect)
  const dragSource = DragSource(type, source, sourceCollect)

  return function (WrappedComponent) {
    const DragDrapComponent = dragSource(drapTarget(WrappedComponent))

    class WrapWithDragDrap extends Component {
      render () {
        return this.props.draggable
          ? <DragDrapComponent {...this.props} />
          : <WrappedComponent {...this.props} />
      }
    }

    WrapWithDragDrap.propTypes = {
      draggable: PropTypes.bool
    }

    return WrapWithDragDrap
  }
}
