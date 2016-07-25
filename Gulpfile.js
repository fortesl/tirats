/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var gulp = require('gulp');
    var path = require('path');
    var sources = require('./gulp_resources/sourceFiles');
    var plugins = require('./gulp_resources/gulpPlugins');

    var resourceFolders = {
        templates: './src/templates/',
        styles: './src/styles/',
        scripts: './src/scripts/',
        distJs: './dist/logic/',
        distStyles: './dist/css/'
    };

    gulp.task('build', ['buildAppThirdPartyJs', 'buildAppTemplates', 'buildAppJs', 'buildAppStyle']);

    gulp.task('dev', ['lint', 'serve', 'watch']);

    gulp.task('watch', function () {
        gulp.watch(sources.app.concat('./src/templates/**/*.html'), ['lint', 'buildAppTemplates', 'buildAppJs']);
        gulp.watch('./src/styles/**/*.scss', ['buildAppStyle']);
    });

    gulp.task('buildAppJs', ['buildAppTemplates'], function () {
        return gulp.src(sources.app)
            .pipe(plugins.concat('tirats.js'))
            .pipe(gulp.dest(resourceFolders.distJs));
    });

    gulp.task('buildAppTemplates', function () {
        return gulp.src('./src/templates/**/*.html')
            .pipe(plugins.templateCache('tirats.templates.js', { module: 'tirats' }))
            .pipe(gulp.dest(resourceFolders.distJs));
    });


    gulp.task('buildAppThirdPartyJs', function () {
        return gulp.src(sources.libs.js)
            .pipe(plugins.concat('thirdParty.js'))
            .pipe(gulp.dest(resourceFolders.distJs));
    });

    gulp.task('buildAppStyle', ['sass'], function () {
        return gulp.src(sources.libs.css.concat('./.tmp/css/app.css'))
            .pipe(plugins.concat('tirats.css'))
            .pipe(gulp.dest(resourceFolders.distStyles));
    });

    gulp.task('serve', function () {
        plugins.browserSync({
            server: {
                baseDir: './'
            },
            files: [resourceFolders.distStyles + '*.css', resourceFolders.distJs + '*.js']
        });
    });

    gulp.task('sass', function () {
        return plugins.sass('./src/styles/app.scss', { loadPath: ['./bower_components/bootstrap-sass/assets/stylesheets'] })
            .pipe(gulp.dest('./.tmp/css'));
    });

    gulp.task('lint', function () {
        return gulp.src('src/scripts/**/*.js')
            .pipe(plugins.jshint({ lookup: false }))
            .pipe(plugins.jshint.reporter('default'));
    });

    gulp.task('clean', function (cb) {
        plugins.del(['./dist', './.sass-cache', './.tmp'], cb);
    });

    gulp.task('default', ['dev']);

})();