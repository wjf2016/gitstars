import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class MainBody extends Component {
  render () {
    const { activeRepo } = this.props

    return (
      Object.keys(activeRepo).length &&
      <div className='content'>
        <header className='repo-readme__header'>
          <h3 className='repo-title'>
            <a href={activeRepo.html_url}>
              <i className='fa fa-fw fa-lg fa-github' aria-hidden></i>
            </a>
            {activeRepo.owner.login} / {activeRepo.name}
          </h3>
        </header>
      </div >
    )
  }
}

MainBody.propTypes = {
  activeRepo: PropTypes.object
}

MainBody.defaultProps = {
  activeRepo: {}
}

const mapStateToProps = state => ({
  activeRepo: state.activeRepo
})

export default connect(mapStateToProps)(MainBody)
