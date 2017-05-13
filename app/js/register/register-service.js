angular.module( 'register' ).factory( 'RegisterService', function( $http ) {
	return {

		submitForm: function(user){			
			return $http.post('http://requestb.in/qw3p9cqw', user);
		},
		
	};
} );