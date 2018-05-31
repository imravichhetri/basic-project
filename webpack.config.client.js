const Path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const isDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'stage'
console.log(process.env.NODE_ENV, 'process.env')
module.exports = {
  target: 'web',
  mode: process.env.NODE_ENV,
  entry: './src/client/index.js',
  devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',
  output: {
    path: Path.join(__dirname, 'build/client'),
    filename: 'bundle.js',
    chunkFilename: '[hash].[id].js',
    publicPath: '/statics/'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({parallel: true,
        sourceMap: true,
        extractComments: true,
        uglifyOptions: {
          compress: true,
          mangle: {
            keep_fnames: true
          }
        }})
    ]
  },
  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,

        use: [
          // apply multiple loaders and options
          'htmllint-loader',
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          /* {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          }, */
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true,
              outputPath: '/statics/css/',
              publicPath: '/statics/css/'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: Path.resolve(__dirname, '../postcss.config.js')
              },
              outputPath: '/statics/css/',
              publicPath: '/statics/css/'
            }
          }
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     sourceMap: true
          //   }
          // }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: '/images/',
              publicPath: '/statics/images/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
            publicPath: '/statics/fonts/',
            name: '[name].[ext]'
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: Path.join(__dirname, 'build/client'),
    // hot: true,
    /* proxy: {
      '/statics': {
        target: 'http://localhost:4000',
        pathRewrite: {'^/statics': ''}
      }
    }, */
    // compress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 4001
  },
  //  performance: {
  //   hints: 'warning', // enum
  //   maxAssetSize: 200000, // int (in bytes),
  //   maxEntrypointSize: 400000, // int (in bytes)
  //   assetFilter: function (assetFilename) {
  //     // Function predicate that provides asset filenames
  //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
  //   }
  // },
  plugins: [
    new MiniCssExtractPlugin(
      {
        filename: 'css/index.css',
        chunkFilename: '[name].[chunkhash].css'
      }
    ),
    new webpack.DefinePlugin({
      'process.env.RUN_ENV': JSON.stringify(process.env.RUN_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new CompressionPlugin({
      test: /\.js/
    })
  ]
}

/* var debug = process.env.NODE_ENV !== 'production'
// var webpack = require('webpack');

module.exports = {
  mode: 'production',
  context: __dirname,
  target: 'web',
  resolve: { extensions: ['.jsx', '.js', '.json'] },
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './src/client/index.js',
  output: {
    path: Path.join(__dirname, '/build/client'),
    filename: 'client.min.js'
  },
  plugins: debug ? [] : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isDev ? 'development' : (process.env.NODE_ENV === 'production' ? 'production' : 'stage'))
      }
    })
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
}
*/
