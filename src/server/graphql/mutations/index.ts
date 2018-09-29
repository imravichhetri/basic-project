import { GQC } from "graphql-compose";
import _ from "lodash";
import Mutations from "./*/*";

const initializeMutations = () => {
	try {
		const resolvers:any = {};
		_.each( Mutations, ( { default: mutation } ) => {
		  resolvers[ mutation.name ] = mutation;
		} );
		console.log( resolvers, 'mutation resolvers' );
		GQC.rootMutation().addFields( resolvers );
	} catch ( e ) {
		console.log( e, "error" );
	}
};
export default initializeMutations;
