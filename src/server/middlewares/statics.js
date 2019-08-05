import Express from "express";
import Proxy from "http-proxy-middleware";
import Path from "path";

let mwStaticsClient;

if ( process.env.NODE_ENV === "development" ) {
	mwStaticsClient = Proxy( {
		target: "http://localhost:3002"
	} );
}
const mwStatics = Express.static( Path.join( process.cwd(), "/dist/statics" ) );

const mwJsGzOptimization = ( req, res, next ) => {
	if (
		req.headers["accept-encoding"].search( "gzip" ) !== -1
    && /.js$/.test( req.url )
	) {
		req.url = `${req.url}.gz`;
		req.originalUrl = `${req.originalUrl}.gz`;
	}
	next();
};

const msGzipHeaders = ( req, res, next ) => {
	if ( /.gz$/.test( req.originalUrl ) ) {
		res.set( "Content-Encoding", "gzip" );
		res.set( "Content-Type", "text/event-stream" );
	}
	next();
};


export {
	msGzipHeaders, mwStaticsClient, mwStatics, mwJsGzOptimization
};
