(function() { 	
    'use strict'; 	

    angular.module('tirats').directive('ttDivisionView', [ttDivisionView]);

    function ttDivisionView() {
        return {
            restrict: 'E',
            templateUrl: 'tt-division.template.html'
        };
    }
})();