import { src, dest } from 'gulp';

var autoprefix = require('gulp-autoprefixer'),
    gulp       = require('gulp'),
    yargs      = require('yargs'),
    bourbon    = require('bourbon').includePaths,
    neat       = require('bourbon-neat').includePaths,
    sass       = require('gulp-sass'),
    cleanCss   = require('gulp-clean-css'),
    gulpif     = require('gulp-if');

const PRODUCTION = yargs.argy.prod;

export const styles = () => {
  return src('src/stylesheets/style.scss')
    .pipe(sass({
      sourcemaps: true,
      includePaths: [bourbon, neat]
    }).on('error', sass.logError))
    .pipe(autoprefix('last 2 versions'))
    .pipe(gulpif(PRODUCTION, cleanCss({compatibility:'ie8'})))
    .pipe(dest('dist/css'));
}
