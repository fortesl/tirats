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
            timeOut: 1500
        });
    });

})();
angular.module('tirats').run(['$templateCache', function($templateCache) {$templateCache.put('landing/landing.html','<ul style="margin-top:3em">\n    <li><a href="#/Addition?digit=1&max=9&min=0&level=A1">Addition - 1 digit</a></li>\n    <li><a href="#/Addition?digit=2&max=99&min=10&level=A2">Addition - 2 digit</a></li>\n    <li><a href="#/Addition?digit=3&max=999&min=100&level=A3">Addition - 3 digit</a></li>\n    <li><a href="#/Addition?digit=4&max=9999&min=1000&level=A4">Addition - 4 digit</a></li>\n    <li><a href="#/Subtraction?digit=1&max=9&min=0&level=S1">Subtraction - 1 digit</a></li>\n    <li><a href="#/Subtraction?digit=2&max=99&min=10&level=S2">Subtraction - 2 digit</a></li>\n    <li><a href="#/Subtraction?digit=3&max=999&min=100&level=S3">Subtraction - 3 digit</a></li>\n    <li><a href="#/Subtraction?digit=4&max=9999&min=1000&level=S4">Subtraction - 4 digit</a></li>\n    <li><a href="#/Multiplication?max=9&digit=1&level=M1">Multiplication - Number to 9 by 1 digit</a></li>\n    <li><a href="#/Multiplication?max=100&digit=1&level=M2">Multiplication - Numbers to 99 by 1 digit</a></li>\n    <li><a href="#/Multiplication?max=1000&digit=1&level=M3">Multiplication - Numbers to 999 by 1 digit</a></li>\n    <li><a href="#/Multiplication?max=10000&digit=1&level=M4">Multiplication - Numbers to 9999 by 1 digit</a></li>\n    <li><a href="#/Multiplication?max=100&digit=2&level=M5">Multiplication - Numbers to 99 by 2 digit</a></li>\n    <li><a href="#/Multiplication?max=1000&digit=2&level=M6">Multiplication - Numbers to 999 by 2 digit</a></li>\n    <li><a href="#/Multiplication?max=10000&digit=2&level=M7">Multiplication - Numbers to 9999 by 2 digit</a></li>\n</ul>');
$templateCache.put('operation/operation.html','<div class="app-lesson-jumbotron">\n    <div class="app-jumbotron-content">\n        <div class="app-user-name"><a href="#/">{{operationCtrl.page.userName}}</a></div>\n        <div class="app-lesson-title">{{operationCtrl.page.title}}</div>\n    </div>\n</div>\n<div class="row">\n    <div class="app-score">\n        <span title="{{operationCtrl.page.title + \' - \' + operationCtrl.page.description}}">{{operationCtrl.page.level}}</span>\n        Score: {{ operationCtrl.userScore}}\n        <div>\n            <span>{{operationCtrl.page.timer.hours}}:</span><span>{{operationCtrl.page.timer.minutes}}:</span><span>{{operationCtrl.page.timer.seconds}}</span>\n        </div>\n    </div>\n</div>\n<div class="row app-addition">\n    <div class="col-sm-6 app-operation">\n        <form class="app-form" name="calcForm" novalidate ng-submit="operationCtrl.checkAnswer()">\n            <div class="app-operand" ng-repeat="number in operationCtrl.operands">\n                <div ng-if="$index===operationCtrl.numberOfOperands -1">{{operationCtrl.page.operationSymbol}} {{number.value}}</div>\n                <div ng-if="$index!==operationCtrl.numberOfOperands -1">{{number.value}}</div>\n            </div>\n            <div class="app-answer-separator">________________</div>\n            <input type="text" class="app-input {{digit.position}}" size="1" maxlength="1" ng-model="digit.inputValue" required\n               ng-repeat="digit in operationCtrl.answer | orderBy:digit.position"\n               ng-change="operationCtrl.setElementFocusAfterInput(digit.position)"\n               ng-keyup="operationCtrl.notIdle()" ng-pattern="/[0-9]/"/>\n            <input ng-disabled="calcForm.$invalid" type="submit" class="btn btn-primary app-submit">\n        </form>\n    </div>\n    <div class="col-sm-6">\n    </div>\n</div>\n<div ng-init="operationCtrl.setElementFocus(operationCtrl.answer.length-1)"></div>\n');}]);
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
/**
 * Created by lfortes on 7/27/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').controller('operationController',
        ['mathServices', 'toastr', '$cookies', '$location', '$routeParams', '$scope',
            function(mathServices, toastr, $cookies, $location, $routeParams, $scope) {
                var self = this, _previousGoodAnswer=true;

                var _setCookies = function() {
                    $cookies.put(self.page.id+'Score', self.userScore);
                    $cookies.put(self.page.id+'Correct', self.currentCorrect);
                    $cookies.put(self.page.id+'Wrong', self.currentWrong);
                    $cookies.put(self.page.id+'Time', self.page.timer.value);
                };

                var _getCookies = function() {
                    self.userScore = $cookies.get(self.page.id+'Score') || 0;
                    self.currentCorrect = $cookies.get(self.page.id+'Correct') || 0;
                    self.currentWrong = $cookies.get(self.page.id+'Wrong') || 0;
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
                        self.userScore++;
                        self.currentCorrect++;
                        _askQuestion();
                    }
                    else {
                        toastr.error('Not quite');
                        if (_previousGoodAnswer === true && self.userScore) {
                            self.userScore--;
                            self.currentWrong++;
                        }
                    }
                    _previousGoodAnswer = goodAnswer;
                    self.setElementFocus(self.answer.length-1);
                    _setCookies();
                };

                var _getAnswer = function(operands) {
                    var _correctAnswer= operands[0].value;

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

                    self.numberOfOperands = self.operands.length;
                    var _correctAnswerDigits = _getAnswer(self.operands).split('');
                    var _numberOfExpectedDigits = _correctAnswerDigits.length;
                    var _i, _zeroDigits = 0;

                    self.answer = [];
                    //FILL in zero digits, if any
                    if (self.page.operation === 'Subtraction')
                        _zeroDigits = self.operands[0].value.toString().length - _numberOfExpectedDigits;
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

                self.setElementFocus = function(position) {
                    window.setTimeout(function() {
                        angular.element('.app-input.' + position).focus();
                        angular.element('.app-input.' + position).select();
                    },100);
                };

                self.setElementFocusAfterInput = function(position) {
                    if (self.answer[position].inputValue) {
                        self.setElementFocus(position-1);
                    }
                };

                var _askQuestion = function() {
                    mathServices.getOperands(self.page);
                    _buildExpectedAnswer();
                };

                var _resetTimer = function() {
                    self.page.timer = {isOn: false, idleMark: 90};
                    self.page.timer.value = $cookies.get(self.page.id+'Time') || 0;
                    _displayTimer();
                };

                var _startTimer = function() {
                    self.page.timer.isOn = true;
                    self.page.timer.idle = 0;
                    var _timerStopper = window.setInterval(function() {
                        self.page.timer.value++;
                        self.page.timer.idle++;
                        if (self.page.timer.idle >=self.page.timer.idleMark) {
                            window.clearInterval(_timerStopper);
                            self.page.timer.value -= self.page.timer.idleMark;
                            self.page.timer.isOn = false;
                            self.page.timer.idle = 0;
                        }
                        _displayTimer();
                    }, 1000);
                };

                var _displayTimer = function() {
                    self.page.timer.hours = _addZeroToTheLeft(Math.floor(self.page.timer.value / 3600));
                    self.page.timer.minutes = _addZeroToTheLeft(Math.floor(self.page.timer.value / 60));
                    self.page.timer.seconds = _addZeroToTheLeft(Math.floor(self.page.timer.value % 60));
                    if (!$scope.$$phase) {
                        $scope.$digest();
                    }
                };
                
                var _addZeroToTheLeft = function(value) {
                    if (value < 10) {
                        value = "0" + value;
                    }
                    return value;
                };

                self.notIdle = function() {
                    self.page.timer.idle = 0;
                    if (!self.page.timer.isOn) {
                        _startTimer();
                    }
                };

                (function() {
                    self.page = $location.search();
                    self.page.operation = $routeParams.operationId;
                    self.page.id = mathServices.getUserName(self.page)+self.page.operation+self.page.level;
                    _resetTimer();
                    _getCookies();
                    _askQuestion();
                })();

            }]);

})();