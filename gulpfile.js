/*
  Find plugins at https://npmjs.org/browse/keyword/gulpplugin
  from https://github.com/skoczen/inkandfeet/blob/master/gulpfile.js
*/
var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyHTML = require('gulp-minify-html');
var ngAnnotate = require('gulp-ng-annotate');
var templates = require('gulp-angular-templatecache');
var webserver = require('gulp-webserver');


gulp.task('html', function () {
  return gulp.src('source/templates/**/*.html')
    .pipe(minifyHTML({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(templates({
      filename: 'templates.js',
      module: 'be.comments'
    }))
    .pipe(gulp.dest('build/templates'));
});

gulp.task('scripts', ['html'], function() {
  // Minify and copy all JavaScript

  gulp.src(['source/js/**/*.js', '!source/js/lib/**', 'build/templates/templates.js'])
    .pipe(concat("comments.js"))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('build/js'));

  gulp.src(['source/js/**/*.js', '!source/js/lib/**', 'build/templates/templates.js'])
    .pipe(concat("comments.js"))
    .pipe(ngAnnotate())
    .pipe(uglify('comments.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('less', function () {
  return gulp.src('source/less/comments.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'));
});

gulp.task('build', ['html', 'scripts', 'less']);

gulp.task('serve', function() {
    return gulp.src('.')
        .pipe(webserver({
            livereload: true,
            port: 8204,
            directoryListing: true,
            open: true,
            fallback: "demo/index.html"
        }));
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('serve');
  gulp.run('build');
  // Watch files and run tasks if they change
  gulp.watch(['source/js/**/*.js', '!source/js/**/templates.js', 'source/templates/*.html'], function(event) {
    gulp.run('build');
  });
  gulp.watch('source/less/**', function(event) {
    gulp.run('less');
  });
});
