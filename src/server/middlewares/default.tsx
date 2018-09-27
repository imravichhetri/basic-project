import { NextFunction, Request, Response } from "express";
import React from "react";
import ReactDOM from "react-dom/server";

import Html from "../../universal/Html";
import SplashScreen from "../../universal/SplashScreen";

export const setCompressedJsUrl = ( req: Request, res: Response, next: NextFunction ) => {
  if (
    process.env.NODE_ENV !== 'development' &&
    req.headers[ 'accept-encoding' ] &&
    ( /gzip/ ).test( req.headers[ 'accept-encoding' ])
  ){
    res.locals._jsFileUrl = '/statics/js/index.js.gz';
  } else {
    res.locals._jsFileUrl = req.originalUrl;
  }
  next();
};


export const defaultResponse = ( req: Request, res: Response ) => {
	const html = ( <Html
		jsFileUrl ={ res.locals._jsFileUrl }>
		 <SplashScreen/>
		</Html>
	);
	res.status( 200 );
	res.send( `<!doctype html>${ReactDOM.renderToString( html )}` );
	res.end();
};
