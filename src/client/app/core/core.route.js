(function() {
  'use strict';

  angular
  .module('app.core')
  .run(appRun);

  /* @ngInject */
  function appRun($rootScope, $state, routerHelper) {
    var otherwise = '/404';
    routerHelper.configureStates(getStates(), otherwise);

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
      var isLogin = ( toState.name === 'login' );
      if ( isLogin ) { return; }
      if ( !$rootScope.user ) {
        event.preventDefault();
        $state.go('login');
      }
    });
  }

  function getStates() {
    return [
    {
      state: '404',
      config: {
        url: '/404',
        templateUrl: 'app/core/404.html',
        title: '404'
      }
    }
    ];
  }
})();
