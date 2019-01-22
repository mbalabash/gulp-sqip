"use strict";

const path = require("path");
const through = require("through2");
const PluginError = require("gulp-util").PluginError;
const gutil = require("gulp-util");
const sqip = require("sqip");
const PLUGIN_NAME = "gulp-sqip";

/**
 * @this {Transform}
 */
module.exports = (options = { numberOfPrimitives: 22 }) => {
  const placeholders = [];

  const transform = function(file, encoding, callback) {
    if (file.isNull()) return callback(null, file);
    if (file.isStream())
      this.emit(
        "error",
        new PluginError(PLUGIN_NAME, "Streams not supported!")
      );
    if (file.isBuffer()) {
      const { numberOfPrimitives } = options;
      const svg = sqip({
        filename: file.history[0],
        numberOfPrimitives
      });
      svg.path = `${path.parse(path.basename(file.history[0])).name}.svg`;
      placeholders.push(svg);
      callback();
    }
  };

  const endStreem = function(callback) {
    placeholders.forEach(svg => {
      this.push(
        new gutil.File({
          path: svg.path,
          contents: new Buffer(String(svg.final_svg))
        })
      );
    });
    callback();
  };

  return through.obj(transform, endStreem);
};
