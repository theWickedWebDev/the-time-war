var gulp = require('gulp');
var jscs = require('gulp-jscs');

var paths = {
  assets: './assets/**/*',
  js: ['./js/**/*.js']
};

gulp.task('default', ['lint'], function() {
  return gulp.watch([paths.js], ['default']);
});

gulp.task('lint', function () {
    return gulp.src(paths.js)
      .pipe(jscs());
});