(function() {
    'use strict';
    angular.module('tirats').directive('ttHeader', [ttHeader]);

    function ttHeader() {
        return {
            restrict: 'E',
            templateUrl: 'tt-header.template.html'
        };
    }
})();