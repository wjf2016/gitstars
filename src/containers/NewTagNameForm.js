import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DisplayCSSTransition from '../components/DisplayCSSTransition'

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
  onCancelAddTag: PropTypes.func.isRequired
}

export default TagNameForm
