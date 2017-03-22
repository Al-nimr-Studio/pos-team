/* File: gulpfile.js */

// grab our gulp packages
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    del = require('del'),
    browserSync = require('browser-sync').create();


//browserSync 
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'distribution'
        },
    })
});



//copying scripts
gulp.task('copying-scripts', function () {
    return gulp.src('client/static/**/*')
        .pipe(gulp.dest('distribution/'))
});

//copying index
gulp.task('index', function () {
    return gulp.src('client/index.html')
        .pipe(gulp.dest('distribution/'))
});
//del the distribution first
gulp.task('clean:distribution', function () {
    return del.sync('distribution');
});

//watch task
gulp.task('watch', ['browserSync'], function () {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('distribution/**/*', browserSync.reload);
    // gulp.watch('client/**/*', browserSync.reload);
});

// gulp sequence
gulp.task('build', function (callback) {
    runSequence('clean:distribution', 'copying-scripts', [


        'browserSync',
        'watch'
    ],

        callback
    )
});


// create a default task and just log a message
gulp.task('default', ['build']);