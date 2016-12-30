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

usersGitHubApp.controller('UserListController', ['$scope', '$http', function($scope, $http) {
  $scope.users = [];
  $scope.next = null;
  var loading = false;

  $scope.loadMore = function() {
    if (!loading) {
      loading = true;
      var url = 'https://api.github.com/users';
      if ($scope.next) {
        url = $scope.next;
      }
      $http.get(url).then(function(response) {
        if (response.status === 200) {
          $scope.users = $scope.users.concat(response.data);
          const paginationHeader = response.headers('Link');
          const pagination = parsePaginationLinks(paginationHeader);
          $scope.next = pagination['next'];
          console.log($scope.next);
          loading = false;
        }
      }, function(error) {
        throw Error(error.statusText);
      });
    }
  };
}]);
