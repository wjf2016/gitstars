import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import DisplayCSSTransition from '../components/DisplayCSSTransition'
import TagsNav from './TagsNav'
import TagNavHeader from './TagNavHeader'
import NewTagNameForm from './NewTagNameForm'
import TagCategorys from './TagCategorys'
import appNamePng from '../assets/app-name.png'
import config from '../config'
import '../sidebar.css'

const { tagCategorys } = config
// let customTagsClone = []

class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tagNameFormVisible: false,
      isEditTags: false,
      activeTagCategory: tagCategorys.custom
    }

    this.handleToggleTagNameFormVisible = this.handleToggleTagNameFormVisible.bind(this)
    this.handleEditTags = this.handleEditTags.bind(this)
    this.handleEditTagsComplete = this.handleEditTagsComplete.bind(this)
    this.handleCancelAddTag = this.handleCancelAddTag.bind(this)
    this.handleSwitchTagCategory = this.handleSwitchTagCategory.bind(this)
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

  handleEditTagsComplete () {
    this.setState({ isEditTags: false })
  }

  handleCancelAddTag () {
    this.setState({ tagNameFormVisible: false })
  }

  handleSwitchTagCategory (category) {
    this.setState({ activeTagCategory: category })
  }

  render () {
    const {
      props,
      state,
      handleToggleTagNameFormVisible,
      handleEditTags,
      handleEditTagsComplete,
      handleCancelAddTag,
      handleSwitchTagCategory
    } = this
    const { languageTags, customTags } = props
    const { tagNameFormVisible, isEditTags, activeTagCategory } = state

    return (
      <section id='sidebar'>
        <header>
          <h1 style={{ display: 'none' }}>Github Stars Manager</h1>
          <a href='https://github.com/Monine/gitstars' target='_blank' rel='noopener noreferrer'>
            <img src={appNamePng} alt='app name' className='app-name-img' />
          </a>
        </header>
        <TagsNav className='default-tags' tags={Object.values(config.defaultTags)} />
        <div className='tag-nav'>
          <TagNavHeader
            activeTagCategory={activeTagCategory}
            tagNameFormVisible={tagNameFormVisible}
            onToggleTagNameFormVisible={handleToggleTagNameFormVisible}
            isEditTags={isEditTags}
            onEditTags={handleEditTags}
            onEditTagsComplete={handleEditTagsComplete}
            customTags={customTags}
          />
          <NewTagNameForm
            visible={tagNameFormVisible}
            customTags={customTags}
            onCancelAddTag={handleCancelAddTag}
          />
          <DisplayCSSTransition in={isEditTags} timeout={150} classNames='slide-down'>
            <div className='edit-tag-tip'>tips</div>
          </DisplayCSSTransition>
          <div className='tag-list__group'>
            <DisplayCSSTransition
              in={activeTagCategory.id === tagCategorys.custom.id}
              timeout={300}
              classNames='slide-to-left'
            >
              <div>
                <Draggable disabled={!isEditTags}>
                  <TagsNav className='custom-tags' tags={customTags} />
                </Draggable>
              </div>
            </DisplayCSSTransition>
            <DisplayCSSTransition
              in={activeTagCategory.id === tagCategorys.language.id}
              timeout={300}
              classNames='slide-to-right'
            >
              <TagsNav className='language-tags' tags={languageTags}></TagsNav>
            </DisplayCSSTransition>
          </div>
        </div>
        <DisplayCSSTransition in={!isEditTags && !tagNameFormVisible} timeout={300} classNames='slide-down'>
          <TagCategorys
            categorys={Object.values(tagCategorys)}
            activeCategory={activeTagCategory}
            onSwitchCategory={handleSwitchTagCategory}
          />
        </DisplayCSSTransition>
        <footer className='sidebar-footer'>
          <span>Author&nbsp;:&nbsp;</span>
          <h1 className='author'>
            <a href='https://github.com/Monine' target='_blank' rel='noopener noreferrer' className='author-name'>Monine</a>
          </h1>
        </footer>
      </section >
    )
  }
}

Sidebar.propTypes = {
  languageTags: PropTypes.array.isRequired,
  customTags: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  customTags: state.customTags
})

export default connect(mapStateToProps)(Sidebar)
