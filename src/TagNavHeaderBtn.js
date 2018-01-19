import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class TagNavHeaderBtn extends Component {
  render () {
    const { className, onClick, iconClassName, name } = this.props

    return (
      <div
        className={
          classNames({
            'nav-caption__operate-btn': true,
            [className]: !!className
          })
        }
        onClick={onClick}>
        <span>
          {
            !!iconClassName &&
            <i className={iconClassName} aria-hidden></i>
          }
          <span>{name}</span>
        </span>
      </div>
    )
  }
}

TagNavHeaderBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default TagNavHeaderBtn
