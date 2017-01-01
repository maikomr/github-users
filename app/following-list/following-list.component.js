/**
 * Created by maiko on 30/12/2016.
 */
function FollowingListController($routeParams, $http) {
  var self = this;
  self.users = [];
  self.previous = null;
  self.next = 'https://api.github.com/users/' + $routeParams.username + '/following';
  var loading = false;

  self.loadMore = function () {
    if (self.next && self.next !== self.previous) {
      if (!loading) {
        loading = true;
        $http.get(self.next).then(function (response) {
          if (response.status === 200) {
            console.log('loading more following users');
            self.users = self.users.concat(response.data);
            self.previous = self.next;
            const paginationHeader = response.headers('Link');
            if (paginationHeader) {
              const pagination = parsePaginationLinks(paginationHeader);
              self.next = pagination['next'];
            }
            loading = false;
          }
        });
      }
    }
  };
  self.loadMore();
}

angular.module('followingList', []).
component('followingList', {
  templateUrl: 'following-list/following-list.template.html',
  controller: ['$routeParams', '$http', FollowingListController]
});
