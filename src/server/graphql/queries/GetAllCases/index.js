import { Resolver } from "graphql-compose";
import { GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";

import { StolenCarCaseOutput } from "../../schemas/StolenCar";
import Car from "../../../mongo/collections/car";


export const GetAllCases = new Resolver( {
	name: "GetAllCases",
	type: new GraphQLList( StolenCarCaseOutput ),
	resolve: async ( { source, args } ) => {
		const data = await Car.fetch();
		return data;
	}
} );
