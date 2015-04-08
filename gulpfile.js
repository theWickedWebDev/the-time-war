var gulp = require('gulp');
var jscs = require('gulp-jscs');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  src: {
    assets: './src/assets/**/*',
    css: './src/css/**/main.css',
    js: ['./src/scripts/**/*.js'],
    vendor: ['./src/vendor/**/*.js'],
    markup: ['./src/**/*.html']
  },
  dist: {
    assets: './dist/assets/**/*',
    js: ['./dist/scripts/**/*.js']
  }
};

gulp.task('default', ['lint-js', 'copy', 'compress'], function() {
  return gulp.watch([
    paths.src.js,
    paths.src.css,
    paths.src.assets,
    paths.src.vendor,
    paths.src.markup
  ], ['default']);
});

gulp.task('lint-js', function () {
  return gulp.src(paths.src.js)
    .pipe(jscs());
});

gulp.task('compress', ['concat-js'], function() {
  gulp.src(['./src/vendor/**/*.js', './dist/scripts/main.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'))
});

gulp.task('concat-js', function() {
  return gulp.src(paths.src.js)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('copy', function(){
  gulp.src(['./src/index.html'])
    .pipe(gulp.dest('./dist/'));
  gulp.src(paths.src.assets)
    .pipe(gulp.dest('./dist/assets/'));
  gulp.src(paths.src.css)
    .pipe(gulp.dest('./dist/css/'));
});