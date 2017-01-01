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

function UserListController($scope, $http) {
  $scope.users = [];
  $scope.previous = null;
  $scope.next = 'https://api.github.com/users';
  var loading = false;

  $scope.loadMore = function() {
    if ($scope.next && $scope != $scope.previous) {
      if (!loading) {
        loading = true;
        $http.get($scope.next).then(function (response) {
          if (response.status === 200) {
            $scope.users = $scope.users.concat(response.data);
            $scope.previous = $scope.next;
            const paginationHeader = response.headers('Link');
            if (paginationHeader) {
              const pagination = parsePaginationLinks(paginationHeader);
              $scope.next = pagination['next'];
            }
            loading = false;
          }
        }, function (error) {
          throw Error(error.statusText);
        });
      }
    }
  };

  $scope.loadCard = function(user) {
    var url = 'https://api.github.com/users/' + user.login;
    $http.get(url).then(function(response) {
      if (response.status === 200) {
        var loadedUser = response.data;
        loadedUser.loaded = true;
        $scope.users[$scope.users.indexOf(user)] = loadedUser;
      }
    });
  };

  $scope.loadMore();
}

angular.module('userList').component('userList', {
  templateUrl: 'user-list/user-list.template.html',
  controller: UserListController
});
