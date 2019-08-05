import {
	GetUserDetailsFromIdToken as GetUserDataFromGoogle
} from "../utils/google_oauth_client";

import JwtClient from "../utils/jwt_client";

import {
	MwGetUserData
} from "./user_management";

export const MwGoogleLogin = async ( req, res ) => {
	res.set( "Content-Type", "application/json" );
	try {
		const { googleId, accessToken, emailId, isRegisterReq } = req.body;
		const verifiedGoogleResponse = await GetUserDataFromGoogle( accessToken );
		console.log( verifiedGoogleResponse, "verifiedGoogleResponse" );
		if ( verifiedGoogleResponse.sub === googleId /*&& /( dailyhunt.in | verse.in )/.test( verifiedGoogleResponse.hd )*/ ){
			const payload = {
				email: verifiedGoogleResponse.email,
				name: verifiedGoogleResponse.name,
				picture: verifiedGoogleResponse.picture
			};
			let userData;
			try {
				userData = ( await MwGetUserData( verifiedGoogleResponse, isRegisterReq ) );

			} catch ( e ) {
				console.error( e );
				//sign up new user
				/*userData = ( await UserSignUp( _.clean( {
					email: verifiedGoogleResponse.email,
					username: verifiedGoogleResponse.name,
					googleId: verifiedGoogleResponse.sub,
					loginType: LoginTypes.get( GOOGLE_LOGIN_TYPE ).value,
					imageUrl: verifiedGoogleResponse.picture
				} ) ) ).data;*/
				throw e;

			} finally {
				if ( userData ){
					payload.userId = userData.id;
					const jwtToken = JwtClient.generateUserAuthToken( payload );

					res.cookie(
						"obelix-auth",
						jwtToken,
						{
							maxAge: ( 30 * 24 * 60 * 60 * 1000 ),
							httpOnly: true
						}
					);

					res.status( 200 );
					res.send( {
						message: "Login successful",
						user: {
							...payload
						}
					} );
					return res.end();
				}
			}
		}
		throw new Error( "Google verification failed" );

	} catch ( e ) {
		console.error( e );
		if (
			e.response &&
      		e.response.data &&
      		e.response.data.error
		){
			res.status( e.response.status );
			res.send( {
				message: e.response.data.error.message
			} );
			res.end();
			return;
		} else {
			res.status( 500 );
			res.send( {
				message: e.message
			} );
			return;
		}
	}
};

export const MwUserLogout = ( req, res ) => {
	return res.clearCookie( "obelix-auth" ).redirect( "/" );
};