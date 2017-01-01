/**
 * Created by maiko on 30/12/2016.
 */

function RepositoryListController($http, $routeParams, $scope) {
  $scope.repos = [];
  $scope.previous = null;
  $scope.next = 'https://api.github.com/users/'+ $routeParams.username + '/repos';
  var loading = false;

  $scope.loadMoreRepos = function () {
    if ($scope.next && $scope != $scope.previous) {
      if (!loading) {
        loading = true;
        $http.get($scope.next).then(function(response) {
          if (response.status === 200) {
            $scope.repos = $scope.repos.concat(response.data);
            $scope.previous = $scope.next;
            const paginationHeader = response.headers('Link');
            if (paginationHeader) {
              const pagination = parsePaginationLinks(paginationHeader);
              $scope.next = pagination['next'];
            }
            loading = false;
          }
        }, function(error) {
          throw Error(error.statusText);
        });
      }
    }
  };
  $scope.loadMoreRepos();
}

angular.
module('repositoryList').
component('repositoryList', {
  templateUrl: 'repository-list/repository-list.template.html',
  controller: ['$http', '$routeParams', '$scope', RepositoryListController]
});
