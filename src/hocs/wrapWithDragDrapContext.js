import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function wrapWithDragDrapContext (DragDropContext, HTML5Backend) {
  return function (WrappedComponent) {
    const DragDropContextComponent = DragDropContext(HTML5Backend)(WrappedComponent)

    class WrapWithDragDrapContext extends Component {
      render () {
        return this.props.draggable
          ? <DragDropContextComponent {...this.props} />
          : <WrappedComponent {...this.props} />
      }
    }

    WrapWithDragDrapContext.propTypes = {
      draggable: PropTypes.bool
    }

    WrapWithDragDrapContext.defaultProps = {
      draggable: false
    }

    return WrapWithDragDrapContext
  }
}
