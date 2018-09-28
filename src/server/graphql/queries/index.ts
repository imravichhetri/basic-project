import { GQC } from "graphql-compose";
import { forEach as _forEach } from "lodash";
import Queries from "./*/*";

console.log( Queries, "queries" );
const initializeQueries = () => {
	try {
		const resolvers:any = {};
		_forEach( Queries, schemaResolvers => {
			_forEach( schemaResolvers, ( schemaResolver: any, key ) => {
				// console.log(schemaResolver, 'schemaResolver')
				resolvers[schemaResolver.name] = schemaResolver;
			} );
		} );
		GQC.rootQuery().addFields( resolvers );
	} catch ( e ) {
		console.log( e, "error" );
	}
};
export default initializeQueries;
