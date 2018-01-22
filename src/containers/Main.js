import React, { Component } from 'react'
import Header from './Header'
import SubSidebar from './SubSidebar'
import RepoReadme from './RepoReadme'
import '../main.css'

class Main extends Component {
  render () {
    return (
      <main id="main">
        <Header />
        <div className="main-body">
          <SubSidebar />
          <RepoReadme />
        </div>
      </main>
    )
  }
}

export default Main
