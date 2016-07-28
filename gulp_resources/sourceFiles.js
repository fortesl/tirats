/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var sources = {
        libs: {
            css: [
                'bower_components/angular-multi-select/isteven-multi-select.css',
                'bower_components/angular-toastr/dist/angular-toastr.css',
                'bower_components/json-formatter/dist/json-formatter.css'
            ],
            js: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
                'bower_components/angular/angular.js',
                'bower_components/angular-route/angular-route.js',
                'bower_components/angular-cookies/angular-cookies.js',
                'bower_components/moment/moment.js',
                'bower_components/angular-multi-select/isteven-multi-select.js',
                'bower_components/json-formatter/dist/json-formatter.js',
                'bower_components/angular-toastr/dist/angular-toastr.tpls.js'
            ]
        },
        app: [
            'src/scripts/app.js',
            'dist/logic/tirats.templates.js',
            'src/scripts/mathServices.js',
            'src/scripts/operation/**/*.js'
        ]
    };

    module.exports = sources;
})();