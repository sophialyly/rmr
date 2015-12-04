var indexModule = angular.module("indexModule", ['ngRoute', 'ngResource']);

indexModule.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	// Your code here

	$routeProvider
		.when('/about', {
			templateUrl: 'index-Views/about.html'
		})
		.when('/contact', {
			templateUrl: 'index-Views/contact.html'
		})
		.when('/addEvent', {
			templateUrl: 'index-Views/add-event.html'
		})
		.otherwise({templateUrl: 'index-Views/404.html'});

		// use the HTML5 History API
        $locationProvider.html5Mode(true);

}]);
indexModule.controller("AppCtrl1", function($scope){

	var app = this;

	app.isHidden = false;
	app.toggle = function() {
		app.isHidden = !app.isHidden;
	}

	$scope.visible = true;

	$scope.firstname = "myFirstName";
	$scope.lastname = "myLastName";

	$scope.printName = function() {
		return $scope.firstname + ' ' + $scope.lastname;
	}

	

});