import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducers from './reducers'

import 'normalize.css'
import 'font-awesome/css/font-awesome.css'
import './base.css'
import './transition.css'
import './app.css'

const store = createStore(reducers)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
