import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { notification } from 'antd'
import App from './containers/App'
import reducers from './reducers'
import { getUserInfo } from './api'
import './css/app.css'

notification.config({ placement: 'bottomRight' })

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk)
)

const GITSTARS_USER = 'gitstars_user'
const loadUserInfo = async () => {
  let userInfo = window.localStorage.getItem(GITSTARS_USER)

  if (userInfo) return JSON.parse(userInfo)

  userInfo = await getUserInfo()
  return userInfo
}

window._gitstars = {}
loadUserInfo().then(userInfo => {
  window.localStorage.setItem(GITSTARS_USER, JSON.stringify(userInfo))
  window._gitstars.user = userInfo

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})
