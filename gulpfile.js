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


gulp.task('scripts', function() {
  // Minify and copy all JavaScript

  gulp.src('source/templates/**/*.html')
    .pipe(minifyHTML({
          empty: true,
          spare: true,
          quotes: true
      }))
    .pipe(templates('templates.js'))
    .pipe(gulp.dest('build/templates'));

  // gulp.src(['source/js/**/*.js', '!source/js/lib/**', 'build/templates/templates.js'])
  //   .pipe(concat("comments.js"))
  //   .pipe(ngAnnotate())
  //   .pipe(gulp.dest('build/js'));

  gulp.src(['source/js/**/*.js', '!source/js/lib/**', 'build/templates/templates.js'])
    .pipe(concat("comments.js"))
    .pipe(ngAnnotate())
    .pipe(uglify('comments.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('less', function () {
  gulp.src('source/less/comments.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'));
});

gulp.task('build', function(){
    gulp.run('scripts', 'less');
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('build');
  // Watch files and run tasks if they change
  gulp.watch(['source/js/**/*.js', '!source/js/**/templates.js'], function(event) {
    gulp.run('scripts');
  });
  gulp.watch('source/less/**', function(event) {
    gulp.run('less');
  });
});
