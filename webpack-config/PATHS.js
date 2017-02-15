const Path = require('path');
module.exports = {
    entry: Path.resolve(__dirname, '../src/index.js'),
    output: {
        path: Path.resolve(__dirname, '../dist'),
        filename: 'douyu-core.js',
    },
};