import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RepoList from './RepoList'
import '../subsidebar.css'

class SubSidebar extends Component {
  state = {
    searchValue: ''
  }

  handleChangeSearchValue = e => {
    this.setState({ searchValue: e.target.value })
  }

  render () {
    const { props, state, handleChangeSearchValue } = this
    const { activeTag } = props
    const { searchValue } = state

    return (
      <nav id='subsidebar'>
        <label className='search-label'>
          <i className='fa fa-search' aria-hidden='true'></i>
          <input
            type='text'
            className='search-input'
            value={searchValue}
            placeholder={`开发者 | 仓库名 @${activeTag.name}`}
            onChange={handleChangeSearchValue}
          />
        </label>
        <RepoList search={searchValue} />
      </nav>
    )
  }
}

SubSidebar.propTypes = {
  activeTag: PropTypes.object
}

SubSidebar.defaultProps = {
  activeTag: {}
}

const mapStateToProps = state => ({
  activeTag: state.activeTag
})

export default connect(mapStateToProps)(SubSidebar)
