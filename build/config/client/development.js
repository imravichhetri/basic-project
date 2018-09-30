const { LoaderOptionsPlugin } = require( 'webpack' );
module.exports = {
  mode: 'development',
  bail: true,
  devtool: 'source-map',
  plugins: [
    new LoaderOptionsPlugin({
      debug: true
    })
  ],
  devServer: {
    overlay: true,
    noInfo: true,
    inline: true,
    port: 3001,
    disableHostCheck: true
  }
}