import { GraphQLNonNull, GraphQLString } from "graphql";
import { Resolver } from "graphql-compose";

import { getGithubUserDetails } from "../../../services/github";
import { GithubOutputSchema } from "../../schemas/Github";

/*interface IArgs {
	source: object;
	args: object;
}*/
const Github = new Resolver( {
	name: "Github",
	type: GithubOutputSchema,
	args: {
		username: new GraphQLNonNull( GraphQLString )
	},
	resolve: async ( { source, args = { username: null } } ) => {
		const data = args.username ? await getGithubUserDetails( args.username ) : null;
		return data;
	}
} );

export default Github;