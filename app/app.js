var usersGitHubApp = angular.module('usersGitHubApp', []);

usersGitHubApp.directive("whenScrolled", function ($window) {
  return {
    restrict: 'A',
    link: function (scope, element, attributes) {
      raw = element[0];
      var checkBounds = function (event) {
        var rectObject = raw.getBoundingClientRect();
        if ($window.innerHeight > rectObject.bottom - 1) {
          scope.$apply(attributes.whenScrolled);
        }
      };
      angular.element($window).bind('scroll load', checkBounds);
    }
  };
});
