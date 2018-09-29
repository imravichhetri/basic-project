import * as React from 'react';
/*import {
  graphql as Graphql
} from 'react-apollo';
import { Route, Switch }  from 'react-router-dom';

// import { COMMON_USER_TYPE, ACCOUNT_USER_TYPE }  from '../../../universal/enums/consts';

import GetCurrentUser from '../../../graphql/queries/Github.graphql';*/

// import AppContext from './app_context.jsx';

/*import AccountBasedRoutes from '../../routes/account_based_routes.jsx';
import CommonUserRoutes from '../../routes/common_user_routes.jsx';
import * as AccountVerification from '../account_verification/index.jsx';
import * as ChangePassword from '../change_password/index.jsx';
import * as ForgotPassword from '../forgot_password/index.jsx';
import Login from '../login/index.jsx';
import * as Signup from '../signup/index.jsx'*/;
// import * as BoundComponent from '../../common/bound_component/index.jsx';

// const Router = process.env.RUN_ENV === 'client' ? require( 'react-router-dom/BrowserRouter' ).default : require( 'react-router-dom/StaticRouter' ).default;

/*@Graphql(
  GetCurrentUser,
  {
    name: "getCurrentUser"
  }
)*/
export default class App extends React.Component<any,any> {
 /* _loginDependentRoutes = ( currentUser ) => {
    switch ( currentUser.userType ) {
      case COMMON_USER_TYPE: {
        return (
          <div>
            <CommonUserRoutes/>
          </div>
        );
      }
      case ACCOUNT_USER_TYPE:
      default:{
        return (
          <AccountBasedRoutes />
        )
      }
    }
  }

  _refetchCurrentUser = () => {
    this.props.getCurrentUser.refetch();
  };

  _appRouter = ( props ) => {
    if ( this.props.getCurrentUser.loading || !this.props.getCurrentUser[ 'CurrentUser' ] ){
      return (
        <Login
          { ...this.props }
          />
      );
    }

    const currentUser = this.props.getCurrentUser[ 'CurrentUser' ];

    return (
      <AppContext.Provider
        value={ {
          currentUser,
          refetchCurrentUser: this._refetchCurrentUser
        } }
        >
        { this._loginDependentRoutes( currentUser ) }
      </AppContext.Provider>
    )

  };

  _render = () => {
    return (
      <Router
        context={ this.props.context }
        location={ this.props.location }
        >
        <Switch>
          <Route
            path="/verification"
            component={ AccountVerification }
            />
          <Route
            path="/change-password"
            component={ ChangePassword }
            />
          <Route
            path="/signup"
            component={ Signup }
            />
          <Route
            path="/forgot-password"
            component={ ForgotPassword }
            />
          <Route
            render={ this._appRouter }
            />
        </Switch>
      </Router>
    );
  }*/

  public render() {
    return (
      <div>
        Dasso
      </div>
     );
  }
}
