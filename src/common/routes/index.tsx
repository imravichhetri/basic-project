import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../containers/dashboard';

export default class App extends React.Component<any,any> {
  constructor ( props: any ) {
    super( props );
  }

  render () {
    console.log( this.props,'app props' );
    return (
      <Dashboard>
        <Switch>
          <Route
            path="/:accountId"
            render={ ( props ) => ( "Dashboard" )  }
            />
          <Route
            render={ ( props ) => ( "Dashboard without account Id" ) }
            />
        </Switch>
      </Dashboard>
    );
  }
}
