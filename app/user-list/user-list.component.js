/**
 * Created by maiko on 30/12/2016.
 */
const parsePaginationLinks = function(linkStr) {
  return linkStr.split(',').map(function(rel) {
    return rel.split(';').map(function(current, index) {
      if (index === 0) return /<(.+)>/.exec(current)[1];
      if (index === 1) return /rel="(.+)"/.exec(current)[1];
      return current;
    })
  }).reduce(function(obj, current, i) {
    obj[current[1]] = current[0];
    return obj;
  }, {});
};

function UserListController($http) {
  var self = this;
  self.users = [];
  self.previous = null;
  self.next = 'https://api.github.com/users';
  var loading = false;

  self.loadMore = function() {
    if (self.next && self != self.previous) {
      if (!loading) {
        loading = true;
        $http.get(self.next).then(function (response) {
          if (response.status === 200) {
            console.log('loading more users');
            self.users = self.users.concat(response.data);
            self.previous = self.next;
            const paginationHeader = response.headers('Link');
            if (paginationHeader) {
              const pagination = parsePaginationLinks(paginationHeader);
              self.next = pagination['next'];
            }
            loading = false;
          }
        }, function (error) {
          throw Error(error.statusText);
        });
      }
    }
  };

  self.loadCard = function(user) {
    var url = 'https://api.github.com/users/' + user.login;
    $http.get(url).then(function(response) {
      if (response.status === 200) {
        var loadedUser = response.data;
        loadedUser.loaded = true;
        self.users[self.users.indexOf(user)] = loadedUser;
      }
    });
  };

  self.loadMore();
}

angular.module('userList').component('userList', {
  templateUrl: 'user-list/user-list.template.html',
  controller: UserListController
});
