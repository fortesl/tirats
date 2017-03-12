/**
 * Created by lfortes on 8/6/16.
 */
(function() {
    'use strict';

    angular.module('tirats').factory('timerService', ['$interval', function ($interval) {
        var _idleMark, _stopper, _timer;

        var _startTimer = function (fromStart) {
            _timer = _timer || {};
            if (!_timer.isOn) {
                _timer.isOn = true;
                _timer.idle = 0;
                _timer.value = fromStart || 0;
                _stopper = $interval(function () {
                    _timer.value++;
                    _timer.idle++;
                    if (_idleMark && _timer.idle >= _idleMark) {
                        _stopTimer();
                        _timer.value -= _idleMark;
                        _timer.idle = 0;
                    }
                    _setTimerDisplay();
                }, 1000);
            }
            return _timer;
        };

        var _stopTimer = function() {
            _timer.isOn = false;
            if (angular.isDefined(_stopper)) {
                $interval.cancel(_stopper);
                _stopper = undefined;
            }
        };

        var _stopOnIdle = function(idleSeconds) {
            _idleMark = idleSeconds;
        };

        var _activityDetected = function() {
            _timer.idle = 0;
            if (!_timer.isOn) {
                _startTimer(_timer.value);
            }
        };

        var _setTimerDisplay = function() {
            _timer.hours = _addZeroToTheLeft(Math.floor(_timer.value / 3600));
            _timer.minutes = _addZeroToTheLeft(Math.floor((_timer.value / 60) %60));
            _timer.seconds = _addZeroToTheLeft(Math.floor(_timer.value % 60));
        };

        var _addZeroToTheLeft = function(value) {
            if (value < 10) {
                value = "0" + value;
            }
            return value;
        };

        return {
            startTimer: _startTimer,
            stopTimer: _stopTimer,
            stopOnIdle: _stopOnIdle,
            activityDetected: _activityDetected
        };
    }]);

})();