import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { notification } from 'antd'
import App from './containers/App'
import reducers from './reducers'
import { getUserInfo } from './api'

import 'font-awesome/css/font-awesome.css'
import 'github-markdown-css'
import './base.css'
import './app.css'
import './sidebar.css'
import './transition.css'

notification.config({ placement: 'bottomRight' })

const store = createStore(
  reducers,
  applyMiddleware(ReduxThunk)
)

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
