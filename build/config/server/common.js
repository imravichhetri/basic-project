const Path = require( 'path' );
const Webpack = require( 'webpack' );
const NodeExternals = require( 'webpack-node-externals' );
const EslintFormatter = require( 'react-dev-utils/eslintFormatter' );
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");
module.exports = {
  target: 'node',
  entry: Path.join( process.cwd(), '/src/server/index.ts' ),
  output: {
    path: Path.join( process.cwd(), 'dist' ),
    filename: 'server.js',
    publicPath: '/'
  },
  externals: [
    NodeExternals()
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
      // First, run the linter.
      {
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
      },
      {
        oneOf: [
          {
            type: 'javascript/auto',
            test: /\.(json)$/,
            exclude: [/[/\\\\]node_modules[/\\\\]/],
            use: [{
              loader: 'file-loader',
              options: {
                outputPath: 'private/',
                name: '[name].[hash:8].[ext]'
              }
            }]
          },
          {
            test: /\.(graphql|gql)$/,
            use: {
              loader: 'graphql-tag/loader'
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
          {
            test: /\.css$/,
            use: [
              require.resolve( 'css-loader' )
            ]
          },
          {
            test: /\.(js|jsx)/,
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
                    require.resolve( 'babel-plugin-dynamic-import-node' ),
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
            test: /\.ts?$/,
            enforce: 'pre',
            use: [
              {
                loader: 'ts-loader'
              },
              {
                 loader: require.resolve( 'tslint-loader' ),
                 options: {
                  tsConfigFile: 'tsconfig.json',
                  failOnHint: false,
                  typeCheck:true,
                  fix: true
                 }
              },
              {
                loader: 'import-glob'
              }
            ],
            exclude: /node_modules/
          },
          {
            exclude: /\.(js|jsx|graphql|gql|woff|woff2|ttf|eot)$/,
            use: {
              loader: 'file-loader',
              options: {
                outputPath: 'statics/media/',
                publicPath: '/statics/media/',
                name: '[hash].[ext]'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [  
    /*new PrettierPlugin( {
      tabWidth: 2,                  // Specify the number of spaces per indentation-level.
      useTabs: true,               // Indent lines with tabs instead of spaces.
      semi: true,                   // Print semicolons at the ends of statements.
      encoding: 'utf-8',            // Which encoding scheme to use on files
      extensions: [ ".js", ".ts", ".jsx", ".tsx" ]  // Which file extensions to process
    } ),*/
    new Webpack.DefinePlugin(
      {
        'process.env.RUN_ENV': JSON.stringify( process.env.RUN_ENV ),
        'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
      }
    ),
    new Webpack.LoaderOptionsPlugin( {
      options: {
        context: __dirname,
        tslint: {
          failOnHint: true
        }
      }
    } )
    // new ForkTsCheckerWebpackPlugin()
  ]
};
