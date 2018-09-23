/*import {
	getGithubUserDetails
} from './github';*/
import * as _ from 'lodash';

/*getGithubUserDetails( 'imravichhetri' )
	.then( data => {
		console.log( data,'data' ) 
	} )
	.catch( e => {
		console.log( e, 'error' )
	} )
*/
export const printAndReturn = ( number: number ) => {
	console.log( number, typeof number );
	console.log( _.isNumber( number ) )
	return [ 1, 2, 3 ]
}