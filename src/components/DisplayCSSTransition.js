import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

class DisplayCSSTransition extends Component {
  constructor (props) {
    super(props)

    this.state = { isWillShow: false, isShow: props.in }

    this.handleEnter = this.handleEnter.bind(this)
    this.handleExited = this.handleExited.bind(this)
  }

  componentWillReceiveProps ({ in: isWillShow }) {
    if (isWillShow !== this.props.in) this.setState({ isWillShow })
  }

  handleEnter () {
    this.setState({ isShow: true })

    const { onEnter } = this.props
    if (onEnter) onEnter()
  }

  handleExited () {
    this.setState({ isShow: false })

    const { onExited } = this.props
    if (onExited) onExited()
  }

  render () {
    const { props, state, handleEnter, handleExited } = this
    const { style: propStyle, children } = props
    const { isWillShow, isShow } = state
    const style = isWillShow || isShow
      ? propStyle
      : Object.assign({}, propStyle, { display: 'none' })

    return (
      <CSSTransition {...props} onEnter={handleEnter} onExited={handleExited} style={style}>
        {children}
      </CSSTransition>
    )
  }
}

DisplayCSSTransition.propTypes = {
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  style: PropTypes.object
}

DisplayCSSTransition.defaultProps = {
  style: {}
}

export default DisplayCSSTransition
