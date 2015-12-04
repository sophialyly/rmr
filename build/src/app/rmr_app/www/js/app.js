// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// angular.module('starter', ['ionic'])

(function() {



var app = angular.module('starter', ['ionic', 'angularMoment'])

/* javascripts Config stateProvider and urlRouterProvider */
app.controller('RedditCtrl', function($http, $scope){

	$scope.stories = [{'title' : 'First story'}, {'title' : 'Second story'}]
	$scope.stories = [];

	$http.get('https://www.reddit.com/r/Android/new/.json')
		 .success(function(response) {
		 	//console.log(response);
		 	angular.forEach(response.data.children, function(child){
		 		$scope.stories.push(child.data)
		 	})
		 });


});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


/* javascripts Config stateProvider and urlRouterProvider */
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {url: '/home', templateUrl:'views/home.html'})
  .state('thor', {url: '/thor', templateUrl:'views/thor.html'})
  .state('ironman', {url: '/ironman', templateUrl:'views/ironman.html'})
  .state('hulk', {url: '/hulk', templateUrl:'views/hulk.html'})
  .state('dpu', {url: '/dpu', templateUrl:'views/dpu.html'})
  .state('reddit', {url: '/reddit', templateUrl:'views/reddit.html'})

  $urlRouterProvider.otherwise('/home');
});

}());