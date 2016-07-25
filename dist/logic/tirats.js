/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var app = angular.module('tirats', ['ngRoute', 'ngCookies', 'toastr']);


    app.config(function($routeProvider) {
            $routeProvider
                .when('/addition', {
                    controller: 'additionController as additionCtrl',
                    templateUrl: '/src/templates/addition/addition.html'
                })
                .when('/subtraction', {
                    controller: 'subtractionController as subtractionCtrl',
                    templateUrl: '/src/templates/subtractions/subtraction.html'
                })
                .otherwise({redirectTo: '/addition'});
        });

    app.config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-middle-right',
            maxOpened: 1,
            target: '.app-form'
        });
    });

})();
/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    var _operands = [];
    var _userName = 'Tirat';
    var _userLevel = 2;
    var _minNumber = 0;
    var _maxNumber = 200;
    var _maxNumberOfOperands = 3;
    var _userLesson = 'ADDITION';

    var _getOperands = function(){
        if (_userLevel === 2 && _userLesson === 'ADDITION') {
            var _numberOfOperands = Math.round(_maxNumberOfOperands * Math.random());
            if (_numberOfOperands <2) { _numberOfOperands = 2;}
            _operands.length = 0;
            for (var i=0; i< _numberOfOperands; i++) {
                var _operand = {value: Math.round(_maxNumber * Math.random())};
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
/**
 * Created by lfortes on 7/23/2016.
 */
(function () {
    'use strict';

    angular.module('tirats').controller('additionController', ['mathServices', 'toastr', '$cookies', '$scope',
        function(mathServices, toastr, $cookies, $scope) {
        var self = this;

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
                self.userScore--;
                self.currentWrong++;
            }
            $cookies.put(mathServices.userName+mathServices.userLesson+'Score', self.userScore);
            $cookies.put(mathServices.userName+mathServices.userLesson+'Correct', self.currentCorrect);
            $cookies.put(mathServices.userName+mathServices.userLesson+'Wrong', self.currentWrong);
            self.setElementFocus(self.answer.length-1);
        };

        var buildExpectedAnswer = function() {
            var correctAnswerDigits = self.correctAnswer.toString().split('');
            var numberOfExpectedDigits = correctAnswerDigits.length;

            self.answer = [];
            for (var i = 0; i < numberOfExpectedDigits; i++) {
                var answerDigit = {
                    position: i,
                    correctValue: correctAnswerDigits[i],
                    inputValue: ''
                };
                self.answer.push(answerDigit);
            }
        };

        self.init = function() {
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
            buildExpectedAnswer();
        };

        self.setElementFocus = function(position) {
            window.setTimeout(function() {
                angular.element('.app-input.' + position).focus();
            },100);
        };

        self.gotInput = function(position) {
            if (self.answer[position].inputValue) {
                self.setElementFocus(position-1);
            }
        };

        self.init();
    }]);

})();