var home = angular.module('home', []);
home.config(function($stateProvider, $urlRouterProvider) 
{
	$stateProvider.state('home', 
	{
		url: '/home',
		templateUrl: '/js/home/home.tpl',
		controller: 'homeCtrl',
	});
}).controller('homeCtrl', function($rootScope, $scope, $state, $stateParams, toastr){
	
	$scope.botCtrl = {
		isSubmitted : false,
		progress: false
	};
	$rootScope.grantAccess = false;
	$scope.answer = '';

	$scope.Validate = function(botForm){
		if(botForm.$valid){
			$scope.botCtrl.isSubmitted = false;

			if($scope.answer == '30'){
				$rootScope.grantAccess = true;
				$state.go('register');
			}else{
				toastr.error("Wrong Answer");
			}
		}else{
			$scope.botCtrl.isSubmitted = true;
		}
	};

});