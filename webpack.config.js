module.exports = {
    devtool: 'inline-source-map',
    entry: './public/js/entry.js',
    watch: true,
    output: {
        filename: './public/js/bundle.js',
        sourceMapFilename: './public/js/bundle.js.map'
    }
};
