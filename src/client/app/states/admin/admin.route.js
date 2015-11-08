(function() {
  'use strict';

  angular
  .module('app.admin')
  .run(appRun);

  appRun.$inject = ['$rootScope', '$state', 'routerHelper'];
  /* @ngInject */
  function appRun($rootScope, $state, routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
    {
      state: 'admin',
      config: {
        url: '/admin',
        templateUrl: 'app/states/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        title: 'Admin',
        settings: {
          nav: 2,
          content: '<i class="fa fa-lock"></i> Admin'
        }
      }
    }
  ]};
})();