import Request from "request";

// import ConfigJSON from "../config/config";

// console.log( req, "Axios=====" )

export const ProxyMiddlewares = ( req, res ) => {
	console.log( req, "request=====" );
	res.set( "Content-Type", "text/html" );
	req.pipe( Request( req.query.redirectUrl ) ).pipe( res );
};
