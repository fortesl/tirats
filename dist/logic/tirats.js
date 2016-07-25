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
                    templateUrl: 'addition/addition.html'
                })
                .when('/subtraction', {
                    controller: 'subtractionController as subtractionCtrl',
                    templateUrl: 'subtractions/subtraction.html'
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
angular.module('tirats').run(['$templateCache', function($templateCache) {$templateCache.put('addition/addition.html','<div class="app-lesson-jumbotron">\r\n    <div class="app-jumbotron-content">\r\n        <div class="app-user-name">{{additionCtrl.userName}}</div>\r\n        <div class="app-lesson-title">Addition</div>\r\n        <div class="app-lesson-description">Numbers between 0 and 200</div>\r\n    </div>\r\n</div>\r\n<div class="row app-addition">\r\n    <div class="col-sm-6 app-operation">\r\n        <div class="app-instruction">\r\n            Please Solve:\r\n        </div>\r\n        <div ng-repeat="number in additionCtrl.operands">\r\n            <div class="app-operand" ng-if="$index===additionCtrl.numberOfOperands -1">+ {{number.value}}</div>\r\n            <div class="app-operand" ng-if="$index!==additionCtrl.numberOfOperands -1">{{number.value}}</div>\r\n        </div>\r\n        <div class="app-answer-separator">______________</div>\r\n        <form class="app-form" name="calcForm" novalidate ng-submit="additionCtrl.checkAnswer()">\r\n            <input class="app-input {{digit.position}}" size="1" maxlength="1" ng-model="digit.inputValue" required\r\n               ng-repeat="digit in additionCtrl.answer | orderBy:digit.position"\r\n               ng-change="additionCtrl.gotInput(digit.position);"/>\r\n            <div>\r\n                <input ng-disabled="calcForm.$invalid" type="submit" class="btn btn-primary">\r\n            </div>\r\n        </form>\r\n    </div>\r\n    <div class="col-sm-6 app-score">\r\n        Score: {{ additionCtrl.userScore}}\r\n    </div>\r\n</div>\r\n<div ng-init="additionCtrl.setElementFocus(additionCtrl.answer.length-1)"></div>');}]);
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