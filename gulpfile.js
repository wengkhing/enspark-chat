var gulp    = require('gulp');
var concat = require('gulp-concat');
var uglify  = require('gulp-uglify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var ngHtml2Js = require("gulp-ng-html2js");

gulp.task('scripts', function() {
  gulp.src(['./public/**/*.js', '!./public/**/*.test.js', '!./public/app.min.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('./app.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('dist'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));

  gulp.src(['./public/index.html'])
    .pipe(gulp.dest('dist'));

  gulp.src(['./public/component/**/*.view.html'])
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('dist/view'));

  gulp.src(['./public/directive/**/*.tpl.html'])
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('dist/tpl'));

});

gulp.task('watch', function() {
  watch([
    './public/**/*.js',
    '!./public/**/*.test.js',
    '!./public/app.min.js',
    './public/component/**/*.view.html',
    './public/directive/**/*.tpl.html'
  ], function () {
    gulp.start('scripts');
  });
});

gulp.task('default', ['scripts', 'watch']);