import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notification } from 'antd'
import DisplayCSSTransition from '../components/DisplayCSSTransition'
import { addCustomTag } from '../reducers/custom-tags'

const SAVE = 'save'
const CANCEL = 'cancel'
const FOCUS = 'focus'
const BLUR = 'blur'

class TagNameForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tagName: '',
      tagNameInputState: FOCUS,
      tagNameBtnState: CANCEL
    }

    this.handleChangeTagName = this.handleChangeTagName.bind(this)
    this.handleFocusTagName = this.handleFocusTagName.bind(this)
    this.handleBlurTagName = this.handleBlurTagName.bind(this)
    this.handleAddTag = this.handleAddTag.bind(this)
    this.handleCancelAddTag = this.handleCancelAddTag.bind(this)
    this.handleKeyUpTagName = this.handleKeyUpTagName.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevProps.visible && this.props.visible) {
      this.tagNameInput.focus()
    }
  }

  handleChangeTagName (e) {
    const { value } = e.target

    this.setState({
      tagName: value,
      tagNameBtnState: value.trim().length ? SAVE : CANCEL
    })
  }

  handleFocusTagName () {
    this.setState({ tagNameInputState: FOCUS })
  }

  handleBlurTagName () {
    this.setState({ tagNameInputState: BLUR })
  }

  handleAddTag () {
    const tagName = this.state.tagName.trim()
    let description = ''

    if (!tagName) description = '不能为空'

    if (this.props.customTags.find(tag => tag.name === tagName)) {
      description = '已存在'
    }

    if (description) {
      notification.warning({
        description,
        message: 'aaa'
      })

      return this.tagNameInput.focus()
    }

    this.props.onAddTag(tagName)
    this.handleCancelAddTag()

    // this.customTags.push({ name, id: Date.now(), repos: [] })
    // saveGitstarsTags.call(this, {
    //   message: `${this.$t('addTag')}: ${name}`
    // }).catch(() => this.customTags.pop())
  }

  handleKeyUpTagName (e) {
    const { keyCode } = e

    if (keyCode === 13) { // enter
      this.handleAddTag()
    } else if (keyCode === 27) { // esc
      this.handleCancelAddTag()
    }
  }

  handleCancelAddTag () {
    this.setState({
      tagName: '',
      tagNameBtnState: CANCEL
    })

    this.props.onCancelAddTag()
  }

  render () {
    const {
      state,
      props,
      handleChangeTagName,
      handleFocusTagName,
      handleBlurTagName,
      handleAddTag,
      handleCancelAddTag,
      handleKeyUpTagName
    } = this
    const { tagName, tagNameInputState, tagNameBtnState } = state

    return (
      <DisplayCSSTransition in={props.visible} timeout={150} classNames='slide-down'>
        <form className='tag-form' onSubmit={e => e.preventDefault()} >
          <input
            type='text'
            value={tagName}
            className={`tag-form__input--name ${tagNameInputState}`}
            ref={input => (this.tagNameInput = input)}
            placeholder='tag name'
            onChange={handleChangeTagName}
            onFocus={handleFocusTagName}
            onBlur={handleBlurTagName}
            onKeyUp={handleKeyUpTagName}
          />
          <div className={`tag-form__operate ${tagNameBtnState}`}>
            <button type='button' className={`tag-form__operate-btn ${SAVE}`} onClick={handleAddTag}>{SAVE}</button>
            <button type='button' className={`tag-form__operate-btn ${CANCEL}`} onClick={handleCancelAddTag}>{CANCEL}</button>
          </div>
        </form>
      </DisplayCSSTransition>
    )
  }
}

TagNameForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  customTags: PropTypes.array.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onCancelAddTag: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  customTags: state.customTags
})

const mapDispatchToProps = dispatch => ({
  onAddTag: tagName => dispatch(addCustomTag(tagName))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagNameForm)
