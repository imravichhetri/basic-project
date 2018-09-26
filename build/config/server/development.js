const { LoaderOptionsPlugin } = require( 'webpack' );
module.exports = {
  mode: 'development',
  bail: true,
  devtool: 'source-map',
  plugins: [
    new LoaderOptionsPlugin({
      debug: true
    })
  ]

}
