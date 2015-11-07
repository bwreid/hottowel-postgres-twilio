(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$rootScope', '$state', 'logger'];

  function AuthController ($rootScope, $state, logger) {
    var vm = this;
    vm.title = 'Auth';

    vm.actions = {
      loginUser: loginUser
    };

    // logout
    if ( $state.current.name == 'logout' ) {      
      $rootScope.user = null;
      $state.go('login', {}, { reload: true });
      logger.info('See you later!');
    };

    // actions
    function loginUser () {
      var user = { email: 'wesley.reid@galvanize.com', nickname: 'Wes' };
      logger.success('Welcome ' +user.nickname+ '!');
      $rootScope.user = user;
      $state.go('dashboard');
    }
  }
})();