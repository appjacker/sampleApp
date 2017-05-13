var app = angular.module('app', ['ui.router', 'ngMessages', 'toastr' ,'home', 'register']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {  
	// $locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise( '/home' );
	$httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
  $httpProvider.defaults.useXDomain = true;
// $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
 
});
