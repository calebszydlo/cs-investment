var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    gulpif = require('gulp-if'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    bourbon = require('bourbon').includePaths,
    neat = require('bourbon-neat').includePaths;

// source files
var input_sass_style = './src/stylesheets/style.scss',
    input_sass_components = './src/stylesheets/**/*.scss',
    input_js = './src/javascript/**/*.js';
// destination files
var dist_sass = './dist/css',
    dist_js = './dist/js';

// ***** TASKS ***** //

// compilers

gulp.task('sass', function() {
  return gulp
    .src(input_sass_style)
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'sass',
      includePaths: [bourbon, neat],
      outputStyle: 'nested'
    })
    .on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(dist_sass))
    .pipe(connect.reload());
});

gulp.task('production', function() {
  return gulp
    .src(input_sass_style)
    .pipe(sass({
      style: 'compressed'
      })
      .on('error', sass.logError))
    .pipe(gulp.dest(dist_sass));
});

gulp.task('scripts', function() {
  return gulp
    .src(input_js)
    .pipe(concat('compiled.js'))
    .pipe(gulp.dest(dist_js));
});

// watchers

gulp.task('watch-sass-components', function() {
  return gulp
    .watch(input_sass_components, ['sass'])
    .on('change', function(e) {
      console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
    });
});

gulp.task('watch-sass-stylesheet', function() {
  return gulp
    .watch(input_sass_style, ['sass'])
    .on('change', function(e) {
      console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
    });
});

gulp.task('watch-js', function() {
  return gulp
    .watch(input_js, ['scripts'])
    .on('change', function(e) {
      console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
    });
});

// Live reload

gulp.task('connect', function() {
  connect.server({
    root: 'source',
    port: 2701,
    livereload: true
  });
});

// default

gulp.task('default',['sass','scripts','watch-sass-components','watch-sass-stylesheet','watch-js']);
