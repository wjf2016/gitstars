import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { notification } from 'antd'
import DisplayCSSTransition from './DisplayCSSTransition'
import { addCustomTag, updateCustomTags } from '../reducers/custom-tags'

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
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevProps.visible && this.props.visible) {
      this.tagNameInput.focus()
    }
  }

  handleChangeTagName = e => {
    const { value } = e.target

    this.setState({
      tagName: value,
      tagNameBtnState: value.trim().length ? SAVE : CANCEL
    })
  }

  handleFocusTagName = _ => {
    this.setState({ tagNameInputState: FOCUS })
  }

  handleBlurTagName = _ => {
    this.setState({ tagNameInputState: BLUR })
  }

  handleAddTag = _ => {
    const tagName = this.state.tagName.trim()
    let description = ''

    if (!tagName) {
      description = '不能为空'
    }

    if (this.props.customTags.find(tag => tag.name === tagName)) {
      description = '已存在'
    }

    if (description) {
      notification.warning({
        description,
        message: '添加标签失败'
      })

      return this.tagNameInput.focus()
    }

    this.props.onAddTag({ id: Date.now(), name: tagName, repos: [] })
      .then(_ => {
        notification.success({
          message: '更新成功',
          description: `添加标签：${tagName}`
        })
      })

    this.handleCancelAddTag()
  }

  handleKeyUpTagName = e => {
    const { keyCode } = e

    if (keyCode === 13) { // enter
      this.handleAddTag()
    } else if (keyCode === 27) { // esc
      this.handleCancelAddTag()
    }
  }

  handleCancelAddTag = _ => {
    this.setState({ tagName: '', tagNameBtnState: CANCEL })
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
  customTags: PropTypes.instanceOf(List).isRequired,
  onAddTag: PropTypes.func.isRequired,
  onCancelAddTag: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  customTags: state.customTags
})

const mapDispatchToProps = dispatch => ({
  onAddTag: tag => dispatch(updateCustomTags(addCustomTag(tag)))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagNameForm)
