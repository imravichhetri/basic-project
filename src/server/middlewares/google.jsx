import React from "react";
import ReactDOM from "react-dom/server";

import GoogleAuthRedirect from "../../common/presentational/google_auth_redirect/index.jsx";

import {
	GetTokensFormCode,
	// GetUserDetailsFromAccessToken,
	GetUserDetailsFromIdToken
} from "../utils/google_oauth_client";

export const MwGoogleOauthLoaded = async ( req, res ) => {
	let authData;
	try {
		if ( req.query.code ) {
			const tokenResp = await GetTokensFormCode( req.query.code );
			const accessTokenResp = await GetUserDetailsFromIdToken( tokenResp[ "id_token" ] );
			authData = Object.assign( {}, accessTokenResp, {
				access_token: tokenResp[ "id_token" ]
			} );
			console.log( accessTokenResp, "accessTokenResp" );

			res.status( 200 );
		}
	} catch ( e ) {
		console.error( e );
		res.status( 401 );

	} finally {
		res.send( `<!doctype html>\n${ReactDOM.renderToStaticMarkup( (
			<GoogleAuthRedirect
				authData={ authData }
				/>
		) )}` );
		res.end();
	}
};
