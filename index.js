/**
 * @todo Make alternative Stylus option without autoprefixer if someone wants to use a plugin within task
 */

var stylus = require('stylus');
var autoprefixer = require('autoprefixer-stylus');
var minifycss = require('clean-css');
var chalk = require('chalk');
var timestamp = require('./lib/timestamp');
var global = require('global');
var fs = require('fs');

// Default minify options
var options = {
    minify: {
        enabled: true,
        compatibility: 'ie9',
        keepBreaks: false,
        keepSpecialComments: 0,
        mediaMerging: true,
        sourceMap: false
    },
    autoprefixer: {
        browsers: ['last 3 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }
};

// Stylus
module.exports = function(file) {
    // Minify options
    if (global.options.stylus.minify) {
        options.minify = global.options.stylus.minify;
    }

    // Autoprefixer options
    if (global.options.stylus.autoprefixer) {
        options.autoprefixer = global.options.stylus.autoprefixer;
    }

    var folder = file.split('/').slice(0, -1).join('/'),
        source,
        css;

    // Assign source
    if (file) {
        source = fs.readFileSync(file).toString();
    } else {
        source = this.stdout || this.toString();
    }

    // Run Stylus
    stylus(source, options).
        use(autoprefixer(options.autoprefixer)).
        include(folder).
        render(function(err, source) {
            if (err) {
                console.log(timestamp(), chalk.yellow.bold('-------------- ERROR IN ' + to + ' --------------'));
                console.log(timestamp(), chalk.red(err.message));
                return false;
            } else {
                if (options.minify.enabled) {
                    var output = new minifycss(options.minify).minify(source);
                    css = output.styles;
                } else {
                    css = source;
                }
            }
        }
    );

    return css;
};
