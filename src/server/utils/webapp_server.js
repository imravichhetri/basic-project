import BodyParser from "body-parser";
import CookieParser from "cookie-parser";
import { each as _each, sortBy as _sort } from "lodash";
import allRoutes from "../routes/*";
// import "../sequelize";
import WebServer from "../helpers/web_server";

import {
	MwSetSessionData
} from "../middlewares/default.jsx";
/* import * as DefaultRoute from '../routes/webapp_default';
import * as GoogleRoute from '../routes/webapp_google';
import * as GraphqlRoute from '../routes/webapp_graphql';
import * as GraphiqlRoute from '../routes/webapp_graphiql';
import * as StaticsRoute from '../routes/webapp_statics';
import * as ApiRoute from '../routes/webapp_apis';
import * as AuthRoute from '../routes/webapp_auth';
import * as HealthcheckRoute from '../routes/webapp_healthcheck'; */

export default class WebappServer extends WebServer {
	constructor ( ...args ) {
		super( ...args );

		// Setup application routes here
		this.app.use( BodyParser.json() );
		this.app.use( CookieParser() );
		this.app.use( MwSetSessionData );
		/*this.app.use( HealthcheckRoute.Uri, HealthcheckRoute.Route );
    this.app.use( GoogleRoute.Uri, GoogleRoute.Route );
    this.app.use( GraphqlRoute.Uri, GraphqlRoute.Route );
    this.app.use( GraphiqlRoute.Uri, GraphiqlRoute.Route );
    this.app.use( ApiRoute.Uri, ApiRoute.Route );
    this.app.use( AuthRoute.Uri, AuthRoute.Route );
    this.app.use( StaticsRoute.Uri, StaticsRoute.Route );
    this.app.use( DefaultRoute.Uri, DefaultRoute.Route ); */
		_each( _sort( allRoutes, ( { url } ) => url ).reverse(), ( { route, url } ) => {
			if ( url ) {
				this.app.use( url, route );
			} else {
				this.app.use( route );
			}
		} );
	}
}
