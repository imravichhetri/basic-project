import { Resolver } from "graphql-compose";
import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLInt
} from "graphql";

export const Users = new Resolver({
	name: "Users",
	type: GraphQLInt,
	args: { num: GraphQLInt },
	resolve: async ({ source, args }) => {
		return 1;
	}
});
