import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Dashboard from '../containers/Dashboard'
import ProfileContainer from '../components/ProfileInformation'


export default class App extends React.Component {
  constructor (props) {
    super(props)
  }

  _allRoutes = ()=>(
    <Dashboard>
      <Switch>
        <Route path="/github/users/:username" component={ProfileContainer}/>
      </Switch>
    </Dashboard>
  )
  render () {
    return (
      <BrowserRouter>
        {this._allRoutes()}
      </BrowserRouter>
    )
  }
}
