const Fs = require( 'fs' );
const Path = require( 'path' );

const DefaultPublicConfigLocation = require( './public/default.json' );

const PlatformPublicConfigLocation = require( `./public/${ process.env.NODE_ENV }.json` );

const DefaultPublicConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', DefaultPublicConfigLocation ) ) );

const PlatformPublicConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', PlatformPublicConfigLocation ) ) );

const Config = process.env.RUN_ENV === 'client' ? ( window as any ).__CONFIG__ : {...DefaultPublicConfig, ...PlatformPublicConfig };


export default Config;
