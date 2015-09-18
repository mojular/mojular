var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var merge = require('merge-stream');

var paths = {
  dest: 'assets/scripts/',
  ie: [
    'node_modules/html5shiv/dist/html5shiv.js',
    'node_modules/JSON2/json2.js'
  ],
  libs: [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/lodash/index.js'
  ]
};

gulp.task('build-scripts', function() {
  var ie = gulp.src(paths.ie).pipe(concat('ie.js')).pipe(gulp.dest(paths.dest));
  var libs = gulp.src(paths.libs).pipe(concat('libs.js')).pipe(gulp.dest(paths.dest));

  return merge(ie, libs);
});

gulp.task('minify-scripts', ['build-scripts'], function() {
  var ie = gulp.src(paths.dest + 'ie.js')
    .pipe(uglify({ mangle: false, compress: false, preserveComments: 'some' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dest));

  var libs = gulp.src(paths.dest + 'libs.js')
    .pipe(uglify({ mangle: false, compress: false, preserveComments: 'some' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dest));

  return merge(ie, libs);
});

gulp.task('default', ['minify-scripts']);
