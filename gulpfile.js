var gulp = require('gulp');
var data = require('gulp-data');
var path = require('path');
var fs = require('fs');
var plumber = require('gulp-plumber');

var stylus = require('gulp-stylus');
var rupture = require('rupture');
var jeet = require('jeet');
var nib = require('nib');
var rename = require('gulp-rename');

var jade = require('gulp-jade');

var browser = require('browser-sync');
var reload = browser.reload;




/**
 * STYLUS (+nib, +rupture, +jeet, +axis)
 */

gulp.task('stylus', function () {
  return gulp.src('./src/stylus/index.styl')
    .pipe(plumber())
    .pipe(stylus({
      use: [nib(), jeet(), rupture()],
      'include css': true,
      linenos: true
    }))
    .pipe(gulp.dest('./public'))
    .pipe(reload({stream:true}));
});

gulp.task('stylus-release', function () {
  return gulp.src('./src/stylus/index.styl')
    .pipe(plumber())
    .pipe(stylus({
      use: [nib(), jeet(), rupture()],
      'include css': true,
      compress: true
    }))
    .pipe(gulp.dest('./public'))
    .pipe(reload({stream:true}));
});



/**
 * JADE
 */

gulp.task('jade', function() {
  return gulp.src('./src/jade/index.jade')
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./public/'))
    .pipe(reload({stream:true}));
});

gulp.task('jade-release', function() {
  return gulp.src('./src/jade/index.jade')
    .pipe(plumber())
    .pipe(data(function(file){
      console.log(file);
      return JSON.parse(fs.readFileSync('./src/data.json'));
    }))
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
    .pipe(reload({stream:true}));
});


/**
 * SERVER
 */

gulp.task('server', function() {
  browser({
    server: {
      baseDir: "./public"
    },
    notify: false
  });
});



/**
 * COMPILE
 */

gulp.task('compile', ['jade', 'stylus']);
gulp.task('compile-release', ['jade-release', 'stylus-release','coffee-release']);



/**
 * WATCH
 */

gulp.task('watch',function(){
  gulp.watch('./src/**/*.jade', ['jade']);
  gulp.watch('./src/**/*.styl', ['stylus']);
});

gulp.task('watch-release',function(){
  gulp.watch('./src/**/*.jade', ['jade-release']);
  gulp.watch('./src/**/*.styl', ['stylus-release']);
});



/**
 * COMPILE + WATCH by default
 */

gulp.task('default', ['compile','watch', 'server']);
gulp.task('release', ['compile-release']);