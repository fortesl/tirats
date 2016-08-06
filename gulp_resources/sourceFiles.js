/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var sources = {
        libs: {
            css: [
                'bower_components/angular-toastr/dist/angular-toastr.css',
            ],
            js: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
                'bower_components/angular/angular.js',
                'bower_components/angular-route/angular-route.js',
                'bower_components/angular-cookies/angular-cookies.js',
                'bower_components/angular-toastr/dist/angular-toastr.tpls.js'
            ]
        },
        app: [
            'src/scripts/app.js',
            'dist/logic/tirats.templates.js',
            'src/scripts/mathServices.js',
             'src/scripts/timerService.js',
            'src/scripts/operation/**/*.js'
        ]
    };

    module.exports = sources;
})();