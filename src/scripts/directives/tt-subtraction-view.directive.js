(function() { 	
    'use strict'; 	

    angular.module('tirats').directive('ttSubtractionView', [ttSubtractionView]);

    function ttSubtractionView() {
        return {
            restrict: 'E',
            templateUrl: 'tt-subtraction.template.html'
        };
    }
})();