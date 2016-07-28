/**
 * Created by lfortes on 7/27/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').controller('operationController',
        ['mathServices', 'toastr', '$cookies', '$location', '$routeParams',
            function(mathServices, toastr, $cookies, $location, $routeParams) {
                var self = this, _pageId;
                self.previousGoodAnswer=true;

                var _setCookies = function() {
                    $cookies.put(_pageId+'Score', self.userScore);
                    $cookies.put(_pageId+'Correct', self.currentCorrect);
                    $cookies.put(_pageId+'Wrong', self.currentWrong);
                };

                var _getCookies = function() {
                    self.userScore = $cookies.get(_pageId+'Score') || 0;
                    self.currentCorrect = $cookies.get(_pageId+'Correct') || 0;
                    self.currentWrong = $cookies.get(_pageId+'Wrong') || 0;
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
                        if (self.previousGoodAnswer === true && self.userScore) {
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

                self.init = function() {
                    self.page = $location.search();
                    self.page.operation = $routeParams.operationId;

                    mathServices.getOperands(self.page);
                    _pageId = self.page.userName+self.page.operation+self.page.level;

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