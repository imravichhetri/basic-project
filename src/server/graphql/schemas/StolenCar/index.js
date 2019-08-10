import {
	GraphQLObjectType,
	GraphQLString
} from "graphql";

export const StolenCarCaseOutput = new GraphQLObjectType( {
	name: "StolenCarCaseOutput",
	fields: {
		status: {
			type: GraphQLString
		},
		_id: {
			type: GraphQLString
		},
		number: {
			type: GraphQLString
		},
		model: {
			type: GraphQLString
		},
		brand: {
			type: GraphQLString
		},
		color: {
			type: GraphQLString
		},
		createdTime: {
			type: GraphQLString
		},
		assignedPoliceId: {
			type: GraphQLString
		}
	}
} );
