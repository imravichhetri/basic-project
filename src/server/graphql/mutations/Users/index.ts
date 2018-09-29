import {
	GraphQLInt
} from "graphql";
import { Resolver } from "graphql-compose";

const Users = new Resolver( {
	name: "Users",
	type: GraphQLInt,
	args: { num: GraphQLInt },
	resolve: async ( { source, args } ) => {
		return 1;
	}
} );


export default Users;