# fireant-stylus

Stylus plugin for [Fireant](https://github.com/fireantjs/fireant)

## Installation

```shell
npm install -D fireant-stylus
```

## Sample fireantfile.js

```javascript
var fireant = require("fireant");
var stylus = require("fireant-stylus");

fireant.task("watch", function() {
   fireant.watch("css/*.styl", function(file) {
      stylus("css/index.styl").save("html/css/styles.css");
   });
});
```

## Sample fireantfile.js, with options

```javascript
var fireant = require("fireant");
var stylus = require("fireant-stylus");
var global = require("global");

stylus: {
   minify: {
      disabled: false, // set true to disable minify (uses clean-css)
      compatibility: "ie9",
      keepBreaks: false,
      keepSpecialComments: 0,
      mediaMerging: true,
      sourceMap: false
   },
   autoprefixer: {
      disabled: false, // set true to disable autoprefixer
      browsers: ["last 2 versions"]
   }
};

fireant.task("watch", function() {
   fireant.watch("css/*.styl", function(file) {
      stylus("css/index.styl").save("html/css/styles.css");
   });
});
```