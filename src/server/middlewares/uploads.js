import Request from "request";
import Config from "../../config";

export const MwTargetingImageUpload = ( req, res ) => {
	console.log( {ImageUploadReq: req} );
	req.pipe( Request.post( `${ Config[ "obelix_be_host" ] }/upload/image` ) ).pipe( res );
};