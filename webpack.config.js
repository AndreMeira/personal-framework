const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


const IS_DEV = process.env.NODE_ENV !== 'production';
const dirApp = path.join(__dirname, 'app');
const dirStyles = path.join(__dirname, 'styles');
const dirAssets = path.join(__dirname, 'assets');
const dirShared = path.join(__dirname, 'shared');
const dirNode = 'node_modules';

module.exports = {
    entry: [ 
        path.join(dirApp, 'index.js'),
        path.join(dirStyles, 'index.scss')
    ], 
    resolve: {
        modules:[
            dirApp,
            dirStyles,
            dirAssets,
            dirShared,
            dirNode
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV
        }),
        new CopyWebpackPlugin({
            patterns:[{
                noErrorOnMissing: true,
                from: './shared',
                to: ''
            }]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new ESLintPlugin({})
    ], 
    module: { 
        rules:[{
            test:/\.js$/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test:/\.scss$/,
            use: [{
                loader:MiniCssExtractPlugin.loader,
                options: {
                    publicPath: ''
                }
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.(jpe?g|png|svg|webp|woff2?|fnt|gif)$/i,
            type: "asset",
        }, {
            test:/\.(jpe?g|png|svg|webp|woff2?|fnt|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: file => "[name].[hash].[ext]" 
                }
            }]
        }, {
            test: /\.(glsl|frag|vert)$/i,
            loader: "raw-loader",
            exclude: /node_modules/
        }, {
            test: /\.(glsl|frag|vert)$/i,
            loader: "glslify-loader",
            exclude: /node_modules/
        },] 
     }
};