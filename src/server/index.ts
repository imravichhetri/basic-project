import Express from "express";
import Config from '../config';
import init from "./init";

const app = Express();
const PORT = 4000;

console.log( Config, 'Config' );
init( app )
  .then( data => {
    app.listen( Config.webapp_port || 4000, () => {
      console.log( `App running in ${PORT}` );
    } );
  } )
  .catch( e => {
    console.log( "Error occurred" );
  } );
