import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import HttpLink from './http_link';

const AppApolloClient = new ApolloClient( {
  link: HttpLink,
  cache: new InMemoryCache().restore( ( window as any ).__APOLLO_STATE__ )
} );

export default AppApolloClient;
