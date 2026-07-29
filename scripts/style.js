'use strict';
var config = require('./config');
var fs = require('graceful-fs');
var path = require('path');
var mkdirp = require('mkdirp');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var sass = require('sass');
var glob = require('glob');
var sassPrefix = postcss([autoprefixer({ overrideBrowserslist: ['last 2 versions', 'Chrome >= 42', 'Firefox >= 37', 'iOS >= 7', 'Safari >= 5', 'Explorer >= 9'] })]);
var running = false;
var sassOutput = path.basename(config.style).replace('.scss', '.css');
var srcMapReg = new RegExp('\\/\\*# ?sourceMappingURL.+\\*\\/','g');

if (config.NODE_ENV === 'production') {
  sassOutput = config.stylesheet;
}

function expandGlobImports(data, styleFile) {
  var styleDir = path.dirname(styleFile);
  return data.replace(/@import\s+["']([^"']*\*\*?[^"']*)["']\s*;/g, function (match, pattern) {
    var absPattern = path.resolve(styleDir, pattern);
    var files = glob.sync(absPattern).sort();
    if (!files.length) {
      console.log('\x1b[33m warning: no files matched ' + pattern + '\x1b[0m');
      return '';
    }
    return files.map(function (file) {
      var rel = path.relative(styleDir, file).replace(/\\/g, '/');
      if (rel[0] !== '.') rel = './' + rel;
      return '@import "' + rel + '";';
    }).join('\n');
  });
}

var createSass = function (callback) {
  if (running) return;
  running = true;
  fs.readFile(config.style, 'UTF-8', function (err, data) {
    if (!err) {
      mkdirp(path.basename(config.output), function (err) {
        if (!err) {
          data = createModifyVars({
            ASSET_PATH: config.ASSET_PATH
          }) + expandGlobImports(data, config.style);
          try {
            var result = sass.renderSync({
              data: data,
              file: config.style,
              includePaths: [path.dirname(config.style)],
              outFile: path.join(config.output, sassOutput),
              outputStyle: 'compressed',
              sourceMap: true,
              silenceDeprecations: ['legacy-js-api', 'import']
            });
            var css = result.css.toString();
            var srcMap = srcMapReg.exec(css);
            sassPrefix.process(css, { from: undefined }).then(function(output) {
              fs.writeFile(path.join(config.output, sassOutput), output.css + ((srcMap && srcMap[0]) ? '\n'+srcMap[0] : ''), function (err) {
                console.log((err) ? '\x1b[31m cannot write css file.\x1b[0m' : '\x1b[32m successfully wrote css file.\x1b[0m');
                running = false;
                if (callback) callback(null);
              });
            },function(err) {
              console.log('\x1b[31m cannot process css file.\x1b[0m', err);
              running = false;
              if (callback) callback(err);
            });
            if (result.map) {
              fs.writeFile(path.join(config.output, sassOutput + '.map'), result.map, function (err) {
                console.log((err) ? '\x1b[31m cannot write css map file.\x1b[0m' : '\x1b[32m successfully wrote css map file.\x1b[0m');
              });
            }
          } catch (sassErr) {
            console.log('\x1b[31m sass error:\x1b[0m', sassErr.message || sassErr);
            running = false;
            if (callback) callback(sassErr);
          }
        }
      });
    }
  });
};
function createModifyVars(vars) {
  var str = '';
  Object.keys(vars).map(function (cur) {
    str += '$' + cur + ':\'' + vars[cur] + '\';';
  });
  return (str != '') ? str+'\n' : '';
}
if (!module.parent) {
  createSass();
} else {
  module.exports = createSass;
}
