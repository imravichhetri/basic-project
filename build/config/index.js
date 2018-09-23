const Path = require( 'path' );

let modExport;

switch ( process.env.RUN_ENV ){
  case "server": {
    modExport = require( './server' )
    break;
  }
  case "client": {
    modExport = require( './client' )
    break;
  }
  default: {
    throw new Error( "Unmatched Run environment" );
    break;
  }
}

module.exports = modExport;
