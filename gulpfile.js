'use strict';

/* --------------------------------------------------------------------------
 * Get project configuration
 * -------------------------------------------------------------------------- */

var config = require('./project.json');

/* --------------------------------------------------------------------------
 * Require Tasks
 * -------------------------------------------------------------------------- */

var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sequence = require('run-sequence'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');

/* --------------------------------------------------------------------------
 * Clear any previously built files before rebuilding assets
 * -------------------------------------------------------------------------- */

gulp.task('clean', function () {
    return del.sync([
        config.dirs.build.css,
        config.dirs.build.js
    ]);
});

/* ---------------------------------------------------------------------------
 * Compile SASS into CSS
 * -------------------------------------------------------------------------- */

gulp.task('sass', function () {
    return gulp.src(config.dirs.assets.sass + '/**/*.{scss,sass}')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dirs.build.css))
        .pipe(livereload());
});

/* --------------------------------------------------------------------------
 * Add vendor prefixes to compiled css
 * -------------------------------------------------------------------------- */

gulp.task('autoprefixer', function () {
    return gulp.src(config.dirs.build.css + '/**/*.css')
        .pipe(prefixer({
            browsers: ['last 2 versions', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest(config.dirs.build.css));
});

/* --------------------------------------------------------------------------
 * Minify all CSS files
 * -------------------------------------------------------------------------- */

gulp.task('minify-css', function () {
    return gulp.src(config.dirs.build.css + '/**/*.css')
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(config.dirs.build.css));
});

/* --------------------------------------------------------------------------
 * Concatenate and minify Javascript
 * -------------------------------------------------------------------------- */

gulp.task('uglify', function () {
    for (var key in config.js) {
        gulp.src(config.js[key])
            .pipe(uglify())
            .pipe(concat(key))
            .pipe(gulp.dest(config.dirs.build.js));
    }

    livereload.reload();
});

/* --------------------------------------------------------------------------
 * Watch for any file changes
 * -------------------------------------------------------------------------- */

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch(config.dirs.assets.sass + '/**/*.{scss,sass}', ['sass']);
    gulp.watch(config.dirs.assets.js + '/**/*.js', ['uglify']);
    gulp.watch(config.dirs.assets.img + '/**/*.{png,jpg,gif,svg}', ['imagemin']);

    gulp.watch(config.dirs.templates + '/**/*.{html,twig,php}').on('change', function (file) {
        livereload.changed(file.path);
    });
});

/* --------------------------------------------------------------------------
 * Build - Builds all assets ready for production
 *     1. Removes any previously built assets
 *     2. Copies any required dependencies
 *     3. Compiles CSS
 *     4. Applies any vendor prefixes
 *     5. Minifies CSS
 *     6. Builds JS files
 *     7. Optimises images
 *     8. Add hashes to asset filenames
 * -------------------------------------------------------------------------- */

gulp.task('build', function () {
    return sequence(
        'clean',
        ['sass', 'uglify'],
        'autoprefixer',
        'minify-css'
    );
});

/* --------------------------------------------------------------------------
 * Default Task
 *     1. Cleans any previously built assets
 *     2. Copies any required dependencies
 *     3. Builds the development versions of any css, javascript or images
 *     4. Watches for any changes...
 * -------------------------------------------------------------------------- */

gulp.task('default', function () {
    return sequence(
        'clean',
        ['sass', 'uglify'],
        'watch'
    );
});
