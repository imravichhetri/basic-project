const { LoaderOptionsPlugin } = require( "webpack" );
module.exports = {
	mode: "development",
	bail: true,
	devtool: "source-map",
	plugins: [
		new LoaderOptionsPlugin( {
			debug: true
		} )
	],
	performance: false,
	devServer: {
		overlay: true,
		noInfo: true,
		inline: true,
		port: 3002,
		disableHostCheck: true
	}
};