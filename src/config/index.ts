let Config: any;

if ( process.env.RUN_ENV === 'server' ){
  Config = require( './server' ).default;
} else if ( process.env.RUN_ENV === 'client' ) {
  Config = require( './client' ).default;
} else {
  Config = require( './default' ).default;
}

export default Config;
	