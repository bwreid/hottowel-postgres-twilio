(function () {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'hottowelPostgresTwilio',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
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

    vm.selectPerson = selectPerson;

    function selectPerson (username, selection) {
      var selected = vm.people.filter(function (person) {
        return person.username == username;
      })[0];

      selected.status = selection;

      if ( selected.status == selected.likesYou ) {
        vm.matchedPerson = selected;
        $('#myModal').modal('show');
      }
    }

    vm.connectUsers = connectUsers;
    
    function connectUsers (user) {
      var connectedUserEmail = $('#matchEmail').val();
      var connectedUserPhone = $('#matchPhone').val();

      vm.warnings = {};
      if ( !(connectedUserEmail || connectedUserPhone) ) {
        vm.warnings.required = 'Email or phone is required to send a message.'
      }

      if ( connectedUserEmail && !validator.isEmail(connectedUserEmail) ) {
        vm.warnings.email = 'Your email is in an incorrect format.';
      }

      if ( connectedUserPhone && !validator.isEmail(connectedUserPhone) ) {
        vm.warnings.phone = 'Your phone is in an incorrect format. (Only numbers)';
      }

      if ( !vm.warnings.length && ( connectedUserEmail || connectedUserPhone ) ) {
        if ( connectedUserEmail ) {
          console.log('Sending email to', connectedUserEmail);
        }

        if ( connectedUserPhone ) {
          console.log('Sending text message to', connectedUserPhone);
        }

        if ( user ) {
          if ( user.email ) {
            console.log('Copying on the email', user.email);
          }

          if ( connectedUserPhone ) {
            console.log('Copying on the email', connectedUserPhone);
          }
          
        }
        $('#myModal').modal('hide');
      }
    }
  }
})();
