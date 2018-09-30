const Fs = require( 'fs' );
const Path = require( 'path' );

const DefaultPublicConfigLocation = require( './public/default.json' );

const DefaultPublicConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), 'dist', DefaultPublicConfigLocation ) ) );

const Config = { ...DefaultPublicConfig };

export default Config;
