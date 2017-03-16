/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').factory('mathServices', [function() {

        var _operands = [];
        var _maxNumber, _minNumber, _maxNumber2, _minNumber2;

        var _setupPage = function(page) {
            if (page.operation !== 'Multiplication') {
                page.title = (!page.custom) ? page.digit + '-Digit ' : 'Custom ';
                page.title += page.operation;
                page.description = 'Numbers between ' + page.min + ' and ' + page.max;
                _maxNumber = Number(page.max);
                _minNumber = Number(page.min);
                if (page.custom) {
                    _minNumber2 = Number(page.min2);
                    _maxNumber2 = Number(page.max2);
                }
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
                else if (page.digit === '4') {
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
            var i, _numberOfOperands = 2;
            _operands.length = 0;
            _setupPage(page);

            if (page.operation === 'Addition' && page.custom) {
                page.operationSymbol = '+';
                _operands = [
                    {value: _randomIntFromInterval(_minNumber, _maxNumber)},
                    {value: _randomIntFromInterval(_minNumber2, _maxNumber2)}
                ];
            }
            else if (page.operation === 'Addition') {
                page.operationSymbol = '+';
                _numberOfOperands = _randomIntFromInterval(2,3);
                for (i=0; i< _numberOfOperands; i++) {
                    _operands.push({value: _randomIntFromInterval(_minNumber, _maxNumber)});
                }
            }
            else if (page.operation === 'Subtraction' && page.custom) {
                page.operationSymbol = '-';
                _operands = [{value: _randomIntFromInterval(_minNumber, _maxNumber)}];
                var max = (_maxNumber2 > _operands[0].value) ? _operands[0].value : _maxNumber2;
                _operands.push({value: _randomIntFromInterval(_minNumber2, max)});
            }
            else if (page.operation === 'Subtraction') {
                page.operationSymbol = '-';
                for (i=0; i< _numberOfOperands; i++) {
                    if (!i) {
                        _operands.push({value: _randomIntFromInterval(_minNumber, _maxNumber)});
                    }
                    else {
                        _operands.push({value: _randomIntFromInterval(_minNumber, _operands[0].value)});
                    }
                }
            }
            else if (page.operation === 'Multiplication') {
                page.operationSymbol = 'X';
                for (i=0; i< _numberOfOperands; i++) {
                    if (!i) {
                        _operands.push({value: _randomIntFromInterval(_minNumber, _maxNumber)});
                    }
                    else {
                        _operands.push({value: _randomIntFromInterval(_minNumber, _maxNumber2)});
                    }
                }
            }

            return _operands;
        } ;

        var _getUserName = function(page) {
            page.userName = 'Tirat';
            return page.userName;
        };

        return {
            getOperands: _getOperands,
            getUserName: _getUserName
        };
    }]);

})();