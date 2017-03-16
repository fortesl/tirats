!function(){"use strict";var app=angular.module("tirats",["ngRoute","ngCookies","toastr"]);app.config(function($routeProvider){$routeProvider.when("/",{templateUrl:"landing/tirats.html",controller:"appController as appCtrl"}).when("/:operationId",{controller:"operationController as operationCtrl",templateUrl:"operation/operation.html"}).otherwise({redirectTo:"/"})}),app.constant("APP_TITLE","Tirat's Math"),app.value("APP_USERNAME","Tirat"),app.config(function(toastrConfig){angular.extend(toastrConfig,{positionClass:"toast-top-full-width",maxOpened:1,target:".app-form",timeOut:1500})})}(),function(){"use strict";function appController(APP_TITLE,APP_USERNAME,$cookies,timerService){var self=this;self.appTitle=APP_TITLE,self.appUserName=APP_USERNAME,self.appLastActivity=$cookies.get("LastActivity")||"0",self.hasScore=function(operation){return document.cookie.indexOf(self.appUserName+operation+"Score")>-1},self.showPopover=function(){angular.element('[data-toggle="popover"]').popover()},self.getScore=function(operation){return $cookies.get(self.appUserName+operation+"Score")||""},self.getTimer=function(operation){var _seconds=$cookies.get(self.appUserName+operation+"Time")||0;return timerService.getTimer(_seconds)}}angular.module("tirats").controller("appController",["APP_TITLE","APP_USERNAME","$cookies","timerService",appController])}(),function(){"use strict";angular.module("tirats").controller("operationController",["mathServices","toastr","$cookies","$location","$routeParams","timerService","$scope","APP_TITLE",function(mathServices,toastr,$cookies,$location,$routeParams,timerService,$scope,APP_TITLE){var self=this,_previousGoodAnswer=!0,_timerIdleSeconds=60,_setCookies=function(){$cookies.put(self.page.id+"Score",self.userScore),$cookies.put(self.page.id+"Correct",self.currentCorrect),$cookies.put(self.page.id+"Wrong",self.currentWrong),$cookies.put(self.page.id+"Time",self.page.timer.value)},_getCookies=function(){self.userScore=$cookies.get(self.page.id+"Score")||0,self.currentCorrect=$cookies.get(self.page.id+"Correct")||0,self.currentWrong=$cookies.get(self.page.id+"Wrong")||0};window.onbeforeunload=function(){$cookies.put(self.page.id+"Time",self.page.timer.value)},self.checkAnswer=function(){var goodAnswer=!0;angular.forEach(self.answer,function(digit){digit.inputValue!==digit.correctValue&&(goodAnswer=!1)}),goodAnswer?(toastr.success("You got it",self.answer),self.userScore++,self.currentCorrect++,_askQuestion()):(toastr.error("Not quite"),_previousGoodAnswer===!0&&self.userScore&&(self.userScore--,self.currentWrong++)),_previousGoodAnswer=goodAnswer;var _startPosition=self.page.leftToRight?0:self.answer.length-1;self.setElementFocus(_startPosition),_setCookies()};var _getAnswer=function(operands){for(var _correctAnswer=operands[0].value,i=1;i<self.numberOfOperands;i++)"+"===self.page.operationSymbol?_correctAnswer+=self.operands[i].value:"-"===self.page.operationSymbol?_correctAnswer-=self.operands[i].value:"X"===self.page.operationSymbol&&(_correctAnswer*=self.operands[i].value);return _correctAnswer.toString()},_buildExpectedAnswer=function(){self.numberOfOperands=self.operands.length;var _i,_correctAnswerDigits=_getAnswer(self.operands).split(""),_numberOfExpectedDigits=_correctAnswerDigits.length,_zeroDigits=0;for(self.answer=[],"Subtraction"===self.page.operation&&(_zeroDigits=self.operands[0].value.toString().length-_numberOfExpectedDigits),_i=0;_i<_zeroDigits;_i++)self.answer.push({position:_i,correctValue:0,inputValue:""});for(_i=0;_i<_numberOfExpectedDigits;_i++){var _answerDigit={position:_zeroDigits+_i,correctValue:Number(_correctAnswerDigits[_i]),inputValue:""};self.answer.push(_answerDigit)}};self.setElementFocus=function(position){position<=self.answer.length-1&&window.setTimeout(function(){angular.element(".app-input."+position).focus(),angular.element(".app-input."+position).select()},50)},self.setElementFocusAfterInput=function(position){self.page.leftToRight?position<self.answer.length-1&&"number"==typeof self.answer[position].inputValue&&self.setElementFocus(position+1):position>0&&"number"==typeof self.answer[position].inputValue&&self.setElementFocus(position-1)};var _askQuestion=function(){self.operands=mathServices.getOperands(self.page),_buildExpectedAnswer()};self.markTimerAsNotIdle=function(){timerService.activityDetected()},self.getTimer=function(){return timerService.getTimer()},function(){self.page=$location.search(),self.page.appTitle=APP_TITLE,self.page.operation=$routeParams.operationId,self.page.id=mathServices.getUserName(self.page)+self.page.operation+self.page.level,self.page.scoreLabel="Score",self.page.leftToRight="M1"===self.page.level,_getCookies(),$cookies.put("LastActivity",self.page.level),_askQuestion(),self.page.timer=timerService.startTimer($cookies.get(self.page.id+"Time")||0),timerService.stopOnIdle(_timerIdleSeconds),$scope.$on("$destroy",function(){timerService.stopTimer()})}()}])}(),function(){"use strict";function ttAdditionView(){return{restrict:"E",templateUrl:"tt-addition.template.html"}}angular.module("tirats").directive("ttAdditionView",[ttAdditionView])}(),function(){"use strict";function ttDivisionView(){return{restrict:"E",templateUrl:"tt-division.template.html"}}angular.module("tirats").directive("ttDivisionView",[ttDivisionView])}(),function(){"use strict";function ttHeaderView(){return{restrict:"E",templateUrl:"tt-header.template.html"}}angular.module("tirats").directive("ttHeaderView",[ttHeaderView])}(),function(){"use strict";function ttMultiplicationView(){return{restrict:"E",templateUrl:"tt-multiplication.template.html"}}angular.module("tirats").directive("ttMultiplicationView",[ttMultiplicationView])}(),function(){"use strict";function ttSubtractionView(){return{restrict:"E",templateUrl:"tt-subtraction.template.html"}}angular.module("tirats").directive("ttSubtractionView",[ttSubtractionView])}(),function(){"use strict";angular.module("tirats").factory("mathServices",[function(){var _maxNumber,_minNumber,_maxNumber2,_minNumber2,_operands=[],_setupPage=function(page){"Multiplication"!==page.operation?(page.title=page.custom?"Custom ":page.digit+"-Digit ",page.title+=page.operation,page.description="Numbers between "+page.min+" and "+page.max,_maxNumber=Number(page.max),_minNumber=Number(page.min),page.custom&&(_minNumber2=Number(page.min2),_maxNumber2=Number(page.max2))):(page.title=page.operation+" by "+page.digit+" digits",page.description="Numbers to "+page.max,_maxNumber=Number(page.max),"1"===page.digit?(_maxNumber2=9,_minNumber=0):"2"===page.digit?(_maxNumber2=99,_minNumber=10):"3"===page.digit?(_maxNumber2=999,_minNumber=100):"4"===page.digit&&(_maxNumber2=9999,_minNumber=1e3))},_randomIntFromInterval=function(min,max){return Math.floor(Math.random()*(max-min+1)+min)},_getOperands=function(page){var i,_numberOfOperands=2;if(_operands.length=0,_setupPage(page),"Addition"===page.operation&&page.custom)page.operationSymbol="+",_operands=[{value:_randomIntFromInterval(_minNumber,_maxNumber)},{value:_randomIntFromInterval(_minNumber2,_maxNumber2)}];else if("Addition"===page.operation)for(page.operationSymbol="+",_numberOfOperands=_randomIntFromInterval(2,3),i=0;i<_numberOfOperands;i++)_operands.push({value:_randomIntFromInterval(_minNumber,_maxNumber)});else if("Subtraction"===page.operation&&page.custom){page.operationSymbol="-",_operands=[{value:_randomIntFromInterval(_minNumber,_maxNumber)}];var max=_maxNumber2>_operands[0].value?_operands[0].value:_maxNumber2;_operands.push({value:_randomIntFromInterval(_minNumber2,max)})}else if("Subtraction"===page.operation)for(page.operationSymbol="-",i=0;i<_numberOfOperands;i++)i?_operands.push({value:_randomIntFromInterval(_minNumber,_operands[0].value)}):_operands.push({value:_randomIntFromInterval(_minNumber,_maxNumber)});else if("Multiplication"===page.operation)for(page.operationSymbol="X",i=0;i<_numberOfOperands;i++)i?_operands.push({value:_randomIntFromInterval(_minNumber,_maxNumber2)}):_operands.push({value:_randomIntFromInterval(_minNumber,_maxNumber)});return _operands},_getUserName=function(page){return page.userName="Tirat",page.userName};return{getOperands:_getOperands,getUserName:_getUserName}}])}(),function(){"use strict";angular.module("tirats").factory("timerService",["$interval",function($interval){var _idleMark,_stopper,_timer,_startTimer=function(fromStart){return _timer=_timer||{},_timer.isOn||(_timer.isOn=!0,_timer.idle=0,_timer.value=fromStart||0,_stopper=$interval(function(){_timer.value++,_timer.idle++,_idleMark&&_timer.idle>=_idleMark&&(_stopTimer(),_timer.value-=_idleMark,_timer.idle=0),_setTimerDisplay()},1e3)),_timer},_stopTimer=function(){_timer.isOn=!1,angular.isDefined(_stopper)&&($interval.cancel(_stopper),_stopper=void 0)},_stopOnIdle=function(idleSeconds){_idleMark=idleSeconds},_activityDetected=function(){_timer.idle=0,_timer.isOn||_startTimer(_timer.value)},_setTimerDisplay=function(){_timer.hours=_addZeroToTheLeft(Math.floor(_timer.value/3600)),_timer.minutes=_addZeroToTheLeft(Math.floor(_timer.value/60%60)),_timer.seconds=_addZeroToTheLeft(Math.floor(_timer.value%60))},_addZeroToTheLeft=function(value){return value<10&&(value="0"+value),value},_getTimer=function(seconds){return"undefined"!=typeof seconds&&(_timer={},_timer.value=seconds),_setTimerDisplay(),_timer.hours+":"+_timer.minutes+":"+_timer.seconds};return{startTimer:_startTimer,stopTimer:_stopTimer,stopOnIdle:_stopOnIdle,activityDetected:_activityDetected,getTimer:_getTimer}}])}(),angular.module("tirats").run(["$templateCache",function($templateCache){$templateCache.put("tt-addition.template.html",'<ul class="panel-body list-group">\n    <li class="list-group-item"><a href="#/Addition?digit=1&max=9&min=0&level=A1">By 1 digit</a> \n        <div ng-if="appCtrl.hasScore(\'AdditionA1\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'AdditionA1\')}}" class="app-badge">{{ appCtrl.getScore(\'AdditionA1\') }}</div></li>\n    <li class="list-group-item"><a href="#/Addition?digit=2&max=99&min=10&level=A2">By 2 digit</a> \n        <div ng-if="appCtrl.hasScore(\'AdditionA2\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'AdditionA2\')}}" class="app-badge">{{ appCtrl.getScore(\'AdditionA2\') }}</div></li>\n    <li class="list-group-item"><a href="#/Addition?digit=3&max=999&min=100&level=A3">By 3 digit</a> \n        <div ng-if="appCtrl.hasScore(\'AdditionA3\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'AdditionA3\')}}" class="app-badge">{{ appCtrl.getScore(\'AdditionA3\') }}</div></li>\n    <li class="list-group-item"><a href="#/Addition?digit=4&max=9999&min=1000&level=A4">By 4 digit</a> \n        <div ng-if="appCtrl.hasScore(\'AdditionA4\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'AdditionA4\')}}" class="app-badge">{{ appCtrl.getScore(\'AdditionA4\') }}</div></li>\n    <li class="list-group-item"><a href="#/Addition?custom=true&max2=9&min2=0&max=19&min=0&level=AC">Addition - custom</a> \n        <div ng-if="appCtrl.hasScore(\'AdditionAC\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'AdditionAC\')}}" class="app-badge">{{ appCtrl.getScore(\'AdditionAC\') }}</div></li>\n</ul>'),$templateCache.put("tt-division.template .html",'<ul class="panel-body list-group">    \n    <li class="list-group-item"></li>\n    <li class="list-group-item"></li>\n    <li class="list-group-item"></li>\n    <li class="list-group-item"></li>\n    <li class="list-group-item"></li>\n    <li class="list-group-item"></li>\n    <li class="list-group-item"></li>\n</ul>\n'),$templateCache.put("tt-division.template.html","<div style=\"padding-left:90px;\">\n    <p>Wait up ... they don't love you like I love you,</p>\n    <p> Wait up ... </p>\n    <p>they don't love you like I love you,</p>\n    <p> Wait up ... </p>\n    <p>they don't love you like I love you,</p>\n    <p> Wait up ... </p>\n</div>"),$templateCache.put("tt-header.template.html",'<div class="page-header">\n    <h2><a href="#/">{{ appCtrl.appTitle }}</a></h2>\n</div>\n'),$templateCache.put("tt-multiplication.template.html",'<ul class="panel-body list-group">    \n    <li class="list-group-item"><a href="#/Multiplication?max=9&digit=1&level=M1">Numbers to 9 by 1 digit</a> \n        <div ng-if="appCtrl.hasScore(\'MultiplicationM1\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'MultiplicationM1\')}}" class="app-badge">{{ appCtrl.getScore(\'MultiplicationM1\') }}</div></li>\n    <li class="list-group-item"><a href="#/Multiplication?max=100&digit=1&level=M2">Numbers to 99 by 1 digit</a> \n        <div ng-if="appCtrl.hasScore(\'MultiplicationM2\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'MultiplicationM2\')}}" class="app-badge">{{ appCtrl.getScore(\'MultiplicationM2\') }}</div></li>\n    <li class="list-group-item"><a href="#/Multiplication?max=1000&digit=1&level=M3">Numbers to 999 by 1 digit</a> \n        <div ng-if="appCtrl.hasScore(\'MultiplicationM3\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'MultiplicationM3\')}}" class="app-badge">{{ appCtrl.getScore(\'MultiplicationM3\') }}</div></li>\n    <li class="list-group-item"><a href="#/Multiplication?max=10000&digit=1&level=M4">Numbers to 9999 by 1 digit</a> \n        <div ng-if="appCtrl.hasScore(\'MultiplicationM4\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'MultiplicationM4\')}}" class="app-badge">{{ appCtrl.getScore(\'MultiplicationM4\') }}</div></li>\n    <li class="list-group-item"><a href="#/Multiplication?max=100&digit=2&level=M5">Numbers to 99 by 2 digit</a> \n        <div ng-if="appCtrl.hasScore(\'MultiplicationM5\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'MultiplicationM5\')}}" class="app-badge">{{ appCtrl.getScore(\'MultiplicationM5\') }}</div></li>\n    <li class="list-group-item"><a href="#/Multiplication?max=1000&digit=2&level=M6">Numbers to 999 by 2 digit</a> \n        <div ng-if="appCtrl.hasScore(\'MultiplicationM6\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'MultiplicationM6\')}}" class="app-badge">{{ appCtrl.getScore(\'MultiplicationM6\') }}</div></li>\n    <li class="list-group-item"><a href="#/Multiplication?max=10000&digit=2&level=M7">Numbers to 9999 by 2 digit</a> \n        <div ng-if="appCtrl.hasScore(\'MultiplicationM7\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'MultiplicationM7\')}}" class="app-badge">{{ appCtrl.getScore(\'MultiplicationM7\') }}</div></li>\n</ul>\n'),$templateCache.put("tt-subtraction.template.html",'<ul class="panel-body list-group">    \n    <li class="list-group-item"><a href="#/Subtraction?digit=1&max=9&min=0&level=S1">By 1 digit</a> \n        <div ng-if="appCtrl.hasScore(\'SubtractionS1\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'SubtractionS1\')}}" class="app-badge">{{ appCtrl.getScore(\'SubtractionS1\') }}</div></li>\n    <li class="list-group-item"><a href="#/Subtraction?digit=2&max=99&min=10&level=S2">By 2 digit</a> \n        <div ng-if="appCtrl.hasScore(\'SubtractionS2\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'SubtractionS2\')}}" class="app-badge">{{ appCtrl.getScore(\'SubtractionS2\') }}</div></li>\n    <li class="list-group-item"><a href="#/Subtraction?digit=3&max=999&min=100&level=S3">By 3 digit</a> \n        <div ng-if="appCtrl.hasScore(\'SubtractionS3\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'SubtractionS3\')}}" class="app-badge">{{ appCtrl.getScore(\'SubtractionS3\') }}</div></li>\n    <li class="list-group-item"><a href="#/Subtraction?digit=4&max=9999&min=1000&level=S4">By 4 digit</a> \n        <div ng-if="appCtrl.hasScore(\'SubtractionS4\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'SubtractionS4\')}}" class="app-badge">{{ appCtrl.getScore(\'SubtractionS4\') }}</div></li>\n    <li class="list-group-item"><a href="#/Subtraction?custom=true&max2=9&min2=0&max=19&min=10&level=SC">Subtraction - custom</a> \n        <div ng-if="appCtrl.hasScore(\'SubtractionSC\')" ng-click="appCtrl.showPopover()" title="Current Score" data-toggle="popover" \n            data-content="Timer: {{appCtrl.getTimer(\'SubtractionSC\')}}" class="app-badge">{{ appCtrl.getScore(\'SubtractionSC\') }}</div></li>\n</ul>\n'),$templateCache.put("operation/operation.html",'<div class="app-lesson-jumbotron">\n    <div class="app-jumbotron-content">\n        <div class="app-user-name"><a href="#/">{{::operationCtrl.page.appTitle}}</a></div>\n        <div class="app-lesson-title">{{::operationCtrl.page.title}}</div>\n    </div>\n</div>\n<div class="row">\n    <div class="app-score">\n        <span title="{{operationCtrl.page.title + \' - \' + operationCtrl.page.description}}">{{::operationCtrl.page.level}}</span>\n        {{::operationCtrl.page.scoreLabel}}: {{operationCtrl.userScore}}\n        <div>\n            <span>{{operationCtrl.page.level}} Timer: {{ operationCtrl.getTimer() }}\n        </div>\n    </div>\n</div>\n<div class="row app-operation">\n    <div class="col-sm-6">\n        <form class="app-form" name="calcForm" novalidate ng-submit="operationCtrl.checkAnswer()">\n            <div class="app-operand" ng-repeat="number in operationCtrl.operands">\n                <div ng-if="$index===operationCtrl.numberOfOperands -1">{{operationCtrl.page.operationSymbol}} {{number.value}}</div>\n                <div ng-if="$index!==operationCtrl.numberOfOperands -1">{{number.value}}</div>\n            </div>\n            <div class="app-answer-separator">________________</div>\n            <input type="number" min="0" class="app-input {{digit.position}}" size="1" maxlength="1" ng-model="digit.inputValue" required\n               ng-repeat="digit in operationCtrl.answer | orderBy:digit.position"\n               ng-change="operationCtrl.setElementFocusAfterInput(digit.position)"\n               ng-keyup="operationCtrl.markTimerAsNotIdle()" ng-pattern="/[0-9]/"/>\n            <input ng-disabled="calcForm.$invalid" type="submit" class="btn btn-primary app-submit">\n        </form>\n    </div>\n    <div class="col-sm-6">\n    </div>\n</div>\n<div ng-init="operationCtrl.setElementFocus(operationCtrl.page.leftToRight ? 0 : operationCtrl.answer.length-1)"></div>\n'),$templateCache.put("landing/tirats.html",'<tt-header-view></tt-header-view>\n<div class="panel-group" id="accordion">\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h4 class="panel-title">\n          <button type="button" class="btn btn-info btn-lg btn-block" data-toggle="collapse" data-parent="#accordion" data-target="#addition">Addition</button>\n        </h4> \n      </div>\n      <div id="addition" class="panel-collapse collapse" ng-class="{in: appCtrl.appLastActivity.charAt(0)===\'A\'}">\n        <tt-addition-view></tt-addition-view>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h4 class="panel-title">\n          <button type="button" class="btn btn-info btn-lg btn-block" data-toggle="collapse" data-parent="#accordion" data-target="#subtraction">Subtration</button>\n        </h4>\n      </div>\n      <div id="subtraction" class="panel-collapse collapse" ng-class="{in: appCtrl.appLastActivity.charAt(0)===\'S\'}">\n        <tt-subtraction-view></tt-subtraction-view>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h4 class="panel-title">\n          <button type="button" class="btn btn-info btn-lg btn-block" data-toggle="collapse" data-parent="#accordion" data-target="#multiplication">Multiplication</button>\n        </h4>\n      </div>\n      <div id="multiplication" class="panel-collapse collapse" ng-class="{in: appCtrl.appLastActivity.charAt(0)===\'M\'}">\n        <tt-multiplication-view></tt-multiplication-view>\n      </div>\n    </div>\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h4 class="panel-title">\n          <button type="button" class="btn btn-info btn-lg btn-block" data-toggle="collapse" data-parent="#accordion" data-target="#division">Division</button>\n        </h4>\n      </div>\n      <div id="division" class="panel-collapse collapse" ng-class="{in: appCtrl.appLastActivity.charAt(0)===\'D\'}">\n        <tt-division-view></tt-division-view>\n      </div>\n    </div>\n  </div> \n')}]);