import * as BodyParser from "body-parser";
import { Application } from "express";
import { each as _each, sortBy as _sort } from "lodash";
import * as allRoutes from "./routes";

/*import {
  printAndReturn
} from './services/test';*/

// const value = printAndReturn( 1 );
// console.log( value,'======value' );
console.log( allRoutes, "allRoutes" );
const init = async ( app: Application ) => {
  app.use( BodyParser.json().bind( BodyParser ) );
  _each(
    _sort( allRoutes, ( { route, url } ) => url ).reverse(),
    ( { route, url } ) => {
      if ( url ) {
        app.use( url, route );
      } else {
        app.use( route );
      }
    }
  );
};

export default init;
