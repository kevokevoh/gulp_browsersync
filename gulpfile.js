var gulp = require('gulp');
require('gulp-load-plugins')();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var gplumber = require('gulp-plumber');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');
browserSync = require("browser-sync").create();

var errorHandler = function(){
    // default appearance
    return gplumber(function(error){
        // add indentation
        var msg = error.codeFrame.replace(/\n/g, '\n    ');
        gutil.log('|- ' + 'Build Error in ' + error.plugin);
        gutil.log('|- ' + error.message);
        gutil.log('|- ' + '>>>');
        gutil.log('|\n    ' + msg + '\n           |');
        gutil.log('|- ' + '<<<');
    });
};

var customOpts = {
  entries: ['./app/src/js/main.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// presets for es2015
b.transform('babelify', { presets: ['es2015'] });
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('compiled.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./app/src/js'));
}
gulp.task('browserify', bundle);

//Concatenate scripts
gulp.task('scripts', function() {
  return gulp.src([
      'app/src/js/compiled.js',
      'app/src/js/custom.js',
  ])
    .pipe(errorHandler())
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/dist/js/'));
});

//Watch for changes
gulp.task('watch', function() {
    gulp.watch('app/src/js/**', ['scripts']);
});
// Browsersync: Watch and Reload Browser
// use default task to launch Browsersync and watch JS files
gulp.task('serve', function () {

    browserSync.init({
        server: "./"
    });
    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(['*.html','app/dist/js/**']).on('change', browserSync.reload);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browserify','scripts','watch']);


