import { Resolver } from "graphql-compose";
import { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLError } from "graphql";

import { StolenCarCaseOutput } from "../../schemas/StolenCar";
import {
	AssignCaseOnCaseResolved
} from "../../../services/assign_case";

export const CaseResolve = new Resolver( {
	name: "CaseResolve",
	args: {
		number: new GraphQLNonNull( GraphQLString ),
		status: new GraphQLNonNull( GraphQLString ),
		username: new GraphQLNonNull( GraphQLString )
	},
	type: StolenCarCaseOutput,
	resolve: async ( { source, args } ) => {
		const data = await AssignCaseOnCaseResolved( args );
		if ( data ) {
			return data;
		}
		return new GraphQLError( "Wrong username or password" );
	}
} );
