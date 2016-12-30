/**
 * Created by maiko on 30/12/2016.
 */
'use strict';

angular.
module('usersGitHubApp').
config(['$locationProvider' ,'$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
    when('/users', {
      template: '<user-list></user-list>'
    }).
    when('/users/:username', {
      template: '<user-detail></user-detail>'
    }).
    otherwise('/users');
  }
]);
