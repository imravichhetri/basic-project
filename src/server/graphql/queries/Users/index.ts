import { GraphQLInt } from "graphql";
import { Resolver } from "graphql-compose";

export const Users = new Resolver({
	name: "Users",
	type: GraphQLInt,
	args: { num: GraphQLInt },
	resolve: async ({ source, args }) => {
		return 1;
	}
});
