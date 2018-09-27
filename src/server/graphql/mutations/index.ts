import { GQC } from "graphql-compose";
import { forEach as _forEach } from "lodash";
import Mutations from "./*/*";

console.log( Mutations, 'Mutations' );

const initializeMutations = () => {
	try {
		const resolvers: any = {};
		_forEach( Mutations, schemaResolvers => {
			_forEach( schemaResolvers, ( schemaResolver, key ) => {
				resolvers[schemaResolver.name] = schemaResolver;
			});
		});
		GQC.rootMutation().addFields( resolvers );
	} catch ( e ) {
		console.log( e, "error" );
	}
};
export default initializeMutations;
