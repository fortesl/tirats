/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var app = angular.module('tirats', ['ngRoute', 'ngCookies', 'toastr']);


    app.config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'landing/landing.html'
                })
                .when('/:operationId', {
                    controller: 'operationController as operationCtrl',
                    templateUrl: 'operation/operation.html'
                })
                .otherwise({redirectTo: '/'});
        });

    app.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-top-full-width',
            maxOpened: 1,
            target: '.app-form',
            timeOut: 2500
        });
    });

})();
angular.module('tirats').run(['$templateCache', function($templateCache) {$templateCache.put('landing/landing.html','<ul style="margin-top:3em">\r\n    <li><a href="#/Addition?digit=1&max=9&min=0">Addition - 1 digit</a></li>\r\n    <li><a href="#/Addition?digit=2&max=99&min=10">Addition - 2 digit</a></li>\r\n    <li><a href="#/Addition?digit=3&max=999&min=100">Addition - 3 digit</a></li>\r\n    <li><a href="#/Addition?digit=4&max=9999&min=1000">Addition - 4 digit</a></li>\r\n    <li><a href="#/Subtraction?digit=1&max=9&min=0">Subtraction - 1 digit</a></li>\r\n    <li><a href="#/Subtraction?digit=2&max=99&min=10">Subtraction - 2 digit</a></li>\r\n    <li><a href="#/Subtraction?digit=3&max=999&min=100">Subtraction - 3 digit</a></li>\r\n    <li><a href="#/Subtraction?digit=4&max=9999&min=1000">Subtraction - 4 digit</a></li>\r\n    <li><a href="#/Multiplication?max=9&digit=1">Multiplication - Number to 9 by 1 digit</a></li>\r\n    <li><a href="#/Multiplication?max=100&digit=1">Multiplication - Numbers to 99 by 1 digit</a></li>\r\n    <li><a href="#/Multiplication?max=1000&digit=1">Multiplication - Numbers to 999 by 1 digit</a></li>\r\n    <li><a href="#/Multiplication?max=10000&digit=1">Multiplication - Numbers to 9999 by 1 digit</a></li>\r\n    <li><a href="#/Multiplication?max=100&digit=2">Multiplication - Numbers to 99 by 2 digit</a></li>\r\n    <li><a href="#/Multiplication?max=1000&digit=2">Multiplication - Numbers to 999 by 2 digit</a></li>\r\n    <li><a href="#/Multiplication?max=10000&digit=2">Multiplication - Numbers to 9999 by 2 digit</a></li>\r\n</ul>');
$templateCache.put('multiplication/multiplication.html','<div class="app-lesson-jumbotron">\r\n    <div class="app-jumbotron-content">\r\n        <div class="app-user-name"><a href="#/">{{multiplicationCtrl.userName}}</a></div>\r\n        <div class="app-lesson-title">Multiplication</div>\r\n        <div class="app-lesson-description">Numbers between 0 and 100</div>\r\n    </div>\r\n</div>\r\n<div class="row">\r\n    <div class="app-score">\r\n        Score: {{ multiplicationCtrl.userScore}}\r\n    </div>\r\n</div>\r\n<div class="row app-addition">\r\n    <div class="col-sm-6 app-operation">\r\n        <form class="app-form" name="calcForm" novalidate ng-submit="multiplicationCtrl.checkAnswer()">\r\n            <div class="app-operand" ng-repeat="number in multiplicationCtrl.operands">\r\n                <div ng-if="$index===multiplicationCtrl.numberOfOperands -1">X {{number.value}}</div>\r\n                <div ng-if="$index!==multiplicationCtrl.numberOfOperands -1">{{number.value}}</div>\r\n            </div>\r\n            <div class="app-answer-separator">______________</div>\r\n            <input class="app-input {{digit.position}}" size="1" maxlength="1" ng-model="digit.inputValue" required\r\n                   ng-repeat="digit in multiplicationCtrl.answer | orderBy:digit.position"\r\n                   ng-change="multiplicationCtrl.setElementFocusAfterInput(digit.position);"/>\r\n            <input ng-disabled="calcForm.$invalid" type="submit" class="btn btn-primary app-submit">\r\n        </form>\r\n    </div>\r\n    <div class="col-sm-6">\r\n    </div>\r\n</div>\r\n<div ng-init="multiplicationCtrl.setElementFocus(multiplicationCtrl.answer.length-1)"></div>');
$templateCache.put('operation/operation.html','<div class="app-lesson-jumbotron">\r\n    <div class="app-jumbotron-content">\r\n        <div class="app-user-name"><a href="#/">{{operationCtrl.page.userName}}</a></div>\r\n        <div class="app-lesson-title">{{operationCtrl.page.title}}</div>\r\n        <div class="app-lesson-description">{{operationCtrl.page.description}}</div>\r\n    </div>\r\n</div>\r\n<div class="row">\r\n    <div class="app-score">\r\n        Score: {{ operationCtrl.userScore}}\r\n    </div>\r\n</div>\r\n<div class="row app-addition">\r\n    <div class="col-sm-6 app-operation">\r\n        <form class="app-form" name="calcForm" novalidate ng-submit="operationCtrl.checkAnswer()">\r\n            <div class="app-operand" ng-repeat="number in operationCtrl.operands">\r\n                <div ng-if="$index===operationCtrl.numberOfOperands -1">{{operationCtrl.page.operationSymbol}} {{number.value}}</div>\r\n                <div ng-if="$index!==operationCtrl.numberOfOperands -1">{{number.value}}</div>\r\n            </div>\r\n            <div class="app-answer-separator">________________</div>\r\n            <input class="app-input {{digit.position}}" size="1" maxlength="1" ng-model="digit.inputValue" required\r\n               ng-repeat="digit in operationCtrl.answer | orderBy:digit.position"\r\n               ng-change="operationCtrl.setElementFocusAfterInput(digit.position);"/>\r\n            <input ng-disabled="calcForm.$invalid" type="submit" class="btn btn-primary app-submit">\r\n        </form>\r\n    </div>\r\n    <div class="col-sm-6">\r\n    </div>\r\n</div>\r\n<div ng-init="operationCtrl.setElementFocus(operationCtrl.answer.length-1)"></div>');
$templateCache.put('subtraction/subtraction.html','<div class="app-lesson-jumbotron">\r\n    <div class="app-jumbotron-content">\r\n        <div class="app-user-name"><a href="#/">{{subtractionCtrl.userName}}</a></div>\r\n        <div class="app-lesson-title">Subtraction</div>\r\n        <div class="app-lesson-description">Numbers between 0 and 1000</div>\r\n    </div>\r\n</div>\r\n<div class="row">\r\n    <div class="app-score">\r\n        Score: {{ subtractionCtrl.userScore}}\r\n    </div>\r\n</div>\r\n<div class="row app-addition">\r\n    <div class="col-sm-6 app-operation">\r\n        <form class="app-form" name="calcForm" novalidate ng-submit="subtractionCtrl.checkAnswer()">\r\n            <div ng-repeat="number in subtractionCtrl.operands">\r\n                <div class="app-operand" ng-if="$index===subtractionCtrl.numberOfOperands -1">- {{number.value}}</div>\r\n                <div class="app-operand" ng-if="$index!==subtractionCtrl.numberOfOperands -1">{{number.value}}</div>\r\n            </div>\r\n            <div class="app-answer-separator">______________</div>\r\n            <input class="app-input {{digit.position}}" size="1" maxlength="1" ng-model="digit.inputValue" required\r\n               ng-repeat="digit in subtractionCtrl.answer | orderBy:digit.position"\r\n               ng-change="subtractionCtrl.setElementFocusAfterInput(digit.position);"/>\r\n            <input ng-disabled="calcForm.$invalid" type="submit" class="btn btn-primary app-submit">\r\n        </form>\r\n    </div>\r\n    <div class="col-sm-6">\r\n    </div>\r\n</div>\r\n<div ng-init="subtractionCtrl.setElementFocus(subtractionCtrl.answer.length-1)"></div>');}]);
/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').factory('mathServices', [function() {

        var _operands = [];
        var _maxNumber, _minNumber, _maxNumber2;

        var _setupPage = function(page) {
            page.userName = 'Tirat';
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

        return {
            operands: _operands,
            getOperands: _getOperands
        };
    }]);

})();
/**
 * Created by lfortes on 7/27/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').controller('operationController',
        ['mathServices', 'toastr', '$cookies', '$location', '$routeParams',
            function(mathServices, toastr, $cookies, $location, $routeParams) {
                var self = this;
                self.previousGoodAnswer=true;

                var _setCookies = function() {
                    $cookies.put(self.page.userName+self.page.operation+'Score', self.userScore);
                    $cookies.put(self.page.userName+self.page.operation+'Correct', self.currentCorrect);
                    $cookies.put(self.page.userName+self.page.operation+'Wrong', self.currentWrong);
                };

                var _getCookies = function() {
                    self.userScore = $cookies.get(self.page.userName+self.page.operation+'Score') || 0;
                    self.currentCorrect = $cookies.get(self.page.userName+self.page.operation+'Correct') || 0;
                    self.currentWrong = $cookies.get(self.page.userName+self.page.operation+'Wrong') || 0;
                };

                self.checkAnswer = function () {
                    var goodAnswer = true;
                    angular.forEach(self.answer, function(digit) {
                        if (digit.inputValue !== digit.correctValue) {
                            goodAnswer = false;
                        }
                    });
                    if (goodAnswer) {
                        toastr.success('You got it', self.answer);
                        self.init();
                        self.userScore++;
                        self.currentCorrect++;
                    }
                    else {
                        toastr.error('Not quite');
                        if (self.previousGoodAnswer === true) {
                            self.userScore--;
                            self.currentWrong++;
                        }
                    }
                    self.previousGoodAnswer = goodAnswer;
                    self.setElementFocus(self.answer.length-1);
                    _setCookies();
                };

                var _getAnswer = function(operands) {
                    var _correctAnswer= self.operands[0].value;

                    for (var i = 1; i< self.numberOfOperands; i++) {
                        if (self.page.operation === 'Addition')
                            _correctAnswer += self.operands[i].value;
                        else if (self.page.operation === 'Subtraction')
                            _correctAnswer -= self.operands[i].value;
                        else if (self.page.operation === 'Multiplication')
                            _correctAnswer *= self.operands[i].value;
                    }
                    return _correctAnswer.toString();
                };

                var _buildExpectedAnswer = function() {
                    self.operands = mathServices.operands;

//                    self.operands = [{value: 5}, {value: 5}]; //TEST

                    self.numberOfOperands = self.operands.length;
                    var _correctAnswerDigits = _getAnswer(self.operands).split('');
                    var _numberOfExpectedDigits = _correctAnswerDigits.length;
                    var _i, _zeroDigits = 0;

                    self.answer = [];
                    //FILL in zero digits, if any
                    if (self.page.operation === 'Subtraction') _zeroDigits = self.operands[0].value.toString().length - _numberOfExpectedDigits;
                    for (_i = 0; _i < _zeroDigits; _i++) {//Answer has fewer digits fill 0s to the left
                        self.answer.push({
                            position: _i,
                            correctValue: '0',
                            inputValue: ''
                        });
                    }

                    for (_i = 0; _i < _numberOfExpectedDigits; _i++) {
                        var _answerDigit = {
                            position: _zeroDigits + _i,
                            correctValue: _correctAnswerDigits[_i],
                            inputValue: ''
                        };
                        self.answer.push(_answerDigit);
                    }
                };

                self.init = function() {
                    self.page = $location.search();
                    self.page.operation = $routeParams.operationId;

                    mathServices.getOperands(self.page);
                    _buildExpectedAnswer();
                    _getCookies();
                };

                self.setElementFocus = function(position) {
                    window.setTimeout(function() {
                        angular.element('.app-input.' + position).focus();
                    },100);
                };

                self.setElementFocusAfterInput = function(position) {
                    if (self.answer[position].inputValue) {
                        self.setElementFocus(position-1);
                    }
                };

                self.init();
            }]);

})();