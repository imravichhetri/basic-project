const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const isDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'stage'
const nodeModules = {}
fs
  .readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/server/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build/server'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        enforce: 'pre', // preload the babel loader
        exclude: /node_modules/, // exclude any abeland all files in the node_modules folder
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.js$/, // include .js files
        enforce: 'pre', // preload the babel loader
        exclude: /node_modules/, // exclude any abeland all files in the node_modules folder
        use: [
          {
            loader: 'import-glob'
          }
        ]
      }
    ]
  },
  externals: nodeModules,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.RUN_ENV': JSON.stringify(process.env.RUN_ENV)
    }),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.HotModuleReplacementPlugin({ quiet: true })
    // new webpack.BannerPlugin('require("source-map-support").install();',{ raw: true, entryOnly: false })
  ],
  devtool: isDev ? 'cheap-module-source-map' : 'source-map'
}
