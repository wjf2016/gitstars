import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { notification } from 'antd'
import App from './containers/App'
import reducers from './reducers'
import { getUserInfo } from './api'

import 'font-awesome/css/font-awesome.css'
import './base.css'
import './transition.css'
import './app.css'

notification.config({
  placement: 'bottomRight',
  bottom: 30,
  duration: 0
})

const store = createStore(reducers)

window._gitstars = {}

/* eslint-disable no-new */
new Promise(async (resolve, reject) => {
  const GITSTARS_USER = 'gitstars_user'
  let userInfo = window.localStorage.getItem(GITSTARS_USER)

  if (userInfo) return resolve(JSON.parse(userInfo))

  userInfo = await getUserInfo()
  window.localStorage.setItem(GITSTARS_USER, JSON.stringify(userInfo))
  resolve(userInfo)
}).then(userInfo => {
  window._gitstars.user = userInfo

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})
