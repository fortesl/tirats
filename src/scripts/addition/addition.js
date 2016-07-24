/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').controller('additionController', ['mathServices', 'toastr', '$cookies', function(mathServices, toastr, $cookies) {
        var self = this;

        self.checkAnswer = function () {
            if (Number(self.answer) === self.correctAnswer) {
                toastr.success('You got it', self.answer);
                self.init();
                self.userScore++;
                self.currentCorrect++;
            }
            else {
                toastr.error('Not quite');
                self.userScore--;
                self.currentWrong++;
            }
            $cookies.put(mathServices.userName+mathServices.userLesson+'Score', self.userScore);
            $cookies.put(mathServices.userName+mathServices.userLesson+'Correct', self.currentCorrect);
            $cookies.put(mathServices.userName+mathServices.userLesson+'Wrong', self.currentWrong);
            angular.element('.app-input').focus();
        };

        self.init = function() {
            self.answer = '';
            self.correctAnswer=0;
            self.userScore = $cookies.get(mathServices.userName+mathServices.userLesson+'Score') || 0;
            self.currentCorrect = $cookies.get(mathServices.userName+mathServices.userLesson+'Correct') || 0;
            self.currentWrong = $cookies.get(mathServices.userName+mathServices.userLesson+'Wrong') || 0;
            self.userName = mathServices.userName;
            mathServices.getOperands();


            self.operands = mathServices.operands;
            self.numberOfOperands = mathServices.operands.length;
            for (var i = 0; i< self.numberOfOperands; i++) {
                self.correctAnswer += self.operands[i].value;
            }
        };

        self.notEvenClose = function () {
            return self.answer < self.operands[0].value;
        };

        self.init();
    }]);

})();