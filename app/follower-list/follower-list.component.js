/**
 * Created by maiko on 30/12/2016.
 */
function FollowerListController($routeParams, $http) {
  var self = this;
  self.users = [];
  self.previous = null;
  self.next = 'https://api.github.com/users/' + $routeParams.username + '/followers';
  var loading = false;

  self.loadMore = function() {
    if (self.next && self.next !== self.previous) {
      if (!loading) {
        $http.get(self.next).then(function(response) {
          if (response.status === 200) {
            self.users = self.users.concat(response.data);
            const paginationHeader = response.headers('Link');
            const pagination = parsePaginationLinks(paginationHeader);
            self.previous = self.next;
            self.next = pagination['next'];
            loading = false;
          }
        });
      }
    }
  };

  self.loadMore();
}

angular.module('followerList', []).
  component('followerList', {
    templateUrl: 'follower-list/follower-list.template.html',
    controller: ['$routeParams', '$http', FollowerListController]
});
