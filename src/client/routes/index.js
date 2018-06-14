import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

export default class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <BrowserRouter>
        {this._allRoutes()}
      </BrowserRouter>
    )
  }
}
