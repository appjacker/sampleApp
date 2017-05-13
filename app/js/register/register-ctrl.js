var register = angular.module('register', []);
register.config(function($stateProvider, $urlRouterProvider) 
{
	$stateProvider.state('register', 
	{
		url: '/register',
		templateUrl: '/js/register/register.tpl',
		controller: 'registerCtrl',
	});
}).controller('registerCtrl', function($rootScope, $scope, $state, $stateParams, toastr){
	
	$scope.botCtrl = {
		isSubmitted : false,
		progress: false
	};

	

	// $scope.Validate = function(botForm){
	// 	if(botForm.$valid){
	// 		$scope.botCtrl.isSubmitted = false;

	// 		if($scope.answer == '30'){
	// 			$state.go('register');
	// 		}else{
	// 			toastr.error("Wrong Answer");
	// 		}
	// 	}else{
	// 		$scope.botCtrl.isSubmitted = true;
	// 	}
	// };

});