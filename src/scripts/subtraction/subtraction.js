/**
 * Created by lfortes on 7/25/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').controller('subtractionController', ['mathServices', 'toastr', '$cookies',
        function(mathServices, toastr, $cookies) {
            var self = this;
            self.previousAnswer=true;


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
                    if (self.previousAnswer===true) {
                        self.userScore--;
                        self.currentWrong++;
                    }
                }
                self.previousAnswer = goodAnswer;
                $cookies.put(mathServices.userName+mathServices.userLesson+'Score', self.userScore);
                $cookies.put(mathServices.userName+mathServices.userLesson+'Correct', self.currentCorrect);
                $cookies.put(mathServices.userName+mathServices.userLesson+'Wrong', self.currentWrong);
                self.setElementFocus(self.answer.length-1);
            };

            var buildExpectedAnswer = function() {
                self.operands = mathServices.operands;
                self.numberOfOperands = mathServices.operands.length;

                var correctAnswer= self.operands[0].value;
                var i;
                for (i = 1; i< self.numberOfOperands; i++) {
                    correctAnswer -= self.operands[i].value;
                }
                var correctAnswerDigits = correctAnswer.toString().split('');
                var numberOfExpectedDigits = correctAnswerDigits.length;

                self.answer = [];
                var zeroDigits = self.operands[0].value.toString().length - numberOfExpectedDigits;

                for (i = 0; i < zeroDigits; i++) {//Answer has fewer digits fill 0s to the left
                    self.answer.push({
                        position: i,
                        correctValue: '0',
                        inputValue: ''
                    });
                }
                for (i = 0; i < numberOfExpectedDigits; i++) {
                    var answerDigit = {
                        position: i+zeroDigits,
                        correctValue: correctAnswerDigits[i],
                        inputValue: ''
                    };
                    self.answer.push(answerDigit);
                }
            };

            self.init = function() {
                mathServices.getOperands('SUBTRACTION');

                self.userScore = $cookies.get(mathServices.userName+mathServices.userLesson+'Score') || 0;
                self.currentCorrect = $cookies.get(mathServices.userName+mathServices.userLesson+'Correct') || 0;
                self.currentWrong = $cookies.get(mathServices.userName+mathServices.userLesson+'Wrong') || 0;
                self.userName = mathServices.userName;

                buildExpectedAnswer();
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