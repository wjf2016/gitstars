import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { notification } from 'antd'
import DisplayCSSTransition from './DisplayCSSTransition'
import { updateCustomTags } from '../reducers/custom-tags'
import config from '../config'

const { tagCategorys } = config
let customTagsClone = null

class TagNavHeader extends Component {
  handleAddNewTag = _ => {
    const { tagNameFormVisible, isEditingTags, onToggleTagNameFormVisible } = this.props

    if (isEditingTags || tagNameFormVisible) return

    onToggleTagNameFormVisible()
  }

  handleEditTags = _ => {
    const { tagNameFormVisible, customTags, onEditTags } = this.props

    if (tagNameFormVisible || !customTags.size) return

    customTagsClone = customTags
    onEditTags()
  }

  handleEditTagsComplete = _ => {
    const { customTags, onEditTagsComplete, updateCustomTags } = this.props

    onEditTagsComplete()

    if (customTags.equals(customTagsClone)) return

    customTagsClone = null

    updateCustomTags()
      .then(_ => {
        notification.success({
          message: '更新成功',
          description: '编辑标签完成'
        })
      })
  }

  render () {
    const { props, handleAddNewTag, handleEditTagsComplete, handleEditTags } = this
    const { activeTagCategory, tagNameFormVisible, isEditingTags, customTags } = props

    return (
      <header className='nav-caption'>
        <h3 className='nav-caption__title'>
          <i className='fa fa-fw fa-tags' aria-hidden />
          <span>tags</span>
        </h3>
        <DisplayCSSTransition
          in={activeTagCategory.id === tagCategorys.custom.id}
          timeout={300}
          classNames='slide-to-left'
        >
          <div className='nav-caption__operate'>
            <div
              className={`nav-caption__operate-btn ${isEditingTags || tagNameFormVisible ? 'disabled' : ''}`}
              onClick={handleAddNewTag}
            >
              <i className='fa fa-plus-square' aria-hidden />
              add
            </div>
            <DisplayCSSTransition in={!isEditingTags} timeout={150} classNames='enlarge'>
              <div
                className={`nav-caption__operate-btn ${tagNameFormVisible || !customTags.size ? 'disabled' : ''}`}
                onClick={handleEditTags}
              >
                <i className='fa fa-cog' aria-hidden />
                edit
              </div>
            </DisplayCSSTransition>
            <DisplayCSSTransition in={isEditingTags} timeout={150} classNames='enlarge'>
              <div className='nav-caption__operate-btn' onClick={handleEditTagsComplete}>ok</div>
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
  isEditingTags: PropTypes.bool.isRequired,
  onEditTags: PropTypes.func.isRequired,
  onEditTagsComplete: PropTypes.func.isRequired,
  customTags: PropTypes.instanceOf(List).isRequired,
  updateCustomTags: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  customTags: state.customTags
})

const mapDispatchToProps = dispatch => ({
  updateCustomTags: _ => dispatch(updateCustomTags())
})

export default connect(mapStateToProps, mapDispatchToProps)(TagNavHeader)
