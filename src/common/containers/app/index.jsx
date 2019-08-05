import React from "react";
import {
	graphql as Graphql
} from "react-apollo";
import { Route, Switch }  from "react-router-dom";
/* import {
	get as _Get
} from "lodash"; */

// import Routes from "../../routes/index";
// import GetCurrentUser from "../../graphql/query/get_current_user.graphql";
// import Login from "../login";
// import { ROLE_DH_USER } from "../../../universal/enums/consts";
import AppContext from "./app_context.jsx";

/*import AccountBasedRoutes from '../../routes/account_based_routes.jsx';
import CommonUserRoutes from '../../routes/common_user_routes.jsx';
import * as AccountVerification from '../account_verification/index.jsx';
import * as ChangePassword from '../change_password/index.jsx';
import * as ForgotPassword from '../forgot_password/index.jsx';
import * as Signup from '../signup/index.jsx'*/

import ErrorBoundComponent from "../../presentational/error_bound_component";

const Router = process.env.RUN_ENV === "client" ? require( "react-router-dom/BrowserRouter" ).default : require( "react-router-dom/StaticRouter" ).default;

/* @Graphql(
	GetCurrentUser,
	{
		name: "getCurrentUser"
	}
) */
export default class App extends ErrorBoundComponent {
	/* _loginDependentRoutes = ( currentUser ) => {
    	return (
        <Routes
          currentUser={currentUser}
          />
    	);
    };

  _refetchCurrentUser = () => {
  	this.props.getCurrentUser.refetch();
  };

  _appRouter = ( isRegisterReq ) => {
  	if ( this.props.getCurrentUser.loading || !this.props.getCurrentUser[ "CurrentUser" ] ){
  		return (
        <Login
          isRegisterReq = { isRegisterReq === true }
          getCurrentUser = { this.props.getCurrentUser }
          />
  		);
  	} */

  /* 	const currentUser = this.props.getCurrentUser[ "CurrentUser" ];

  	return (
      <AppContext.Provider
        value={ {
        	currentUser,
        	refetchCurrentUser: this._refetchCurrentUser
        } }
        >
        { this._loginDependentRoutes( currentUser ) }
      </AppContext.Provider>
  	);

  };
 */
  _render = () => {
  	return "HELLA";
  	/* return (
      <Router
        context={ this.props.context }
        location={ this.props.location }
        >
          <Switch>
            <Route
              path="/register"
              render={ this._appRouter.bind( this, true ) }
              />
            <Route
              render={ this._appRouter }
              />
          </Switch>
      </Router>
  	); */
  }
}
