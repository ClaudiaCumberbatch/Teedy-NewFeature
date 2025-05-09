angular.module('docs').controller('SettingsRegistration', function($scope, Restangular) {

  /**
   * Load registrations from server.
   */
  $scope.loadRequests = function() {
    Restangular.one('userRegistration/list').get({
      sort_column: 1,
      asc: true
    }).then(function(data) {
      console.log('Loaded registration requests:', data);
      $scope.requests = data.requests;
    });
  };
  
  $scope.loadRequests();

  // 批准注册请求
  $scope.approveRequest = function(request) {
    Restangular.one('userRegistration/approveRegistration').put({
      id: request.id,
    }).then(function() {
      alert('Request approved successfully!');
      console.log('Request approved:', request);
      $scope.loadRequests(); // 重新加载列表
      console.log('fresh page');
    }, function(error) {
      console.error('Failed to approve request:', error);
      alert('Failed to approve request.');
    });

    Restangular.one('user').customPUT({
      username: request.username,
      password: request.password,
      email: request.email,
      storage_quota: "10"
    }, '', {}, {
      'Content-Type': 'application/x-www-form-urlencoded'
    }).then(function() {
      console.log('user/register', request);
    }, function(error) {
      console.error('Failed to register user:', error);
      alert('Failed to register user.');
    });

  };

  // 拒绝注册请求
  $scope.rejectRequest = function(request) {
    Restangular.one('registration', request.id).post('reject').then(function() {
      alert('Request rejected successfully!');
      $scope.loadRequests(); // 重新加载列表
    }, function(error) {
      console.error('Failed to reject request:', error);
      alert('Failed to reject request.');
    });
  };

});