import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

export default class App extends React.Component<any,any> {
  constructor ( props: any ) {
    super( props );
  }

  public render () {
    return (
      <BrowserRouter>
        ABC
      </BrowserRouter>
    );
  }
}
