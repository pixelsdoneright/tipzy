'use strict';

var app = angular.module('tipzyApp', ['ngRoute','ajoslin.mobile-navigate']);


app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/home'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: ''
    })
    .when('/split', {
    	templateUrl: 'viewa/split.html',
    	controller:'splitController'
    })
});