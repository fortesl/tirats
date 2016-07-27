/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var app = angular.module('tirats', ['ngRoute', 'ngCookies', 'toastr']);


    app.config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'landing/landing.html'
                })
                .when('/addition', {
                    controller: 'additionController as additionCtrl',
                    templateUrl: 'addition/addition.html'
                })
                .when('/subtraction', {
                    controller: 'subtractionController as subtractionCtrl',
                    templateUrl: 'subtraction/subtraction.html'
                })
                .otherwise({redirectTo: '/'});
        });

    app.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-top-full-width',
            maxOpened: 1,
            target: '.app-form'
        });
    });

})();