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