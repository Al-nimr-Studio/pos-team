/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    del = require('del'),
    browserSync = require('browser-sync').create();


//browserSync 
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});



//copying scripts
gulp.task('copying-scripts', function() {
    return gulp.src('client/static/**/*')
        .pipe(gulp.dest('dist/'))
});

//copying index
gulp.task('index', function() {
    return gulp.src('client/index.html')
        .pipe(gulp.dest('dist/'))
});
//del the dist first
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

//watch task
gulp.task('watch', ['browserSync'], function() {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('dist/**/*', browserSync.reload);
});

// gulp sequence
gulp.task('build', function(callback) {
    runSequence('clean:dist', [
            'copying-scripts',
            'browserSync',
            'watch'
        ],

        callback
    )
});


// create a default task and just log a message
gulp.task('default', ['build']);