const {entry, output,}=require('./PATHS');
const webpack = require('webpack');
const Path = require('path');
module.exports = {
    target: 'node',
    entry: {
        'douyu-core': entry,
        '../test/test': Path.resolve(__dirname, '../test/test2.js'),
    },
    output: {
        path: output.path,
        filename: '[name].js',
        library: 'douyuCore',
        libraryTarget:'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
            }
        ]
    },
};