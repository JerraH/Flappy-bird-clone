var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//Lint me some javascript
gulp.task('jshint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//compile Sass task
gulp.task('sass', function(){
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

//watch me go
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['jshint']);
    gulp.watch('scss/*.scss', ['sass']);
});

//this is yo default.  Runs all tasks then watches them.
gulp.task('default', ['jshint', 'sass', 'watch']);

//Minify your index: removes whitespace, Makes More Better
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('build/'));
});

//concatenate and minify your javascript!  Builds JS!
gulp.task('scripts', function() {
    return browserify('js/main.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('build/js;'));
});

//concatenates compiled css files
gulp.task('styles', function() {
    return gulp.src('css/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

//minify and optimize images
gulp.task('images', function() {
    return gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

//build task
gulp.task('build', ['jshint', 'sass', 'html', 'scripts', 'styles', images]);