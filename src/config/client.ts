let Config;

if ( process.env.RUN_ENV === 'client' ){
  // Config  = window.__CONFIG_;
} else {
  const Fs = require( 'fs' );
  const Path = require( 'path' );

  const DefaultPublicConfigLocation = require( './public/default.json' );

  const PlatformPublicConfigLocation = require( `./public/${ process.env.NODE_ENV }.json` );

  const DefaultPublicConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', DefaultPublicConfigLocation ) ) );

  const PlatformPublicConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', PlatformPublicConfigLocation ) ) );

  Config = {...DefaultPublicConfig, ...PlatformPublicConfig };
}

export default Config;
