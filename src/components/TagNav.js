import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class TagNav extends Component {
  render () {
    const { tag, isActive, onClick } = this.props

    return (
      <li
        className={`nav-item ${isActive ? 'active' : ''}`}
        key={tag.id}
        onClick={_ => onClick(tag)}>
        <label className="nav-item__label">
          <i className={`fa fa-fw ${tag.icon ? tag.icon : 'fa-tag'}`} aria-hidden></i>
          {tag.name}
        </label>
        <span className='nav-item-badge'>{tag.repos.length}</span>
      </li>
    )
  }
}

TagNav.propTypes = {
  tag: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default TagNav
