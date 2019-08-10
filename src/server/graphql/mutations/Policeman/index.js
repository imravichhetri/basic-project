import { Resolver } from "graphql-compose";
import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLError } from "graphql";

import Police from "../../../mongo/collections/police";
import { PoliceOutput } from "../../schemas/Police";


export const PolicemanLogin = new Resolver( {
	name: "PolicemanLogin",
	args: {
		username: new GraphQLNonNull( GraphQLString  ),
		password: new GraphQLNonNull( GraphQLString  )
	},
	type: PoliceOutput,
	resolve: async ( { source, args } ) => {
		const data = await Police.fetch( { username: args.username, password: args.password } );
		if( data ){
			return data;
		}
		return new GraphQLError( "Wrong username or password" );
	}
} );
