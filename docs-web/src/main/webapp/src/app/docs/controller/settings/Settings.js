'use strict';

/**
 * Settings controller.
 */
angular.module('docs').controller('Settings', function($scope, User, Restangular) {
  // Flag if the user is admin
  User.userInfo().then(function(data) {
    $scope.isAdmin = data.base_functions.indexOf('ADMIN') !== -1;

    // If the user is admin, fetch pending registration requests
    if ($scope.isAdmin) {
      Restangular.one('registration').getList('pending').then(function(pendingRequests) {
        $scope.pendingRegistrationCount = pendingRequests.length;
      }, function(error) {
        console.error('Failed to fetch pending registration requests:', error);
        $scope.pendingRegistrationCount = 0; // Default to 0 if there's an error
      });
    }
  });
});