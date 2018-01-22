import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TagsNav from './TagsNav'

class CustomTagsNav extends Component {
  render () {
    // activeTagCategory.id === config.tagCategorys.custom.id
    return (
      <TagsNav tags={this.props.customTags} className='custom-tags' />
    )
  }
}

CustomTagsNav.propTypes = {
  customTags: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  customTags: state.customTags
})

export default connect(mapStateToProps)(CustomTagsNav)
