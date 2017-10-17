'use strict';

const through = require('through2');
const PluginError = require('gulp-util').PluginError;
const gutil = require('gulp-util');
const sqip = require('sqip');
const PLUGIN_NAME = 'gulp-sqip';

module.exports = (options) => {
    /**
     * @this {Transform}
     */

    const placeholders = [];

    const transform = function(file, encoding, callback) {
        if (file.isNull()) return callback(null, file);
        if (file.isStream()) this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        if (file.isBuffer()) {
            const svg = sqip({
                filename: file.history[0],
                numberOfPrimitives: (options !== undefined && typeof options.numberOfPrimitives === 'number') ? options.numberOfPrimitives : 22
            });
            svg.path = getFilenameFromPath(file.history[0]) + '.svg';
            placeholders.push(svg);
            callback();
        }
    };

    const endStreem = function(callback) {
        placeholders.forEach(svg => {
            this.push(new gutil.File({
                path: svg.path,
                contents: new Buffer(String(svg.final_svg))
            }));
        });
        callback();
    };

    const getFilenameFromPath = (path) => {
        return path.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "");
    };

    return through.obj(transform, endStreem);
};