import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DisplayCSSTransition from '../components/DisplayCSSTransition'
import config from '../config'

const { tagCategorys } = config

class TagNavHeader extends Component {
  constructor (props) {
    super(props)

    this.handleAddNewTag = this.handleAddNewTag.bind(this)
    this.handleEditTags = this.handleEditTags.bind(this)
    this.handleCompleteEditTags = this.handleCompleteEditTags.bind(this)
  }

  handleAddNewTag () {
    const { tagNameFormVisible, isEditTags, onToggleTagNameFormVisible } = this.props
    if (isEditTags || tagNameFormVisible) return

    onToggleTagNameFormVisible()
  }

  handleEditTags () {
    const { tagNameFormVisible, customTags, onEditTags } = this.props
    if (tagNameFormVisible || !customTags.length) return

    onEditTags()

    // customTagsClone = JSON.parse(JSON.stringify(this.customTags))
    // this.$emit('editTags')
  }

  handleCompleteEditTags () {
    const { onEditTagsComplete } = this.props

    onEditTagsComplete()
  }

  render () {
    const { props, handleAddNewTag, handleCompleteEditTags, handleEditTags } = this
    const { activeTagCategory, tagNameFormVisible, isEditTags, customTags } = props

    return (
      <header className='nav-caption'>
        <h3 className='nav-caption__title'>
          <i className='fa fa-fw fa-tags' aria-hidden></i>
          <span>tags</span>
        </h3>
        <DisplayCSSTransition
          in={activeTagCategory.id === tagCategorys.custom.id}
          timeout={300}
          classNames='slide-to-left'
        >
          <div className='nav-caption__operate'>
            <div
              className={`nav-caption__operate-btn ${isEditTags || tagNameFormVisible ? 'disabled' : ''}`}
              onClick={handleAddNewTag}
            >
              <i className='fa fa-plus-square' aria-hidden></i>
              add
            </div>
            <DisplayCSSTransition in={!isEditTags} timeout={150} classNames='enlarge'>
              <div
                className={`nav-caption__operate-btn ${tagNameFormVisible || !customTags.length ? 'disabled' : ''}`}
                onClick={handleEditTags}
              >
                <i className='fa fa-cog' aria-hidden></i>
                edit
              </div>
            </DisplayCSSTransition>
            <DisplayCSSTransition in={isEditTags} timeout={150} classNames='enlarge'>
              <div className='nav-caption__operate-btn' onClick={handleCompleteEditTags}>ok</div>
            </DisplayCSSTransition>
          </div>
        </DisplayCSSTransition>
      </header>
    )
  }
}

TagNavHeader.propTypes = {
  activeTagCategory: PropTypes.object.isRequired,
  tagNameFormVisible: PropTypes.bool.isRequired,
  onToggleTagNameFormVisible: PropTypes.func.isRequired,
  isEditTags: PropTypes.bool.isRequired,
  onEditTags: PropTypes.func.isRequired,
  onEditTagsComplete: PropTypes.func.isRequired,
  customTags: PropTypes.array.isRequired
}

export default TagNavHeader
