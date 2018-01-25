import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import TagNav from '../components/TagNav'

class TabNavContainer extends Component {
  render () {
    return (
      <TagNav {...this.props} />
    )
  }
}

TabNavContainer.propTypes = {
  tag: PropTypes.object.isRequired,
  activeTag: PropTypes.object.isRequired,
  onSwitchTag: PropTypes.func.isRequired
}

const tagNavSource = {
  beginDrag (props) {
    return {}
  }
}

const tagNavCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource('tagNav', tagNavSource, tagNavCollect)(TabNavContainer)
