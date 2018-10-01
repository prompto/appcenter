var path = require('path');

module.exports = {
    entry: './widgets.js',
    output: {
        filename: '../CodeFactory/src/main/web/js/lib/factory-widgets.js',
        library: ["widgets"],
        libraryTarget: 'umd'
    },
    node: {
        module: "empty",
        net: "empty",
        fs: "empty"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        // fallback: '/usr/local/lib/node_modules'
    },
    resolveLoader: {
        // fallback: '/usr/local/lib/node_modules'
    }
};