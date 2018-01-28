import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default (DragDropContext, HTML5Backend) => WrappedComponent => {
  const DragDropContextComponent = DragDropContext(HTML5Backend)(WrappedComponent)

  class DndDragDrapContextWrap extends Component {
    render () {
      return this.props.draggable
        ? <DragDropContextComponent {...this.props} />
        : <WrappedComponent {...this.props} />
    }
  }

  DndDragDrapContextWrap.propTypes = {
    draggable: PropTypes.bool
  }

  DndDragDrapContextWrap.defaultProps = {
    draggable: false
  }

  return DndDragDrapContextWrap
}
