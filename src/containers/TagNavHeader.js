import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DisplayCSSTransition from '../components/DisplayCSSTransition'
import TagNavHeaderBtn from '../components/TagNavHeaderBtn'
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
            <TagNavHeaderBtn
              className={isEditTags || tagNameFormVisible ? 'disabled' : undefined}
              onClick={handleAddNewTag}
              iconClassName=''
              name='add'
            />
            <DisplayCSSTransition in={!isEditTags} timeout={150} classNames='enlarge'>
              <TagNavHeaderBtn
                className={tagNameFormVisible || !customTags.length ? 'disabled' : undefined}
                onClick={handleEditTags}
                iconClassName='fa fa-cog'
                name='edit'
              />
            </DisplayCSSTransition>
            <DisplayCSSTransition in={isEditTags} timeout={150} classNames='enlarge'>
              <TagNavHeaderBtn
                className='nav-caption__ok-btn'
                onClick={handleCompleteEditTags}
                name='ok'
              />
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
