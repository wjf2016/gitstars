import React, { Component } from 'react'
import Sidebar from './Sidebar'

class App extends Component {
  componentWillMount () {
    // 获取数据
  }

  render () {
    return (
      <div id='app'>
        <Sidebar />
      </div>
    )
  }
}

export default App
