import { Resolver } from "graphql-compose";
import { GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";

import { StolenCarCaseOutput } from "../../schemas/StolenCar";
import CarCollection from "../../../mongo/collections/car";


export const Car = new Resolver( {
	name: "GetCarByNumber",
	args: {
		number: new GraphQLNonNull( GraphQLString )
	},
	type: StolenCarCaseOutput,
	resolve: async ( { source, args } ) => {
		const data = await CarCollection.getByNumber( args.number );
		return data;
	}
} );
