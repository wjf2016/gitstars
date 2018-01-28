import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default (type, DragSource, DropTarget) => {
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

      // 由被包裹组件提供
      props.move(dragIndex, hoverIndex)

      monitor.getItem().index = hoverIndex
    }
  }

  const targetCollect = connect => ({
    connectDropTarget: connect.dropTarget()
  })

  const dragSource = DragSource(type, source, sourceCollect)
  const drapTarget = DropTarget(type, target, targetCollect)

  return WrappedComponent => {
    const DragDrapComponent = dragSource(drapTarget(WrappedComponent))

    class DndDragDrapWrap extends Component {
      render () {
        return this.props.draggable
          ? <DragDrapComponent {...this.props} />
          : <WrappedComponent {...this.props} />
      }
    }

    DndDragDrapWrap.propTypes = {
      draggable: PropTypes.bool
    }

    return DndDragDrapWrap
  }
}
