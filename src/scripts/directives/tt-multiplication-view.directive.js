(function() { 	
    'use strict'; 	

    angular.module('tirats').directive('ttMultiplicationView', [ttMultiplicationView]);

    function ttMultiplicationView() {
        return {
            restrict: 'E',
            templateUrl: 'tt-multiplication.template.html'
        };
    }
})();