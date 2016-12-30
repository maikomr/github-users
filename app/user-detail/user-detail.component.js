/**
 * Created by maiko on 30/12/2016.
 */
function UserDetailController($routeParams, User) {
  var self = this;
  self.user = User.get({username: $routeParams.username}, function(user) {
    return user.data;
  });
}

angular.
module('userDetail').
component('userDetail', {
  templateUrl: 'user-detail/user-detail.template.html',
  controller: ['$routeParams', 'User', UserDetailController]
});
