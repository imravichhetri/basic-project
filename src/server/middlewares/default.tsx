import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  ApolloClient
} from 'apollo-client';
import {
  ApolloLink
} from 'apollo-link';
import { SchemaLink } from 'apollo-link-schema';
import { NextFunction, Request, Response } from "express";
import Fs from 'fs';
import Path from 'path';
import * as React from 'react';
import {
  ApolloProvider,
  renderToStringWithData as RenderToStringWithData
} from 'react-apollo';
import * as ReactDOM from 'react-dom/server';
import * as Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import ClientConfig from '../../config/client';
import GQLSchema from '../graphql';
import {
  ErrorLink
} from '../utils/apollo-links';
import JwtClient from '../utils/jwt_client';


import LoadablesList from '../../../react-loadable.json';
import App from '../../common/containers/app';
import Html from "../../common/functional/Html";

const loadablesStats = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', LoadablesList ) , 'utf8' ) );


export const setCompressedJsUrl = ( req: Request, res: Response, next: NextFunction ) => {
  res.locals._jsFileUrl = (
      process.env.NODE_ENV !== 'development' &&
      req.headers[ 'accept-encoding' ] &&
      ( /gzip/ ).test( req.headers[ 'accept-encoding' ] )
    ) ? '/statics/js/index.js.gz' : req.originalUrl;
  next();
};


/*export const defaultResponse = ( req: Request, res: Response ) => {
  console.log( req, 'request' );
	const html = ( <Html
		jsFileUrl ={ 'staics/js/index.css' }>
		 <SplashScreen/>
		</Html>
	);
  try {
    console.log( html, Html, 'html====' );
  } catch( e ) {
    console.log( e, 'error' );
  }
	res.status( 200 );
	res.send( `<!doctype html>${ ReactDOM.renderToString( html )}` );
	res.end();
};*/

export const MwSetSessionData = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    if ( req.cookies[ 'pdb-auth' ] ){
      // decode jwt to identify user
      const decodedJwt = JwtClient.decodeToken( req.cookies[ 'pdb-auth' ] );

      if ( decodedJwt.userId ){
        // get user data via user id api and send apply to session
        const userInfo = await AuthenticateUser( decodedJwt.userId );
        if ( userInfo.data ){
          req.session = {
            data: userInfo.data
          };

          res.cookie(
            'pdb-auth',
            req.cookies[ 'pdb-auth' ],
            {
              maxAge: ( 30 * 24 * 60 * 60 * 1000 ),
              httpOnly: true
            }
          );
        }
      }
    } else {
      req.session = null;
    }
  } catch ( e ) {
    console.error( e );
    req.session = null;
  } finally {
    next();
  }
};

export const MwDefault = async ( req: Request, res: Response ) => {
  const modules: string[] = [];

  const apolloClient = new ApolloClient( {
    ssrMode: true,
    cache: new InMemoryCache(),
    link: ApolloLink.from( [
      ErrorLink,
      new SchemaLink( {
        schema: GQLSchema,
        context: {
          user: ( req.session && req.session.data ) ? req.session.data : null
        }
      } )
    ] )
  } );

  
  const appComponent = (
    <Loadable.Capture
      report={
         ( moduleName ) => {
          modules.push( moduleName );
        }
      }
      >
      <ApolloProvider client={ apolloClient }>;
        <App
          location={ req.originalUrl }
          context={ {} }
          />
      </ApolloProvider>
    </Loadable.Capture>
  );



  // const loadableScripts = await GetLoadableAndGraphqlData( appComponent );
  // console.log( 'chck', loadableScripts )

  // await GetDataFromTree( appComponent );
  //
  // const loadableScripts = await GetLoadableState( appComponent );
  // console.log( loadableScripts,'loadableScripts' )

  const app = await RenderToStringWithData(
    appComponent
  );

  const loadableBundles = getBundles( loadablesStats, modules );
  const initialState = apolloClient.extract();

  const html = (
    <Html
      config={ ClientConfig }
      initialState={ initialState }
      content={ app }
      loadableBundles={ loadableBundles }
      />
  );
  res.status( 200 );
  res.send( `<!doctype html>\n${ReactDOM.renderToStaticMarkup( html )}` );
  res.end();
};