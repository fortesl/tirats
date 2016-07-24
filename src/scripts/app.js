/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var app = angular.module('tirats', ['ngRoute', 'ngCookies', 'toastr']);


    app.config(function($routeProvider) {
            $routeProvider
                .when('/addition', {
                    controller: 'additionController as additionCtrl',
                    templateUrl: '/src/templates/addition/addition.html'
                })
                .when('/subtraction', {
                    controller: 'subtractionController as subtractionCtrl',
                    templateUrl: '/src/templates/subtractions/subtraction.html'
                })
                .otherwise({redirectTo: '/addition'});
        });

    app.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-middle-right',
            maxOpened: 1,
            target: '.app-operation'
        });
    });

})();