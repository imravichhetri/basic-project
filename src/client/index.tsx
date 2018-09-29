import * as React from 'react';
import * as ApolloProvider from 'react-apollo/ApolloProvider';
import {
  hydrate as Hydrate
} from 'react-dom';

import * as Loadable from 'react-loadable';

// import '../common/utils/lodash_mixins';

import ApolloClient from './utils/apollo_client';


import './index.css';

Loadable.preloadReady().then( () => (
  Hydrate(
    (
      <ApolloProvider.default
        client={ ApolloClient }
        >
        <div>
          Heyo
        </div>
      </ApolloProvider.default>
    ),
    document.getElementById( 'application' )
  )
) );
