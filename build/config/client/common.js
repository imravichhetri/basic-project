const Path = require( 'path' );
const Webpack = require( 'webpack' );
const EslintFormatter = require( 'react-dev-utils/eslintFormatter' );
const GetCSSModuleLocalIdent = require( '@resuelve/react-dev-utils/getCSSModuleLocalIdent' );
const AutoPrefixer = require( 'autoprefixer' );
const SWPrecacheWebpackPlugin = require( 'sw-precache-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );
const CompressionPlugin = require( 'compression-webpack-plugin' );
const { ReactLoadablePlugin } = require( 'react-loadable/webpack' );
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: Path.join( process.cwd(), '/src/client/index.tsx' ),
  output: {
    pathinfo: true,
    path: Path.join( process.cwd(), 'dist/statics/' ),
    filename: 'js/index.js',
    chunkFilename: 'js/[name].js',
    publicPath: '/statics/'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      // First, run the linter.
     /* {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              formatter: EslintFormatter,
              eslintPath: require.resolve('eslint'),
              baseConfig: {
                extends: [
                  require.resolve('eslint-config-react-app')
                ],
              },
              ignore: false,
              useEslintrc: true,
            }
          }
        ],
        include: Path.join( process.cwd(), 'src' ),
        exclude: [/[/\\\\]node_modules[/\\\\]/]
      },*/
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve( 'tslint-loader' ),
            options: {
              tsConfigFile: 'tsconfig.json',
              failOnHint: false,
              typeCheck:true,
              fix: true
            }
          },
        ],
        include: Path.join( process.cwd(), 'src' ),
        exclude: [/[/\\\\]node_modules[/\\\\]/]
      },
      {
        oneOf: [
          {
            type: 'javascript/auto',
            test: /\.json$/,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: {
              loader: require.resolve( 'json-loader' )
            }
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
          },
          /*{
            test: /\.(js|jsx)$/,
            include: Path.join( process.cwd(), 'src' ),
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [
              {
                loader: require.resolve( 'thread-loader' )
              },
              {
                loader: require.resolve( 'babel-loader' ),
                options: {
                  babelrc: false,
                  presets: [
                    require.resolve( 'babel-preset-react-app' ),
                    require.resolve( 'babel-preset-env' )
                  ],
                  plugins: [
                    require.resolve( 'react-loadable/babel' ),
                    [
                      require.resolve( 'babel-plugin-import' ),
                      {  "libraryName": "antd", "libraryDirectory": "es", "style": "css" }
                    ],
                    require.resolve( 'babel-plugin-transform-class-properties' ),
                    require.resolve( 'babel-plugin-transform-decorators-legacy' ),
                    require.resolve( 'babel-plugin-transform-runtime' )
                  ],
                  cacheDirectory: true,
                  highlightCode: true
                }
              },
              {
                loader: require.resolve( 'import-glob' ),
              }
            ]
          },
          {
            test: /\.js$/,
            use: [
              {
                loader: require.resolve( 'thread-loader' )
              },
              {
                loader: require.resolve('babel-loader'),
                options: {
                  babelrc: false,
                  compact: false,
                  presets: [
                    require.resolve( 'babel-preset-react-app' )
                  ],
                  cacheDirectory: true,
                  highlightCode: true
                }
              }
            ]
          },*/
          { 
            enforce: "pre", 
            test: /\.js$/, 
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            include: Path.join( process.cwd(), 'src' ),
            loader: "source-map-loader" 
          },
          {
            test: /\.ts(x?)$/,
            include: Path.join( process.cwd(), 'src' ),
            enforce: 'pre',
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [
                    require.resolve( 'react-loadable/babel' ),
                    [
                      require.resolve( 'babel-plugin-import' ),
                      {  "libraryName": "antd", "libraryDirectory": "es", "style": "css" }
                    ],
                  ]                  
                }
              },
              {
                loader: 'import-glob'
              }
            ],
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  sourceMap: true
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => ( [
                    require('postcss-flexbugs-fixes'),
                    AutoPrefixer( {
                      flexbox: 'no-2009'
                    } )
                  ] ),
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.module\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  sourceMap: true,
                  modules: true,
                  getLocalIdent: GetCSSModuleLocalIdent
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => ( [
                    require('postcss-flexbugs-fixes'),
                    AutoPrefixer( {
                      flexbox: 'no-2009'
                    } )
                  ] ),
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.(scss|sass)$/,
            exclude: /\.module\.(scss|sass)$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: true
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => ( [
                    require('postcss-flexbugs-fixes'),
                    AutoPrefixer( {
                      flexbox: 'no-2009'
                    } )
                  ] ),
                  sourceMap: true
                }
              },
              {
                loader: require.resolve( 'sass-loader' ),
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.module\.(scss|sass)$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: true,
                  modules: true,
                  getLocalIdent: GetCSSModuleLocalIdent
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => ( [
                    require('postcss-flexbugs-fixes'),
                    AutoPrefixer( {
                      flexbox: 'no-2009'
                    } )
                  ] ),
                  sourceMap: true
                }
              },
              {
                loader: require.resolve( 'sass-loader' ),
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          {
            test: /\.(graphql|gql)$/,
            use: {
              loader: 'graphql-tag/loader'
            }
          },
          {
            exclude: /\.(js|jsx|graphql|gql|woff|woff2|ttf|eot)$/,
            use: {
              loader: 'file-loader',
              options: {
                outputPath: 'media/',
                publicPath: '/statics/media/',
                name: '[hash].[ext]'
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    // runtimeChunk: true,
    minimizer: [
      new UglifyJSPlugin(
        {
          sourceMap: true,
          cache: true,
          parallel: true,
          extractComments: 'all',
          uglifyOptions: {
            parse: {
              // ecma: 8
            },
            compress: {
              comparisons: false,
              unused: true,
              dead_code: true, // big one--strip code that will never execute
              warnings: false, // good for prod apps so users can't peek behind curtain
              drop_debugger: true,
              conditionals: true,
              evaluate: true,
              drop_console: true, // strips console statements
              sequences: true,
              booleans: true
            },
            mangle: true,
            output: {
              // ecma: 5,
              comments: false,
              ascii_only: true
            }
          }
        }
      ),
      new CompressionPlugin(
        {
          algorithm: 'gzip',
          test: /\.(js|css|html)$/
        }
      ),
      new OptimizeCSSAssetsPlugin( )
    ]
  },
  plugins: [
    new ReactLoadablePlugin(
      {
        filename: Path.join( process.cwd(), 'react-loadable.json' ),
      }
    ),
    new Webpack.DefinePlugin(
      {
        'process.env.RUN_ENV': JSON.stringify( process.env.RUN_ENV ),
        'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
      }
    ),
    new MiniCssExtractPlugin(
      {
        filename: 'css/index.css',
        chunkFilename: 'css/[name].css'
      }
    ),
    new SWPrecacheWebpackPlugin(
      {
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'js/service-worker.js',
        logger(message) {
          if (message.indexOf('Total precache size is') === 0) {
            // This message occurs for every build and is a bit too noisy.
            return;
          }
          if (message.indexOf('Skipping static resource') === 0) {
            // This message obscures real errors so we ignore it.
            // https://github.com/facebook/create-react-app/issues/2612
            return;
          }
          console.log(message);
        },
        stripPrefix: Path.join( process.cwd(), 'dist' ),
        minify: true,
        // Don't precache sourcemaps (they're large) and build asset manifest:
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    ),
    new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ForkTsCheckerWebpackPlugin(),
    new Webpack.LoaderOptionsPlugin( {
      options: {
        context: __dirname,
        tslint: {
          failOnHint: true
        }
      }
    } )
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  performance: false
};
