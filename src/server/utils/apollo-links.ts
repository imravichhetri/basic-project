import { onError as OnError } from "apollo-link-error";

export const ErrorLink = OnError( ( { graphQLErrors, networkError, response } ) => {
  if ( graphQLErrors ) {
    graphQLErrors.map( ( { message, locations, path } ) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if ( networkError ) {
  	console.log( `[Network error]: ${networkError}` );
  }
} );
