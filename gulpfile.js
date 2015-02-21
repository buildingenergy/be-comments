/*
  Find plugins at https://npmjs.org/browse/keyword/gulpplugin
  from https://github.com/skoczen/inkandfeet/blob/master/gulpfile.js
*/
var gulp = require('gulp'),
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    minifyHTML = require('gulp-minify-html'),
    ngAnnotate = require('gulp-ng-annotate'),
    templates = require('gulp-angular-templatecache'),
    webserver = require('gulp-webserver'),
    karma = require('gulp-karma'),
    protractor = require("gulp-protractor").protractor,
    webdriverStandalone = require('gulp-protractor').webdriver_standalone,
    webdriverUpdate = require('gulp-protractor').webdriver_update,
    bower = require('gulp-bower');


gulp.task('prereqs', function () {
  return bower();
});

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
    .pipe(uglify('comments.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('less', function () {
  return gulp.src('source/less/comments.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'));
});

gulp.task('build', ['html', 'scripts', 'less']);

gulp.task('serve', ['prereqs'], function() {
    return gulp.src('.')
        .pipe(webserver({
            livereload: true,
            port: 8204,
            directoryListing: true,
            open: false,
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


// testing

gulp.task('karma', ['build'], function() {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});

gulp.task('autotest', function() {
  return gulp.watch(['source/js/**/*.js', '!source/js/**/templates.js', 'source/templates/*.html', 'tests/unit/*.js'], function (){
    gulp.run('karma');
    gulp.run('e2e');
  });
});


gulp.task('webdriver:update', webdriverUpdate);
gulp.task('webdriver:standalone', ['webdriver:update'], webdriverStandalone);


gulp.task('e2e', ['build', 'webdriver:update'], function () {
  var stream = gulp.run('serve');
  return gulp.src(["./source/tests/e2e/*.js"])
    .pipe(protractor({
        configFile: "protractor.config.js",
        args: ['--baseUrl', 'http://127.0.0.1:8204']
    }))
    .on('error', function(e) { throw e; })
    .on('end', function(e) {
      webserver().emit('kill');
    });

});
