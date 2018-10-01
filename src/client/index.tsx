import * as React from 'react';
import * as ApolloProvider from 'react-apollo/ApolloProvider';
import {
  hydrate as Hydrate
} from 'react-dom';

import * as Loadable from 'react-loadable';

// import '../common/utils/lodash_mixins';
import '../../node_modules/antd/dist/antd.less';
import App from '../common/containers/app';
import './index.css';
import ApolloClient from './utils/apollo_client';

Loadable.preloadReady().then( () => (
  Hydrate(
    (
      <ApolloProvider.default
        client={ ApolloClient }
        >
        <App/>
      </ApolloProvider.default>
    ),
    document.getElementById( 'application' )
  )
) );
