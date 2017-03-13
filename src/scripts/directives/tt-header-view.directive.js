(function() {
    'use strict';
    angular.module('tirats').directive('ttHeaderView', [ttHeaderView]);

    function ttHeaderView() {
        return {
            restrict: 'E',
            templateUrl: 'tt-header.template.html'
        };
    }
})();