import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import DisplayCSSTransition from './DisplayCSSTransition'
import TagsNav from './TagsNav'
import TagNavHeader from './TagNavHeader'
import NewTagNameForm from './NewTagNameForm'
import TagCategorys from '../components/TagCategorys'
import appNamePng from '../assets/app-name.png'
import config from '../config'

const { tagCategorys } = config

class Sidebar extends Component {
  state = {
    tagNameFormVisible: false,
    isEditingTags: false,
    activeTagCategory: tagCategorys.custom
  }

  handleToggleTagNameFormVisible = _ => {
    this.setState((prevState, props) => ({
      tagNameFormVisible: !prevState.tagNameFormVisible
    }))
  }

  handleEditTags = _ => {
    this.setState({ isEditingTags: true })
  }

  handleEditTagsComplete = _ => {
    this.setState({ isEditingTags: false })
  }

  handleCancelAddTag = _ => {
    this.setState({ tagNameFormVisible: false })
  }

  handleSwitchTagCategory = category => {
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
    const { defaultTags, languageTags, customTags } = props
    const { tagNameFormVisible, isEditingTags, activeTagCategory } = state

    return (
      <section id='sidebar'>
        <header>
          <h1 style={{ display: 'none' }}>Github Stars Manager</h1>
          <a href='https://github.com/Monine/gitstars' target='_blank' rel='noopener noreferrer'>
            <img src={appNamePng} alt='app name' className='app-name-img' />
          </a>
        </header>
        <TagsNav className='default-tags' tags={defaultTags} />
        <div className='tag-nav'>
          <TagNavHeader
            activeTagCategory={activeTagCategory}
            tagNameFormVisible={tagNameFormVisible}
            isEditingTags={isEditingTags}
            onToggleTagNameFormVisible={handleToggleTagNameFormVisible}
            onEditTags={handleEditTags}
            onEditTagsComplete={handleEditTagsComplete}
          />
          <NewTagNameForm visible={tagNameFormVisible} onCancelAddTag={handleCancelAddTag} />
          <DisplayCSSTransition in={isEditingTags} timeout={150} classNames='slide-down'>
            <div className='edit-tag-tip'>tips</div>
          </DisplayCSSTransition>
          <div className='tag-list__group'>
            <DisplayCSSTransition
              in={activeTagCategory.id === tagCategorys.custom.id}
              timeout={300}
              classNames='slide-to-left'
            >
              <TagsNav className='custom-tags' tags={customTags} canDrag={isEditingTags} draggable />
            </DisplayCSSTransition>
            <DisplayCSSTransition
              in={activeTagCategory.id === tagCategorys.language.id}
              timeout={300}
              classNames='slide-to-right'
            >
              <TagsNav className='language-tags' tags={languageTags} />
            </DisplayCSSTransition>
          </div>
        </div>
        <DisplayCSSTransition in={!isEditingTags && !tagNameFormVisible} timeout={300} classNames='slide-down'>
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
  languageTags: PropTypes.instanceOf(List).isRequired,
  customTags: PropTypes.instanceOf(List).isRequired
}

const mapStateToProps = state => ({
  customTags: state.customTags
})

export default connect(mapStateToProps)(Sidebar)
