import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TagsNavContainer from './TagsNavContainer'
import TagNavHeader from './TagNavHeader'
import NewTagNameForm from './NewTagNameForm'
import appNamePng from './assets/app-name.png'
import './sidebar.css'
import config from './config'

// let customTagsClone = []

class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      defaultTags: Object.values(config.defaultTags),
      tagNameFormVisible: false,
      isEditTags: false
    }

    this.handleToggleTagNameFormVisible = this.handleToggleTagNameFormVisible.bind(this)
    this.handleEditTags = this.handleEditTags.bind(this)
    this.handleCancelAddTag = this.handleCancelAddTag.bind(this)
  }

  handleToggleTagNameFormVisible () {
    this.setState((prevState, props) => ({
      tagNameFormVisible: !prevState.tagNameFormVisible
    }))
  }

  handleEditTags () {
    this.setState({ isEditTags: true })
    // customTagsClone = JSON.parse(JSON.stringify(this.props.customTags))
  }

  handleCancelAddTag () {
    this.setState({ tagNameFormVisible: false })
  }

  render () {
    const {
      props,
      state,
      handleToggleTagNameFormVisible,
      handleEditTags,
      handleCancelAddTag
    } = this
    const { defaultTags, tagNameFormVisible, isEditTags } = state

    return (
      <section id='sidebar'>
        <header>
          <h1 style={{ display: 'none' }}>Github Stars Manager</h1>
          <a href="https://github.com/Monine/gitstars" target='_blank' rel="noopener noreferrer">
            <img src={appNamePng} alt='app name' className='app-name-img' />
          </a>
        </header>
        <TagsNavContainer className='default-tags' tags={defaultTags} />
        <div className="tag-nav">
          <TagNavHeader
            tagNameFormVisible={tagNameFormVisible}
            onToggleTagNameFormVisible={handleToggleTagNameFormVisible}
            isEditTags={isEditTags}
            onEditTags={handleEditTags}
            customTags={props.customTags} />
          <NewTagNameForm
            visible={tagNameFormVisible}
            onCancelAddTag={handleCancelAddTag} />
        </div>
      </section>
    )
  }
}

Sidebar.propTypes = {
  customTags: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  customTags: state.customTags
})

export default connect(mapStateToProps)(Sidebar)
