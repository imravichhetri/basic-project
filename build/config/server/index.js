const Merge = require( 'webpack-merge' );
let modExport;

const commonConfig = require( './common' );

switch ( process.env.NODE_ENV ){
  case 'development': {
    modExport = require( './development' );
    break;
  }
  case 'production': {
    modExport = require( './production' );
    break;
  }
  case 'qa': {
    modExport = require( './production' );
    break;
  }
  case 'stage': {
    modExport = require( './production' );
    break;
  }
  default: {
    console.log( 'Wrong NODE_ENV value' )
    break;
  }
}

console.log(modExport, process.env.NODE_ENV,'modExport')
module.exports = Merge( commonConfig, modExport );
