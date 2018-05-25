import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Dashboard from '../containers/Dashboard'
import ProfileContainer from '../components/ProfileInformation'
import {LoadingContainer} from '../components/Loading'
import {submitClickHandler, sendUsername} from '../redux/actions'

const mapStateToProps=state=>state
const mapDispatchToProps=dispatch=>({actions:  {
    submitClickHandler: bindActionCreators(submitClickHandler, dispatch),
    sendUsername: bindActionCreators(sendUsername,dispatch)
  }}
  )
@connect(mapStateToProps,mapDispatchToProps)
export default class App extends React.Component {
  constructor (props) {
    super(props)
  }

  _allRoutes = ()=>(
    <Dashboard {...this.props}>
      <Switch>
        <RouteWithProps path="/github/user/:username" {...this.props} component={ProfileContainer}/>
        <RouteWithProps path="/weather/location/:location" {...this.props} component={ProfileContainer}/>
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

const RouteWithProps= ({path,component:Component,...rest})=>{
  console.log(path,rest,'abc=-==========')
    return <Route path={path} render={props=><Component {...props} {...rest}/>}/>
  }
