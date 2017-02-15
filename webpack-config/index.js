/**
 * Created by Exper1ence on 2016/12/26.
 */
const merge = require('webpack-merge');
const common = require('./common');
const build = require('./build');
const sourceMap = require('./sourceMap');

let config = common;
switch (process.env.npm_lifecycle_event) {
    case 'b':
        config = merge(config, build);
        break;
    case 's':
        config = merge(config, sourceMap);
        break;
}
module.exports = config;