import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducers from './reducers'

import 'normalize.css'
import 'font-awesome/css/font-awesome.css'
import './base.css'
import './app.css'

const store = createStore(reducers)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
