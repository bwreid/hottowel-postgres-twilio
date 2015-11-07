(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$window', 'logger'];
    /* @ngInject */
    function AdminController($window, logger) {
        var vm = this;
        vm.title = 'Admin';
    }
})();
