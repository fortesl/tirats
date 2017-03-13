/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var app = angular.module('tirats', ['ngRoute', 'ngCookies', 'toastr']);

    app.config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'landing/tirats.html'
                })
                .when('/:operationId', {
                    controller: 'operationController as operationCtrl',
                    templateUrl: 'operation/operation.html'
                })
                .otherwise({redirectTo: '/'});
        });

    app.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-top-full-width',
            maxOpened: 1,
            target: '.app-form',
            timeOut: 1500
        });
    });

})();