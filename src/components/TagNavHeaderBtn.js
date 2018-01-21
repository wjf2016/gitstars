import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TagNavHeaderBtn extends Component {
  render () {
    const { className, onClick, iconClassName, name, style } = this.props

    return (
      <div className={`nav-caption__operate-btn ${className}`} style={style} onClick={onClick}>
        {iconClassName && <i className={iconClassName} aria-hidden></i>}
        {name}
      </div>
    )
  }
}

TagNavHeaderBtn.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  iconClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.object
}

TagNavHeaderBtn.defaultProps = {
  className: '',
  style: {}
}

export default TagNavHeaderBtn
