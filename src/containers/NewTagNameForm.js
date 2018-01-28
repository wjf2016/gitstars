import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import { notification } from 'antd'
import DisplayCSSTransition from './DisplayCSSTransition'
import { addCustomTag, updateCustomTags } from '../reducers/custom-tags'
import validateCustomTagName from '../hocs/validateCustomTagName'

const SAVE = 'save'
const CANCEL = 'cancel'
const FOCUS = 'focus'
const BLUR = 'blur'

class TagNameForm extends Component {
  state = {
    name: '',
    inputState: FOCUS,
    btnState: CANCEL
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevProps.visible && this.props.visible) {
      this.input.focus()
    }
  }

  handleChange = e => {
    const { value } = e.target

    this.setState({
      name: value,
      btnState: value.trim().length ? SAVE : CANCEL
    })
  }

  handleFocus = _ => {
    this.setState({ inputState: FOCUS })
  }

  handleBlur = _ => {
    this.setState({ inputState: BLUR })
  }

  handleAdd = async _ => {
    const name = await this.props.validateCustomTagName(this.state.name.trim())
      .catch(err => {
        notification.warning({
          message: '添加标签失败',
          description: err.message
        })
        this.input.focus()
      })

    if (!name) return

    this.props.onAdd({ id: Date.now(), name, repos: List() })
      .then(_ => {
        notification.success({
          message: '更新成功',
          description: `添加标签：${name}`
        })
      })

    this.handleCancelAdd()
  }

  handleKeyUp = e => {
    const { keyCode } = e

    if (keyCode === 13) { // enter
      this.handleAdd()
    } else if (keyCode === 27) { // esc
      this.handleCancelAdd()
    }
  }

  handleCancelAdd = _ => {
    this.setState({ name: '', btnState: CANCEL })
    this.props.onCancelAddTag()
  }

  render () {
    const {
      state,
      props,
      handleChange,
      handleFocus,
      handleBlur,
      handleAdd,
      handleCancelAdd,
      handleKeyUp
    } = this
    const { name, inputState, btnState } = state

    return (
      <DisplayCSSTransition in={props.visible} timeout={150} classNames='slide-down'>
        <form className='tag-form' onSubmit={e => e.preventDefault()} >
          <input
            type='text'
            value={name}
            className={`tag-form__input--name ${inputState}`}
            ref={input => (this.input = input)}
            placeholder='tag name'
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
          />
          <div className={`tag-form__operate ${btnState}`}>
            <button type='button' className={`tag-form__operate-btn ${SAVE}`} onClick={handleAdd}>{SAVE}</button>
            <button type='button' className={`tag-form__operate-btn ${CANCEL}`} onClick={handleCancelAdd}>{CANCEL}</button>
          </div>
        </form>
      </DisplayCSSTransition>
    )
  }
}

TagNameForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  customTags: PropTypes.instanceOf(List).isRequired,
  onAdd: PropTypes.func.isRequired,
  onCancelAddTag: PropTypes.func.isRequired,
  validateCustomTagName: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  customTags: state.customTags
})

const mapDispatchToProps = dispatch => ({
  onAdd: tag => dispatch(updateCustomTags(addCustomTag(tag)))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(validateCustomTagName(TagNameForm))
