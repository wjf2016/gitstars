import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RepoList from './RepoList'
import { filterActiveReposByTag } from '../reducers/active-repos'
import '../subsidebar.css'

class SubSidebar extends Component {
  state = {
    searchValue: ''
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeTag.id !== this.props.activeTag.id) {
      this.props.onFilterReposByTag(nextProps.activeTag)
    }
  }

  handleChangeSearchValue = _ => {

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
        <RepoList />
      </nav>
    )
  }
}

SubSidebar.propTypes = {
  activeTag: PropTypes.object,
  onFilterReposByTag: PropTypes.func.isRequired
}

SubSidebar.defaultProps = {
  activeTag: {}
}

const mapStateToProps = state => ({
  activeTag: state.activeTag
})

const mapDispatchToProps = dispatch => ({
  onFilterReposByTag: tag => dispatch(filterActiveReposByTag(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubSidebar)
