import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TagsNav extends Component {
  render () {
    const { className, tags, activeTag, onSwitchTag, style } = this.props

    return (
      <ul className={`nav-tag ${className}`} style={style}>
        {
          tags.map(tag => {
            return (
              <li
                className={`nav-item ${tag.id === activeTag.id ? 'active' : ''}`}
                key={tag.id}
                onClick={onSwitchTag.bind(this, tag)}>
                <label className="nav-item__label">
                  <i className={`fa fa-fw ${tag.icon ? tag.icon : 'fa-tag'}`} aria-hidden></i>
                  <span>{tag.name}</span>
                </label>
                <span className='nav-item-badge'>{tag.repos.length}</span>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

TagsNav.propTypes = {
  className: PropTypes.string,
  tags: PropTypes.array.isRequired,
  activeTag: PropTypes.object.isRequired,
  onSwitchTag: PropTypes.func.isRequired,
  style: PropTypes.object
}

TagsNav.defaultProps = {
  className: ''
}

export default TagsNav
