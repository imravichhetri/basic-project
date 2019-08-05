import {
	graphiqlExpress as GraphiqlExpress,
	graphqlExpress as GraphqlExpress
} from "apollo-server-express";

import { default as Schema } from "../graphql";

export const giqlExpress = GraphiqlExpress( { endpointURL: "/graphql" } );

export const gqlExpress = GraphqlExpress( ( req ) => {
	return ( {
		schema: Schema,
		context: {
			user: ( req.session && req.session.data ) ? req.session.data : null
			// authToken: req.cookies.auth,
		}
	} );
} );
