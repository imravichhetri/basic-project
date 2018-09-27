import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLString
} from "graphql";

export const GithubOutputSchema = new GraphQLObjectType({
	name: "GithubOutputSchema",
	fields: {
		name: {
			type: GraphQLString
		},
		username: {
			type: GraphQLString
		},
		avatarUrl: {
			type: GraphQLString
		},
		followers: {
			type: GraphQLInt
		},
		following: {
			type: GraphQLInt
		},
		repos: {
			type: GraphQLInt
		}
	}
});
