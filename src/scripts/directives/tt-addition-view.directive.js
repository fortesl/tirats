(function() { 	
    'use strict'; 	

    angular.module('tirats').directive('ttAdditionView', [ttAdditionView]);

    function ttAdditionView() {
        return {
            restrict: 'E',
            templateUrl: 'tt-addition.template.html'
        };
    }
})();