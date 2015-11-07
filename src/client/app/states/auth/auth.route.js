(function () {
  'use strict';

  angular
    .module('app.auth')
    .run(appRun);

  appRun.$inject = ['routerHelper'];

  function appRun (routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates () {
    return [
      {
        state: 'login',
        config: {
          url: '/login',
          templateUrl: '/app/states/auth/auth.html',
          controller: 'AuthController',
          controllerAs: 'vm',
          title: 'Auth'
        }
      },
      {
        state: 'logout',
        config: {
          url: '/logout',
          templateUrl: '/app/states/auth/auth.html',
          controller: 'AuthController',
          controllerAs: 'vm',
          title: 'Auth',
          settings: {
            nav: 3,
            content: '<i class="fa fa-lock"></i> Logout'
          }
        }
      }
    ];
  }
})();