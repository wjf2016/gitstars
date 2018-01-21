import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'

class App extends Component {
  componentWillMount () {
    // 获取数据
  }

  render () {
    return (
      <div id='app'>
        <Sidebar />
        <Main />
      </div>
    )
  }
}

export default App
