/**
 * Created by maiko on 30/12/2016.
 */
'use strict';

angular.
module('usersGitHubApp').
config(['$locationProvider' ,'$routeProvider', '$mdThemingProvider',
  function config($locationProvider, $routeProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('red');

    $locationProvider.hashPrefix('!');

    $routeProvider.
    when('/users', {
      template: '<user-list></user-list>'
    }).
    when('/users/:username', {
      template: '<user-detail></user-detail>'
    }).
    when('/users/:username/repos', {
      template: '<repository-list></repository-list>'
    }).
    otherwise('/users');
  }
]);
