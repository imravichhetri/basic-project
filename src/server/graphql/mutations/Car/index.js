import { Resolver } from "graphql-compose";
import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLError } from "graphql";

import Police from "../../../mongo/collections/police";
import { StolenCarCaseOutput } from "../../schemas/StolenCar";

import {
	AssignCaseOnCarRequest
} from "../../../services/assign_case";

export const StolenCarReport = new Resolver( {
	name: "StolenCarReport",
	args: {
		number: new GraphQLNonNull( GraphQLString ),
		model: new GraphQLNonNull( GraphQLString ),
		brand: new GraphQLNonNull( GraphQLString ),
		color: new GraphQLNonNull( GraphQLString )
	},
	type: StolenCarCaseOutput,
	resolve: async ( { source, args } ) => {
		const data = await AssignCaseOnCarRequest( args );
		console.log( data, "data" );
		if ( data ) {
			return data;
		}
		return new GraphQLError( "Wrong username or password" );
	}
} );
