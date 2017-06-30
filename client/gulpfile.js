/* jshint esversion:6, node:true */

const gulp       = require('gulp'),
      browserify = require('browserify'),
      babelify   = require('babelify'),
      source     = require('vinyl-source-stream');

gulp.task('js', () => {
    return browserify('./src/js/main.js')
        .transform(babelify, {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['js']);

gulp.task('watch', () => {
    return gulp.watch('./src/**/*.js', ['default']);
});
