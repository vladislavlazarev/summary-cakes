        'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync');
const browserify = require('gulp-browserify');

gulp.task('pages', function() {
    return gulp.src('./src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('styles', function() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/assets/css/'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('images', function() {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./build/assets/images/'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./build/assets/fonts/'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('scripts', function() {
    return gulp.src('./src/scripts/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('./build/assets/scripts/'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('clean', function() {
    return del('build');
})

gulp.task('watch', function() {
    gulp.watch('./src/**/*.pug', gulp.series('pages'));
    gulp.watch('./src/scripts/**/*.js', gulp.series('scripts'));
    gulp.watch('./src/styles/**/*.scss', gulp.series('styles'));
    gulp.watch('./src/images/**/*', gulp.series('images'));
    gulp.watch('./src/fonts/**/*', gulp.series('fonts'));
})

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('ui', gulp.parallel('watch', 'browser-sync'))

gulp.task('build', gulp.series('clean', 'pages', 'styles', 'images', 'fonts', 'scripts', 'ui'));
