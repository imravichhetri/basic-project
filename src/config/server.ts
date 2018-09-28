const Fs = require( 'fs' );
const Path = require( 'path' );

const DefaultPrivateConfigLocation = require( './private/default.json' );
const DefaultPublicConfigLocation = require( './public/default.json' );
const PlatformPublicConfigLocation = require( `./public/${ process.env.NODE_ENV }.json` );
const PlatformPrivateConfigLocation = require( `./private/${ process.env.NODE_ENV }.json` );

const DefaultPrivateConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', DefaultPrivateConfigLocation ) ) );
const DefaultPublicConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', DefaultPublicConfigLocation ) ) );
const PlatformPrivateConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', PlatformPrivateConfigLocation ) ) );
const PlatformPublicConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', PlatformPublicConfigLocation ) ) );

const Config = Object.assign( {}, DefaultPublicConfig, PlatformPublicConfig, DefaultPrivateConfig, PlatformPrivateConfig );

export default Config;
