const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    devtool: 'inline-source-map',
    entry: './public/js/entry.js',
    watch: true,
    output: {
        filename: './public/js/bundle.js',
        sourceMapFilename: './public/js/bundle.js.map'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
       // new UglifyJsPlugin()
    ]
};
