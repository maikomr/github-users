/**
 * Created by maiko on 30/12/2016.
 */
angular.
module('core.user').
factory('User', ['$resource',
  function($resource) {
    return $resource('https://api.github.com/users/:username', {}, {
      query: {
        method: 'GET',
        params: {username: 'users'}
        // isArray: true
      }
    });
  }
]);
