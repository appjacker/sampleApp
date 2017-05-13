var register = angular.module('register', []);
register.config(function($stateProvider, $urlRouterProvider) 
{
	$stateProvider.state('register', 
	{
		url: '/register',
		templateUrl: '/js/register/register.tpl',
		controller: 'registerCtrl',
	});
}).controller('registerCtrl', function($rootScope, $scope, $state, $stateParams, toastr, RegisterService){
	
	$scope.botCtrl = {
		isSubmitted : false,
		progress: false
	};

	$scope.User = {};

	$scope.submitForm = function(registerForm){
		if(registerForm.$valid){
			$scope.botCtrl.isSubmitted = false;
			RegisterService.submitForm($scope.user).success(function(res){
				console.log(res);
			});
			console.log($scope.user);
		}else{
			$scope.botCtrl.isSubmitted = true;
		}
	};

});