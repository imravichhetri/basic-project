import { GQC } from "graphql-compose";
import _ from 'lodash';
import Queries from "./*/*";

const initializeQueries = () => {
	try {
		const resolvers:any = {};
		_.each( Queries, ( { default: query } ) => {
		  resolvers[ query.name ] = query;
		} );
		console.log( resolvers, 'query resolvers' );
		
		GQC.rootQuery().addFields( resolvers );
	} catch ( e ) {
		console.log( e, "error" );
	}
};
export default initializeQueries;
