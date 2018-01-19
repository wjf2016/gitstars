import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class TagsNav extends Component {
  render () {
    const { className, tags, activeTag, onSwitchTag } = this.props

    return (
      <ul className={classNames({ 'nav-tag': true, [className]: !!className })}>
        {
          tags.map(tag => {
            return (
              <li
                className={classNames({ 'nav-item': true, active: tag.id === activeTag.id })}
                key={tag.id}
                onClick={onSwitchTag.bind(this, tag)}>
                <label className="nav-item__label">
                  <i className={classNames({ fa: true, 'fa-fw': true, [tag.icon]: true })} aria-hidden></i>
                  <span>{tag.name}</span>
                </label>
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
  onSwitchTag: PropTypes.func.isRequired
}
