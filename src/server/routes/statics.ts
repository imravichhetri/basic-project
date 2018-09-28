import { Router as router } from "express";

import {
  msGzipHeaders,
  mwJsGzOptimization,
  mwStatics,
  mwStaticsClient
} from "../middlewares/statics";

const Router = router();

Router.use( mwJsGzOptimization.bind( mwJsGzOptimization ) );
Router.use( msGzipHeaders.bind( msGzipHeaders ) );
Router.use( mwStatics.bind( mwStatics ) );
if ( mwStaticsClient ) {
  Router.use( mwStaticsClient.bind( mwStaticsClient ) );
}

export const url = "/statics";
export const route = Router;
