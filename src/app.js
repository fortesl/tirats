/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var app = angular.module('tirats', ['ngRoute', 'ngCookies', 'toastr']);

    app.config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'landing/tirats.html',
                    controller: 'appController as appCtrl'
                })
                .when('/:operationId', {
                    controller: 'operationController as operationCtrl',
                    templateUrl: 'operation/operation.html'
                })
                .otherwise({redirectTo: '/'});
        });

    app.constant('APP_TITLE', "Tirat's Math");
    app.value('APP_USERNAME', 'Tirat');

    app.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-top-full-width',
            maxOpened: 1,
            target: '.app-form',
            timeOut: 1500
        });
    });

})();