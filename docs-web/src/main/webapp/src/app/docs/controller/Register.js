'use strict';

/**
 * Register controller.
 */
angular.module('docs').controller('Register', function ($scope, $uibModalInstance, Restangular, $translate, $dialog) {
  $scope.username = '';
  $scope.password = '';
  $scope.confirmPassword = '';
  $scope.email = '';
  $scope.close = function (username) {
    $uibModalInstance.close(username);
  };

  console.log('Register controller');

  // Register function
  $scope.register = function (password, confirmPassword, username, email) {
    console.log(password, confirmPassword, username, email);
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      var title = $translate.instant('login.register_error_title');
      var msg = $translate.instant('login.register_error_message');
      var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
      $dialog.messageBox(title, msg, btns);
      return;
    }

    // Send a register email
    console.log('Registering user:', username);
    Restangular.one('user').post('register', {
      username: username,
      password: password,
      email: email
    }).then(function () {
      var title = $translate.instant('login.register_sent_title');
      var msg = $translate.instant('login.register_sent_message', { username: username });
      var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
      $dialog.messageBox(title, msg, btns);
    }, function () {
      var title = $translate.instant('login.register_error_title');
      var msg = $translate.instant('login.register_error_message');
      var btns = [{result: 'ok', label: $translate.instant('ok'), cssClass: 'btn-primary'}];
      $dialog.messageBox(title, msg, btns);
    });
  };
});
