const Path = require( "path" );
const Webpack = require( "webpack" );
const NodeExternals = require( "webpack-node-externals" );
const EslintFormatter = require( "react-dev-utils/eslintFormatter" );
const PrettierPlugin = require( "prettier-webpack-plugin" );
const GetCSSModuleLocalIdent = require( "@resuelve/react-dev-utils/getCSSModuleLocalIdent" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const LodashModuleReplacementPlugin = require( "lodash-webpack-plugin" );
const TerserPlugin = require( "terser-webpack-plugin" );

module.exports = {
	target: "node",
	entry: Path.join( process.cwd(), "/src/server/index.js" ),
	output: {
		path: Path.join( process.cwd(), "dist" ),
		filename: "server.js",
		publicPath: "/"
	},
	externals: [
		NodeExternals()
	],
	resolve: {
		extensions: [ ".jsx", ".js" ]
	},
	module: {
		rules: [
			// First, run the linter.
			{
				test: /\.(js|jsx)$/,
				enforce: "pre",
				use: [
					{
						loader: require.resolve( "eslint-loader" ),
						options: {
							formatter: EslintFormatter,
							eslintPath: require.resolve( "eslint" ),
							baseConfig: {
								extends: [
								]
							},
							ignore: true,
							useEslintrc: true
						}
					}
				],
				include: Path.join( process.cwd(), "src" ),
				exclude: [ /[/\\\\]node_modules[/\\\\]/ ]
			},
			{
				oneOf: [
					{
						type: "javascript/auto",
						test: /\.(json)$/,
						exclude: [ /[/\\\\]node_modules[/\\\\]/ ],
						use: [ {
							loader: "file-loader",
							options: {
								outputPath: "private/",
								name: "[name].[hash:8].[ext]"
							}
						} ]
					},
					{
						test: /\.(graphql|gql)$/,
						use: {
							loader: "graphql-tag/loader"
						}
					},
					{
						test: /\.(woff|woff2|ttf|eot)$/,
						use: {
							loader: "file-loader",
							options: {
								outputPath: "fonts/",
								publicPath: "/statics/fonts/",
								name: "[name].[ext]"
							}
						}
					},
					{
						test: /\.css$/,
						use: [
							require.resolve( "css-loader" )
						]
					},
					{
						test: /\.module\.(less)$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: require.resolve( "css-loader" ),
								options: {
									importLoaders: 2,
									sourceMap: true,
									modules: true,
									getLocalIdent: GetCSSModuleLocalIdent
								}
							},
							{
								loader: require.resolve( "postcss-loader" ),
								options: {
									ident: "postcss",
									plugins: () => ( [
										require( "postcss-flexbugs-fixes" ),
										AutoPrefixer( {
											flexbox: "no-2009"
										} )
									] ),
									sourceMap: true
								}
							},
							{
								loader: require.resolve( "less-loader" ),
								options: {
									sourceMap: true
								}
							}
						]
					},
					{
						test: /\.(js|jsx)/,
						include: Path.join( process.cwd(), "src" ),
						exclude: [ /[/\\\\]node_modules[/\\\\]/ ],
						use: [
							{
								loader: require.resolve( "thread-loader" )
							},
							{
								loader: require.resolve( "babel-loader" ),
								options: {
									babelrc: false,
									presets: [
										require.resolve( "@babel/preset-react" ),
										require.resolve( "@babel/preset-env" )
									],
									plugins: [
										require.resolve( "react-loadable/babel" ),
										/*require.resolve( 'babel-plugin-dynamic-import-node' ),
                    require.resolve( 'babel-plugin-transform-class-properties' ),
                    require.resolve( 'babel-plugin-transform-decorators-legacy' ),
                    require.resolve( 'babel-plugin-transform-runtime' )*/
										[ "@babel/plugin-proposal-decorators", { "legacy": true } ],
										"@babel/plugin-syntax-dynamic-import",
										"@babel/plugin-proposal-class-properties",
										"@babel/plugin-proposal-export-default-from",
										"@babel/plugin-proposal-export-namespace-from",
										"@babel/plugin-transform-runtime"
									],
									cacheDirectory: true,
									highlightCode: true
								}
							},
							{
								loader: require.resolve( "import-glob" )
							}
						]
					},
					{
						exclude: /\.(js|jsx|graphql|gql|woff|woff2|ttf|eot)$/,
						use: {
							loader: "file-loader",
							options: {
								outputPath: "statics/media/",
								publicPath: "/statics/media/",
								name: "[hash].[ext]"
							}
						}
					}
				]
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserPlugin( {
				terserOptions: {
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {},
					mangle: true, // Note `mangle.properties` is `false` by default.
					module: false,
					output: null,
					toplevel: false,
					nameCache: null,
					ie8: false,
					keep_classnames: undefined,
					keep_fnames: false,
					safari10: false
				}
			} )
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
				"process.env.RUN_ENV": JSON.stringify( process.env.RUN_ENV ),
				"process.env.NODE_ENV": JSON.stringify( process.env.NODE_ENV )
			}
		),
		new LodashModuleReplacementPlugin()
		// new ForkTsCheckerWebpackPlugin()
	]
};
