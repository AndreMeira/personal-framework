const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(config, {
    mode: 'production',
    output: {
        path: path.join(__dirname, 'public')
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                        ],
                    },
                },
            }),
        ],
    },
});