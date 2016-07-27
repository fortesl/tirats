/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var _operands = [];
    var _numberOfOperands = 2;
    var _userName = 'Tirat';
    var _userLevel = 2;
    var _minNumber = 0;
    var _maxNumber = 200;
    var _maxNumberOfOperands = 3;
    var _userLesson = 'ADDITION';

    var _getOperands = function(operation){
        var i, _operand;
        if (operation) {
            _userLesson = operation;
        }
        if (_userLevel === 2 && _userLesson === 'ADDITION') {
            _numberOfOperands = Math.round(_maxNumberOfOperands * Math.random());
            if (_numberOfOperands <2) { _numberOfOperands = 2;}
            _operands.length = 0;
            for (i=0; i< _numberOfOperands; i++) {
                _operand = {value: Math.round(_maxNumber * Math.random())};
                _operands.push(_operand);
            }
        }
        else if (_userLevel === 2 && _userLesson === 'SUBTRACTION') {
            _maxNumber = 1000;
            _operands.length = 0;
            for (i=0; i< _numberOfOperands; i++) {
                if (!i) {
                    _operand = {value: Math.round(_maxNumber * Math.random())};
                }
                else {
                    _operand = {value: Math.round(_operands[0].value * Math.random())};
                }
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