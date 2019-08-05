import React from "react";
import {
	Route,
	Switch,
	Redirect,
	withRouter as WithRouter
} from "react-router-dom";
import {
	Prompt
} from "react-router-dom";


import {
	get as _Get
} from "lodash";


import Dashboard from "../containers/dashboard";
import AppPermissionContext, {
	CheckPermission
} from "../containers/app/app_permission_context";
import SearchHome from "../containers/search_home";

@WithRouter
export default class AppRoutes extends React.Component {
  _appRoutes = () => {
  	return (
      <React.Fragment>
        <Route
          path="/search"
          component={ SearchHome }
          />
      </React.Fragment>
  	);
  }
  render () {
  	// const activeRole = _Get( this.props, "currentUser.metaInfo" ) || {};
  	// const checkPermission = CheckPermission.bind( activeRole.permissions );
  	console.log( this, "routes" );
  	return (
      <AppPermissionContext.Provider
        value={{
        }}
        >
        <Dashboard {...this.props} >
          <Switch>
            {/* <Route
              path="/"
              exact
              render={( props ) => ( <Redirect to="/tasks/MY_TASKS" /> )}
              /> */}
            <Route
              render={
                ( props ) => this._appRoutes( props )
              }
              />
          </Switch>
        </Dashboard>
      </AppPermissionContext.Provider>
  	);
  }
}