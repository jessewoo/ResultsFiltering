'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '/views/brianford/partials/index',
        controller: IndexCtrl
    }).
    when('/addPost', {
        templateUrl: '/views/brianford/partials/addPost',
        controller: AddPostCtrl
    }).
    when('/readPost/:id', {
        templateUrl: '/views/brianford/partials/readPost',
        controller: ReadPostCtrl
    }).
    when('/editPost/:id', {
        templateUrl: '/views/brianford/partials/editPost',
        controller: EditPostCtrl
    }).
    when('/deletePost/:id', {
        templateUrl: '/views/brianford/partials/deletePost',
        controller: DeletePostCtrl
    }).
    otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
}]);