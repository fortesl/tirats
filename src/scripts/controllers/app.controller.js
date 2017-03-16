(function() 
    { 	
        'use strict'; 	

        angular.module('tirats').controller('appController', ['APP_TITLE', 'APP_USERNAME', '$cookies', 'timerService', appController]);

        function appController(APP_TITLE, APP_USERNAME, $cookies, timerService) {
            var self = this;

            self.appTitle = APP_TITLE;
            self.appUserName = APP_USERNAME;
            self.appLastActivity = $cookies.get('LastActivity') || '0';

            self.hasScore = function(operation) {
                return document.cookie.indexOf(self.appUserName + operation + 'Score')>-1;
            };

            self.showPopover = function() {
                angular.element('[data-toggle="popover"]').popover();   
            };

            self.getScore = function(operation) {
                return $cookies.get(self.appUserName + operation + 'Score') || '';
            };

            self.getTimer = function(operation) {
                var _seconds = $cookies.get(self.appUserName + operation + 'Time') || 0;
                return timerService.getTimer(_seconds);
            };
        }

    })();