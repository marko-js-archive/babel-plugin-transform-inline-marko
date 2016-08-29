'use strict';
var chai = require('chai');
var babel = require('babel-core');
chai.config.includeStack = true;
var path = require('path');
var autotest = require('./autotest');
var fs = require('fs');

var defaultOptions = {
    plugins:['transform-inline-marko']
}

describe('render', function() {
    var autoTestDir = path.join(__dirname, 'autotests');

    autotest.scanDir(
        autoTestDir,
        function run(dir, helpers, done) {
            var inputPath = path.join(dir, 'input.js');
            var mainPath = path.join(dir, 'test.js');

            var main = fs.existsSync(mainPath) ? require(mainPath) : {};
            var options = Object.assign({}, defaultOptions, main.options);

            if (main.checkError) {
                var e;

                try {
                    babel.transformFileSync(inputPath, options);
                } catch(_e) {
                    e = _e;
                    var errorFile = path.join(dir, 'error.txt');
                    fs.writeFileSync(errorFile, e.stack.toString(), { encoding: 'utf8' });
                }

                if (!e) {
                    throw new Error('Error expected');
                }

                main.checkError(e);
                return done();
            } else {
                var results = babel.transformFileSync(inputPath, options);
                helpers.compare(results.code, '.js');
                return done();
            }
        }
    );
});