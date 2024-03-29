const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        devMiddleware: {
            index: true,
            // mimeTypes: { phtml: 'text/html' },
            // publicPath: '/publicPathForDevServe',
            // serverSideRender: true,
            writeToDisk: true,
          },
    },
    output: {
        path: path.resolve(__dirname, 'public')
    }
});