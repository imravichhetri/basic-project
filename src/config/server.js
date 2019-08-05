const Fs = require( "fs" );
const Path = require( "path" );
const _ = require( "lodash" );

const ReadFileSync = Fs.readFileSync;
const DefaultPrivateConfigLocation = require( "./private/default.json" );
const DefaultPublicConfigLocation = require( "./public/default.json" );

const PlatformPublicConfigLocation = require( `./public/${process.env.NODE_ENV}.json` );
const PlatformPrivateConfigLocation = require( `./private/${process.env.NODE_ENV}.json` );

// const UserPrivateConfig = require( `${ process.cwd() }/../config.json` )

/* load user config */

const DefaultPrivateConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), "dist", DefaultPrivateConfigLocation ) ) );
const DefaultPublicConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), "dist", DefaultPublicConfigLocation ) ) );
const PlatformPrivateConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), "dist", PlatformPrivateConfigLocation ) ) );
const PlatformPublicConfig = JSON.parse( Fs.readFileSync( Path.join( process.cwd(), "dist", PlatformPublicConfigLocation ) ) );


let data = {};
const Config = {
	...DefaultPublicConfig, ...PlatformPublicConfig, ...DefaultPrivateConfig, ...PlatformPrivateConfig
};

if( process.env.NODE_ENV === "development" ) {
	try {
		console.log( "Reading config file" );
		data = ReadFileSync( `${process.cwd()}/../config.json`, "utf8" );
		console.log( data, "user config" );
		_.assign( Config, JSON.parse( data ) );
	} catch ( e ) {
		// statements
		console.log( e, "error while reading user config file. Make sure you have config.json file parallel to the current project directory." );
	}
}

export default Config;
