import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

class PopoverFooter extends Component {
  render () {
    const { confirmText, cancelText, onCancel, onConfirm } = this.props
    return (
      <footer className='popover-footer'>
        <Button size='small' onClick={onCancel}>{cancelText}</Button>
        <Button type="primary" size='small' onClick={onConfirm}>{confirmText}</Button>
      </footer>
    )
  }
}

PopoverFooter.propTypes = {
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
}

PopoverFooter.defaultProps = {
  confirmText: 'Yes',
  cancelText: 'No'
}

export default PopoverFooter
