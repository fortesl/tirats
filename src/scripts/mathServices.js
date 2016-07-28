/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').factory('mathServices', [function() {

        var _operands = [];
        var _numberOfOperands = 2;
        var _userLevel = 2;
        var _maxNumber1 = 200;
        var _maxNumber2 = 99;
        var _maxNumberOfOperands = 3;
        var _user = {name: 'Tirat'};

        var _getOperands = function(operation){
            var i, _operand;
            if (operation) {
                _user.operation = operation;
            }
            if (_userLevel === 2 && _user.operation === 'ADDITION') {
                _numberOfOperands = Math.round(_maxNumberOfOperands * Math.random());
                if (_numberOfOperands <2) { _numberOfOperands = 2;}
                _operands.length = 0;
                for (i=0; i< _numberOfOperands; i++) {
                    _operand = {value: Math.round(_maxNumber1 * Math.random())};
                    _operands.push(_operand);
                }
            }
            else if (_userLevel === 2 && _user.operation === 'SUBTRACTION') {
                _maxNumber1 = 1000;
                _operands.length = 0;
                for (i=0; i< _numberOfOperands; i++) {
                    if (!i) {
                        _operand = {value: Math.round(_maxNumber1 * Math.random())};
                    }
                    else {
                        _operand = {value: Math.round(_operands[0].value * Math.random())};
                    }
                    _operands.push(_operand);
                }
            }
            else if (_user.operation === 'MULTIPLICATION') {
                _maxNumber1 = 1000;
                _maxNumber2 = 9;
                _operands.length = 0;
                for (i=0; i< _numberOfOperands; i++) {
                    if (!i) {
                        _operand = {value: Math.round(_maxNumber1 * Math.random())};
                    }
                    else {
                        _operand = {value: Math.round(_maxNumber2 * Math.random())};
                    }
                    _operands.push(_operand);
                }
            }
        } ;

        return {
            operands: _operands,
            user: _user,
            getOperands: _getOperands
        };
    }]);

})();