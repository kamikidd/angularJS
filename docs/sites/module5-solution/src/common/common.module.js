(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://nameless-mountain-47558.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
