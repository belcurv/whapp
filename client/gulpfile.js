/* jshint esversion:6, node:true */

const gulp       = require('gulp'),
      browserify = require('browserify'),
      babelify   = require('babelify'),
      buffer     = require('vinyl-buffer'),
      sourcemaps = require('gulp-sourcemaps'),
      source     = require('vinyl-source-stream');

gulp.task('js', () => {
    return browserify({
            entries: './src/js/main.js',
            debug: true
        })
        .transform(babelify, {
            presets: ['es2015']
        })
        .bundle()
        .on('error', function(err) { console.log(err); this.emit('end'); })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['js']);

gulp.task('watch', () => {
    return gulp.watch('./src/**/*.js', ['default']);
});
