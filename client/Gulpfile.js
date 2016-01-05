var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify')
clean = require('gulp-clean');
var dist_path_prefix = "../server/src/main/resources/static/public/";
// JSHint task
gulp.task('lint', function () {
    gulp.src('./app/scripts/**/*.js')
        .pipe(jshint())
        // You can look into pretty reporters as well, but that's another story
        .pipe(jshint.reporter('default'));
});
gulp.task('clean', function () {
    return gulp.src(dist_path_prefix + 'dist')
        .pipe(clean({force: true}));
});
// Browserify task
gulp.task('browserify', function () {
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
    gulp.src(['app/scripts/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        //Uglify
        .pipe(uglify())
        // Output it to our dist folder
        .pipe(gulp.dest(dist_path_prefix + 'dist/js'));
});
// Views task
gulp.task('views', function () {
    // Get our index.html
    gulp.src('app/index.html')
        // And put it in the dist folder
        .pipe(gulp.dest(dist_path_prefix + 'dist/'));
    // Any other view files from app/views
    gulp.src('./app/views/**/*')
        // Will be put in the dist/views folder
        .pipe(gulp.dest(dist_path_prefix + 'dist/views/'));
});
gulp.task('minify-css', function () {
    var style = require("./styles.json");
    gulp.src(style)
        .pipe(concat('style.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(dist_path_prefix + 'dist/styles'));
});
gulp.task('fonts', function () {
    gulp.src("node_modules/font-awesome/fonts/*")
        .pipe(gulp.dest(dist_path_prefix + 'dist/fonts'));
});
gulp.task('data', function () {
    gulp.src("app/data/*")
        .pipe(gulp.dest(dist_path_prefix + 'dist/data'));
});
gulp.task('build', ['browserify', 'views', 'minify-css', 'data', 'fonts']);
gulp.task('watch', function () {
    // Watch our scripts
    gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], [
        'browserify'
    ]);
    gulp.watch(['app/index.html', 'app/views/**/*.html'], [
        'views'
    ]);
});
