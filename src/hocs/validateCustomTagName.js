import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'

export default WrappedComponent => {
  class ValidateCustomTagNameWrap extends Component {
    handleValidate = async name => {
      if (!name) throw new Error('不能为空')
      if (this.props.customTags.find(tag => tag.name === name)) throw new Error('已存在')
      return name
    }

    render () {
      return <WrappedComponent {...this.props} validateCustomTagName={this.handleValidate} />
    }
  }

  ValidateCustomTagNameWrap.propTypes = {
    customTags: PropTypes.instanceOf(List)
  }

  const mapStateToProps = state => ({ customTags: state.customTags })

  return connect(mapStateToProps)(ValidateCustomTagNameWrap)
}
