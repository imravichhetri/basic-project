import React from "react";
// import FavIcon from "../../../assets/images/favicon.ico";


import _ from "lodash";

const Html = ( props ) => {
	return (
      <html
        lang='en'
        >
        <head>
          <base href="/" /> 
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>Obelix Console</title>
          {/* <link rel='shortcut icon' type='image/x-icon' href={ FavIcon } /> */}
          {/* <link rel='icon' type='image/x-icon' href={ FavIcon } /> */}
          <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet"/>
          {/* <link rel='stylesheet' type='text/css' href='/statics/css/vendors.css' /> */}
          <link rel='stylesheet' type='text/css' href='/statics/css/index.css' />
          { _.map ( props.loadableBundles, sourceState => {
          	if ( sourceState && sourceState.file.endsWith( ".css" ) ){
          		return ( <link key={ sourceState.publicPath } href={ `${ sourceState.publicPath }` } rel="stylesheet" /> );
          	}              
          	return null;
          } ) }
        </head>
        <body >
          <div
            id='application'
            dangerouslySetInnerHTML={ {  __html: props.content } }
            />
          <script
            dangerouslySetInnerHTML={ {
            	__html: `window.__CONFIG__=${ JSON.stringify( props.config ).replace( /</g, "\\u003c" ) };`
            } }
            />
          <script
            dangerouslySetInnerHTML={ {
            	__html: `window.__APOLLO_STATE__=${ JSON.stringify( props.initialState ).replace( /</g, "\\u003c" ) };`
            } }
            />
          {/* <script src='/statics/js/vendors.js' charSet='UTF-8' /> */}
            { _.map( props.loadableBundles, ( sourceState ) => {
            	if ( sourceState && sourceState.file.endsWith( ".js" ) ){
            		return ( <script key={ sourceState.publicPath } src={ `${ sourceState.publicPath }` } /> );
            	} 
            	return null;
            } ) }
          <script src='/statics/js/index.js' charSet='UTF-8' />

        </body>
      </html>
	);
};

export default Html;