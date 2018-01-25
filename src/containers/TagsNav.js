import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TagNav from '../components/TagNav'
import { switchTag } from '../reducers/active-tag'

class TagsNav extends Component {
  render () {
    const { className, style, tags, activeTag, onSwitchTag } = this.props

    return (
      <ul className={`nav-tag ${className}`} style={style}>
        {
          tags.map(tag => (
            <TagNav key={tag.id} tag={tag} isActive={tag.id === activeTag.id} onClick={onSwitchTag} />
          ))
        }
      </ul>
    )
  }
}

TagsNav.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  tags: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.instanceOf(List)
  ]).isRequired,
  activeTag: PropTypes.object.isRequired,
  onSwitchTag: PropTypes.func.isRequired
}

TagsNav.defaultProps = {
  className: '',
  style: {}
}

const mapStateToProps = state => ({
  activeTag: state.activeTag
})

const mapDispatchToProps = dispatch => ({
  onSwitchTag: tag => dispatch(switchTag(tag))
})

export default DragDropContext(
  HTML5Backend
)(connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsNav))
