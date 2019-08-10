import {
	GraphQLObjectType,
	GraphQLString
} from "graphql";

export const PoliceOutput = new GraphQLObjectType( {
	name: "PoliceOutput",
	fields: {
		username: {
			type: GraphQLString
		},
		_id: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		password: {
			type: GraphQLString
		},
		currentAssignedCase: {
			type: GraphQLString
		},
		createdTime: {
			type: GraphQLString
		}
	}
} );
