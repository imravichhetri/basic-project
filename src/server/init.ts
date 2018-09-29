import * as BodyParser from "body-parser";
import { Application } from "express";
import { each as _each, sortBy as _sort } from "lodash";
import * as allRoutes from "./routes";

const init = async ( app: Application ) => {
  app.use( BodyParser.json().bind( BodyParser ) );
  _each(
    _sort( allRoutes, ( { route, url } ) => url ).reverse(),
    ( { route, url }, key ) => {
      if ( url ) {
        app.use( url, route );
      } else {
        app.use( route );
      }
    }
  );
};

export default init;
