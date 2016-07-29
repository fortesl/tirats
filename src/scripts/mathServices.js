/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').factory('mathServices', [function() {

        var _operands = [];
        var _maxNumber, _minNumber, _maxNumber2;

        var _setupPage = function(page) {
            if (page.operation !== 'Multiplication') {
                page.title = page.digit + '-Digit ' + page.operation;
                page.description = 'Numbers between ' + page.min + ' and ' + page.max;
                _maxNumber = Number(page.max);
                _minNumber = Number(page.min);
            }
            else {
                page.title = page.operation + ' by ' + page.digit + ' digits';
                page.description = 'Numbers to ' + page.max;
                _maxNumber = Number(page.max);
                if (page.digit === '1') {
                    _maxNumber2 = 9;
                    _minNumber = 0;
                }
                else if (page.digit === '2') {
                    _maxNumber2 = 99;
                    _minNumber = 10;
                }
                else if (page.digit === '3') {
                    _maxNumber2 = 999;
                    _minNumber = 100;
                }
                else {
                    _maxNumber2 = 9999;
                    _minNumber = 1000;
                }
            }
        };

        var _randomIntFromInterval = function(min,max)
        {
            return Math.floor(Math.random()*(max-min+1)+min);
        };

        var _getOperands = function(page){
            var i, _operand, _numberOfOperands = 2;
            _operands.length = 0;
            _setupPage(page);

            if (page.operation === 'Addition') {
                page.operationSymbol = '+';
                _numberOfOperands = _randomIntFromInterval(2,3);
                for (i=0; i< _numberOfOperands; i++) {
                    _operand = {value: _randomIntFromInterval(_minNumber, _maxNumber)};
                    _operands.push(_operand);
                }
            }
            else if (page.operation === 'Subtraction') {
                page.operationSymbol = '-';
                for (i=0; i< _numberOfOperands; i++) {
                    if (!i) {
                        _operand = {value: _randomIntFromInterval(_minNumber, _maxNumber)};
                    }
                    else {
                        _operand = {value: _randomIntFromInterval(_minNumber, _operands[0].value)};
                    }
                    _operands.push(_operand);
                }
            }
            else if (page.operation === 'Multiplication') {
                page.operationSymbol = 'X';
                for (i=0; i< _numberOfOperands; i++) {
                    if (!i) {
                        _operand = {value: _randomIntFromInterval(_maxNumber2, _maxNumber)};
                    }
                    else {
                        _operand = {value: _randomIntFromInterval(_minNumber, _maxNumber2)};
                    }
                    _operands.push(_operand);
                }
            }
            return _operands;
        } ;

        var _getUserName = function(page) {
            page.userName = 'Tirat';
            return page.userName;
        };

        return {
            operands: _operands,
            getOperands: _getOperands,
            getUserName: _getUserName
        };
    }]);

})();