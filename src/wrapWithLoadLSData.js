import React, { Component } from 'react'

export default (WrappedComponent, name) => {
  return class wrapWithLoadLSData extends Component {
    constructor (props) {
      super(props)

      this.state = { data: '' }

      this.handleSaveData = this.handleSaveData.bind(this)
    }

    componentWillMount () {
      const data = window.localStorage.getItem(name)
      this.setState({ data: JSON.parse(data) })
    }

    handleSaveData (data) {
      window.localStorage.setItem(name, JSON.stringify(data))
    }

    render () {
      const { props, state, handleSaveData } = this
      return (
        <WrappedComponent {...props} data={state.data} saveData={handleSaveData} />
      )
    }
  }
}
