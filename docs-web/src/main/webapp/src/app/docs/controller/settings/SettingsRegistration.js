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
    Restangular.one('registration', request.id).post('approve').then(function() {
      alert('Request approved successfully!');
      loadRequests(); // 重新加载列表
    }, function(error) {
      console.error('Failed to approve request:', error);
      alert('Failed to approve request.');
    });
  };

  // 拒绝注册请求
  $scope.rejectRequest = function(request) {
    Restangular.one('registration', request.id).post('reject').then(function() {
      alert('Request rejected successfully!');
      loadRequests(); // 重新加载列表
    }, function(error) {
      console.error('Failed to reject request:', error);
      alert('Failed to reject request.');
    });
  };

});