(function () {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'matchservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, matchservice, logger) {
    var vm = this;
    vm.people = [];
    vm.title = 'Dashboard';

    activate();

    function activate () {
      var promises = [getPeople()];
      return $q.all(promises);
    }

    function getPeople () {
      return dataservice.getPeople().then(function (data) {
        vm.people = data;
        return vm.people;
      });
    }

    vm.attemptMatch = function (options) {
      options.modalID = '#myModal';
      var response = matchservice.attemptMatch(options);
      vm.matchedUser = response.user;
    };

    vm.connectUsers = function () {
      var options = {
        matchedUser : vm.matchedUser,
        emailFieldID : '#matchEmail',
        phoneFieldID : '#matchPhone'
      };
      
      var response = matchservice.connectUsers(options);
      
      if ( response.warnings ) {
        vm.warnings = response.warnings;  
      } else {
        logger.success('Sent a ' +response.success.join(' and ')+ 
                       ' to ' +vm.matchedUser.name + '!');
        $('#myModal').modal('hide');
      }
    };
  }
})();
