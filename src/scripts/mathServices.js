/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var _operands = [];
    var _userName = 'Tirat';
    var _userLevel = 2;
    var _minNumber = 0;
    var _maxNumber = 200;
    var _maxNumberOfOperands = 3;
    var _userLesson = 'ADDITION';

    var _getOperands = function(){
        if (_userLevel === 2 && _userLesson === 'ADDITION') {
            var _numberOfOperands = Math.round(_maxNumberOfOperands * Math.random());
            if (_numberOfOperands <2) { _numberOfOperands = 2;}
            _operands.length = 0;
            for (var i=0; i< _numberOfOperands; i++) {
                var _operand = {value: Math.round(_maxNumber * Math.random())};
                _operands.push(_operand);
            }
        }
    } ;
    angular.module('tirats').factory('mathServices', [function() {
        return {
            operands: _operands,
            userName: _userName,
            userLesson: _userLesson,
            getOperands: _getOperands
        };
    }]);

})();