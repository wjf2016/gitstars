import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TagNavHeaderBtn from './TagNavHeaderBtn'
import config from './config'

class TagNavHeader extends Component {
  constructor (props) {
    super(props)

    this.handleAddNewTag = this.handleAddNewTag.bind(this)
    this.handleCompleteEditTags = this.handleCompleteEditTags.bind(this)
    this.handleEditTags = this.handleEditTags.bind(this)
  }

  handleAddNewTag () {
    const { tagNameFormVisible, isEditTags, onToggleTagNameFormVisible } = this.props
    if (isEditTags || tagNameFormVisible) return

    onToggleTagNameFormVisible()

    // this.$nextTick(() => this.$refs.tagFormNameInput.focus())
  }

  handleCompleteEditTags () {

  }

  handleEditTags () {
    const { tagNameFormVisible, customTags, onEditTags } = this.props
    if (tagNameFormVisible || !customTags.length) return

    onEditTags()

    // customTagsClone = JSON.parse(JSON.stringify(this.customTags))
    // this.$emit('editTags')
  }

  render () {
    const {
      props,
      handleAddNewTag,
      handleCompleteEditTags,
      handleEditTags
    } = this
    const {
      activeTagCategory,
      tagNameFormVisible,
      isEditTags,
      customTags
    } = props

    return (
      <header className="nav-caption">
        <h3 className="nav-caption__title">
          <i className="fa fa-fw fa-tags" aria-hidden></i>
          <span>tags</span>
        </h3>
        {
          activeTagCategory.id === config.tagCategorys.custom.id &&
          <div className="nav-caption__operate">
            <TagNavHeaderBtn
              className={isEditTags || tagNameFormVisible ? 'disabled' : null}
              onClick={handleAddNewTag}
              iconClassName='fa fa-plus-square'
              name='add' />
            {
              isEditTags
                ? <TagNavHeaderBtn
                  className='nav-caption__ok-btn'
                  onClick={handleCompleteEditTags}
                  name='ok' />
                : <TagNavHeaderBtn
                  className={tagNameFormVisible || !customTags.length ? 'disabled' : null}
                  onClick={handleEditTags}
                  iconClassName='fa fa-cog'
                  name='edit' />
            }
          </div>
        }
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
  customTags: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  activeTagCategory: state.activeTagCategory
})

export default connect(mapStateToProps)(TagNavHeader)
