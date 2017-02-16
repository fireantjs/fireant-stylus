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
        disabled: false,
        compatibility: 'ie9',
        keepBreaks: false,
        keepSpecialComments: 0,
        mediaMerging: true,
        sourceMap: false
    },
    autoprefixer: {
        disabled: false,
        browsers: ['last 3 versions', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
    }
};

// Stylus
module.exports = function(file) {
    // Minify options
    if (typeof global.options !== 'undefined' &&
        typeof global.options.stylus !== 'undefined' &&
        typeof global.options.stylus.minify !== 'undefined'
    ) {
        options.minify = global.options.stylus.minify;
    }

    // Autoprefixer options
    if (typeof global.options  !== 'undefined' &&
        typeof global.options.stylus  !== 'undefined' &&
        typeof global.options.stylus.autoprefixer
    ) {
        options.autoprefixer = global.options.stylus.autoprefixer;
    }

    var folder = file.split('/').slice(0, -1).join('/'),
        source,
        css;

    // Assign source
    if (file) {
        source = fs.readFileSync(file).toString();
    } else {
        source = this.toString();
    }

    // Run Stylus
    var inst;

    if (typeof options.autoprefixer.disabled !== 'undefined' && options.autoprefixer.disabled) {
        inst = stylus(source);
    } else {
        inst = stylus(source).use(autoprefixer(options.autoprefixer));
    }

    inst.include(folder).
        render(function(err, source) {
            if (err) {
                console.log(timestamp(), chalk.yellow.bold('-------------- ERROR --------------'));
                console.log(timestamp(), chalk.red(err.message));
                return false;
            } else {
                if (typeof options.minify.disabled !== 'undefined' && options.minify.disabled) {
                    css = source;
                } else {
                    var output = new minifycss(options.minify).minify(source);
                    css = output.styles;
                }
            }
        }
    );

    return css;
};
