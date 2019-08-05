import AuthenticateExisitingUser from "../microservices/authenticate_existing_user";
import UpdateExisitingUser from "../microservices/update_existing_user";
import Config from "../../config";
import { USER_REGISTERED_STATUS } from "../../universal/enums/consts";


export const MwGetUserData = async ( verifiedGoogleResponse, isRegisterReq ) => {
	if( isRegisterReq ){
		try {
			const userData = ( await AuthenticateExisitingUser(
				verifiedGoogleResponse.email,
				verifiedGoogleResponse.email,
				Config.application_id,
				Config.application_id ) ).data;

			if ( userData ) {
				userData.userId = userData.id;
				userData.applicationId = userData.metaInfo.applicationId;
				userData.username = verifiedGoogleResponse.name;
				userData.password = verifiedGoogleResponse.sub;
				userData.avatar = verifiedGoogleResponse.picture;
				userData.status = USER_REGISTERED_STATUS;
				userData.role = userData.metaInfo.role;
				userData.permissions = userData.metaInfo.permissions;
				userData.language = userData.metaInfo.language;

				delete userData.metaInfo;

				let responseMessage = ( await UpdateExisitingUser( userData ) ).message;
				if ( responseMessage === "Component updated Successfully!" )
					return userData;
			}
		}
		catch ( e ){
			console.error( "registration req for user : " + verifiedGoogleResponse.email , e );
		}
	}

	return ( await AuthenticateExisitingUser(
		verifiedGoogleResponse.email,
		verifiedGoogleResponse.name,
		verifiedGoogleResponse.sub,
		Config.application_id ) ).data;
};

/*
export const MwUpsertUser= async ( req, res ) => {
	res.set( "Content-Type", "application/json" );
	try {
		let userData = req.body;
		console.log( " upsert request", userData );
		let responseMessage;
		if( userData.id ){
			userData.userId = userData.id;
			userData.applicationId = Config.application_id;
			userData.metaInfo = {
				"language": userData.language
			};
			responseMessage = ( await UpdateExisitingUser( userData ) ).message;
			console.log(" update response", responseMessage);
			if ( responseMessage !== "Component updated Successfully!" ){
				res.status( 200 );
				res.send( {
					message: responseMessage,
					user: {
						...userData
					}
				} );
				return res.end();
			}
		}
		else {
			userData.username = userData.email;
			userData.password = Config.application_id;
			userData.applicationId = Config.application_id;
			userData.metaInfo = {
				"language": userData.language
			};

			const response = ( await AddUser( userData ) );
			userData = response.data;
			responseMessage = response.message;
		}
		console.log( "upsert user data :", userData );
		res.status( 200 );
		res.send( {
			message: responseMessage,
			user: {
				...userData
			}
		} );
		return res.end();
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
};*/
