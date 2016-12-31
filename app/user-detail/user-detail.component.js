/**
 * Created by maiko on 30/12/2016.
 */
function UserDetailController($routeParams, $resource) {
  var self = this;

  self.user = $resource('https://api.github.com/users/:username').get({
    username: $routeParams.username
  }, function(user) {
    return user.data;
  });
}

angular.
module('userDetail').
component('userDetail', {
  templateUrl: 'user-detail/user-detail.template.html',
  controller: ['$routeParams', '$resource', UserDetailController]
});
