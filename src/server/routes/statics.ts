import { Router as router } from "express";

import {
  msGzipHeaders,
  mwJsGzOptimization,
  mwStatics,
  mwStaticsClient
} from "../middlewares/statics";

const Router = router();

if( process.env.NODE_ENV !== 'development' ) {
	Router.use( mwJsGzOptimization.bind( mwJsGzOptimization ) );
}
Router.use( msGzipHeaders.bind( msGzipHeaders ) );
Router.use( mwStatics.bind( mwStatics ) );
if ( mwStaticsClient ) {
  Router.use( mwStaticsClient.bind( mwStaticsClient ) );
}

export const url = "/statics";
export const route = Router;
