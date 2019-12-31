const path = require('path')

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: './public/js/entry.js',
    output: {
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map',
        path: path.resolve(__dirname, 'public/js'),
    }
};
