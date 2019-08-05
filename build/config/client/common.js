const Path = require( "path" );
const Webpack = require( "webpack" );
const EslintFormatter = require( "react-dev-utils/eslintFormatter" );
const GetCSSModuleLocalIdent = require( "@resuelve/react-dev-utils/getCSSModuleLocalIdent" );
const AutoPrefixer = require( "autoprefixer" );
const SWPrecacheWebpackPlugin = require( "sw-precache-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const OptimizeCSSAssetsPlugin = require( "optimize-css-assets-webpack-plugin" );
const UglifyJSPlugin = require( "uglifyjs-webpack-plugin" );
const CompressionPlugin = require( "compression-webpack-plugin" );
const { ReactLoadablePlugin } = require( "react-loadable/webpack" );
const LodashModuleReplacementPlugin = require( "lodash-webpack-plugin" );
const Fs = require( "fs" );
const LessToJs = require( "less-vars-to-js" );
const TerserPlugin = require( "terser-webpack-plugin" );

// const themeVariables = LessToJs(Fs.readFileSync(Path.join(process.cwd(), "/src/client/ant-theme-vars.less"), "utf8"));

module.exports = {
	target: "web",
	entry: Path.join( process.cwd(), "/src/client/index.jsx" ),
	output: {
		pathinfo: true,
		path: Path.join( process.cwd(), "dist/statics/" ),
		filename: "js/index.js",
		chunkFilename: "js/[name].js",
		publicPath: "/statics/"
	},
	resolve: {
		extensions: [ ".jsx", ".js" ]
	},
	module: {
		strictExportPresence: true,
		rules: [
			{ parser: { requireEnsure: false } },
			{
				oneOf: [
					{
						type: "javascript/auto",
						test: /\.json$/,
						exclude: [ /[/\\\\]node_modules[/\\\\]/ ],
						use: {
							loader: require.resolve( "json-loader" )
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
						test: /\.js(x?)$/,
						exclude: [ /[/\\\\]node_modules[/\\\\]/ ],
						include: Path.join( process.cwd(), "src" ),
						use: [
							{
								loader: require.resolve( "thread-loader" )
							},
							{
								loader: "babel-loader",
								options: {
									babelrc: false,
									presets: [
										require.resolve( "@babel/preset-react" ),
										require.resolve( "@babel/preset-env" )
									],
									plugins: [
										require.resolve( "react-loadable/babel" ),
										[
											require.resolve( "babel-plugin-import" ),
											{ "libraryName": "antd", "libraryDirectory": "es", "style": true }
										],
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
								loader: "import-glob"
							}
						]
					},
					{
						test: /\.css$/,
						exclude: /\.module\.css$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: require.resolve( "css-loader" ),
								options: {
									importLoaders: 1,
									sourceMap: true
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
							}
						]
					},
					{
						test: /\.less$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: require.resolve( "css-loader" ),
								options: {
									importLoaders: 2,
									sourceMap: true
									/*modules: true,
                  getLocalIdent: GetCSSModuleLocalIdent*/
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
							}/* 
              {
                loader: require.resolve("less-loader"),
                options: {
                  modifyVars: themeVariables,
                  javascriptEnabled: true
                }
              } */
						]
					},
					{
						test: /\.module\.css$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: require.resolve( "css-loader" ),
								options: {
									importLoaders: 1,
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
							}
						]
					},
					{
						test: /\.(scss|sass)$/,
						exclude: /\.module\.(scss|sass)$/,
						use: [
							MiniCssExtractPlugin.loader,
							{
								loader: require.resolve( "css-loader" ),
								options: {
									importLoaders: 2,
									sourceMap: true
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
								loader: require.resolve( "sass-loader" ),
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
								loader: require.resolve( "sass-loader" ),
								options: {
									sourceMap: true
								}
							}
						]
					},
					{
						test: /\.(graphql|gql)$/,
						use: {
							loader: "graphql-tag/loader"
						}
					},
					{
						exclude: /\.(js|jsx|graphql|gql|woff|woff2|ttf|eot|mjs)$/,
						use: {
							loader: "file-loader",
							options: {
								outputPath: "media/",
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
		splitChunks: {
			chunks: "all",
			name: "vendors"
		},
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
			} ),
			new CompressionPlugin(
				{
					algorithm: "gzip",
					test: /\.(js|html)$/
				}
			),
			new OptimizeCSSAssetsPlugin()
		]
	},
	plugins: [
		new ReactLoadablePlugin(
			{
				filename: Path.join( process.cwd(), "react-loadable.json" )
			}
		),
		new Webpack.DefinePlugin(
			{
				"process.env.RUN_ENV": JSON.stringify( process.env.RUN_ENV ),
				"process.env.NODE_ENV": JSON.stringify( process.env.NODE_ENV )
			}
		),
		new MiniCssExtractPlugin(
			{
				filename: "css/index.css",
				chunkFilename: "css/[name].css"
			}
		),
		new SWPrecacheWebpackPlugin(
			{
				dontCacheBustUrlsMatching: /\.\w{8}\./,
				filename: "js/service-worker.js",
				logger ( message ) {
					if ( message.indexOf( "Total precache size is" ) === 0 ) {
						// This message occurs for every build and is a bit too noisy.
						return;
					}
					if ( message.indexOf( "Skipping static resource" ) === 0 ) {
						// This message obscures real errors so we ignore it.
						// https://github.com/facebook/create-react-app/issues/2612
						return;
					}
					console.log( message );
				},
				stripPrefix: Path.join( process.cwd(), "dist" ),
				minify: true,
				// Don't precache sourcemaps (they're large) and build asset manifest:
				staticFileGlobsIgnorePatterns: [ /\.map$/, /asset-manifest\.json$/ ]
			}
		),
		new Webpack.IgnorePlugin( /^\.\/locale$/, /moment$/ ),
		/*new ForkTsCheckerWebpackPlugin(),*/
		new LodashModuleReplacementPlugin()
	],
	node: {
		dgram: "empty",
		fs: "empty",
		net: "empty",
		tls: "empty",
		child_process: "empty"
	},
	performance: false
};
