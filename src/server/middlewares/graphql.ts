import { 
	graphiqlExpress as GraphiqlExpress, 
	graphqlExpress as GraphqlExpress,
} from "apollo-server-express";

import { default as Schema } from "../graphql";

export const giqlExpress = GraphiqlExpress( { endpointURL: "/graphql" } );

export const gqlExpress = GraphqlExpress( ( req , res ) => ( {
	schema: Schema,
	context: {
		reqType: ( req as any ).headers["auth-type"],
		user: ( req as any )["auth-user"],
		// authToken: req.cookies.auth,
		session: ( req as any ).session
	}
} ) );
