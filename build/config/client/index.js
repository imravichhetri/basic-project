const Merge = require( "webpack-merge" );

const common = require( "./common" );
let modExport;

switch ( process.env.NODE_ENV ){
	case "development": {
		modExport = require( "./development" );
		break;
	}
	case "stage": {
		modExport = require( "./stage" );
		break;
	}
	case "qa": {
		modExport = require( "./qa" );
		break;
	}
	case "production": {
		modExport = require( "./production" );
		break;
	}
	default: {
		console.log( "Wrong NODE_ENV value" );
		break;
	}
}

module.exports = Merge.smart( common, modExport );
