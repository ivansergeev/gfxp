
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const WrapperPlugin = require('wrapper-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
// const isDev = true;
const isProd = process.env.NODE_ENV === 'production';
const filename = ext => isDev? `[name].${ext}`: `[name].[hash].${ext}}`;

const cssLoader = () => {
	return [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hrm: isDev,
				sourceMap: isDev,
				reloadAll: true
			}
		},
		{
			loader: "css-loader",
			options: {
				modules: false,
				sourceMap: true
			}
		},
		'sass-loader',
	];
};
const jsLoaders = () => {

	const loaders = [{
		loader: 'babel-loader',
			options:{
				presets: ['@babel/preset-env'],
				plugins: ['@babel/plugin-proposal-class-properties']
			}
	}];

	if(isDev){
		loaders.push({
			loader: 'eslint-loader',
			options: {
				cache: true,
				"parserOptions": {
					"sourceType": "module",
					"allowImportExportEverywhere": true
				},
			},
		});
	}

	return loaders;
};

const plugins = () => {
	const base = [
		
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new WrapperPlugin({
			test: /\.js$/,
			header: '(function () { \'use strict\';\n',
			footer: '\n})();'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			dev:{
				start: isDev? '<!--':'',
				end: isDev? '-->':'',
			},
			minify: {
				collapseWhitespace: isProd,
			},
			cache: false,
		}),
		
		new CleanWebpackPlugin(),

		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, 'src/images/favicon.png'),
				to: path.resolve(__dirname, 'dist/images/')
			},{
				from: path.resolve(__dirname, 'src/images/patterns/'),
				to: path.resolve(__dirname, 'dist/images/patterns/')
			}]
		}),
		
		new HTMLInlineCSSWebpackPlugin({
			replace: {
				removeTarget: true,
				target: '<!-- InlineCSS -->',
			},
		}),

		new ScriptExtHtmlWebpackPlugin({
			inline: 'js/app.bundle.js'
		}),
	];

	// if(isProd) base.push(new BundleAnalyzerPlugin())

	return base;
};

const optimization = () => {
	const config = {
		splitChunks: {
			name: 'all'
		}
	};

	if(isProd){
		config.minimizer = [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config;
}

module.exports = {

	context: path.resolve(__dirname, 'src'),
	mode: 'development',

	entry: {
		main: ['@babel/polyfill','./js/index.js', './css/app.sass'],
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/app.bundle.js',
		publicPath: '/',
	},
	
	optimization: optimization(),

	devServer: {
		compress: false,
		port: 4200,
		inline: true,
		hot: isDev,
		historyApiFallback: true,
	},

	devtool: isDev? 'inline-source-map':'',

	plugins: plugins(),

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			},
			{
				test: /\.(css|sass)$/,
				use: cssLoader()
			},
		],
	}
};