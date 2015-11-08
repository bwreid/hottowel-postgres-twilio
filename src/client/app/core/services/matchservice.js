(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .factory('matchservice', matchservice);

  matchservice.$inject = ['$http', 'exception', 'logger'];

  function matchservice ($http, exception, logger) {
    var service = {
      attemptMatch : attemptMatch,
      connectUsers : connectUsers
    };

    return service;


    // Public Service Functions

    // see if two users match
    function attemptMatch (options) {
      options.user.yourPick = options.match;
      var yourPick = options.match,
          likesYou = options.user.likesYou;

      var response = {};
      if ( yourPick && (yourPick === likesYou) ) {
        $(options.modalID).modal('show');
        response.user = options.user;
      }
      
      return response;
    }

    // connect users if possible
    function connectUsers (options) {
      var matchedUser = options.matchedUser,
          email       = $(options.emailFieldID).val(),
          phone       = $(options.phoneFieldID).val();

      var warnings = validateMatchInput(email, phone);

      if ( !(_.isEmpty(warnings)) ) {
        var response = { warnings: warnings };
      } else {
        var response = sendMessages(email, phone, matchedUser);
      }

      return response;
    }


    // Private Service Functions
    
    // validate email and phone
    function validateMatchInput (email, phone) {
      var warnings = {};
      if ( !(email || phone) )
        warnings.required = 'Email or phone is required to send a message.'

      if ( email && !validator.isEmail(email) )
        warnings.email = 'Your email is in an incorrect format.';

      if ( phone && !validator.isMobilePhone(phone, 'en-US') )
        warnings.phone = 'Your phone is in an incorrect format. (Only numbers, 10 digits)';

      return warnings;
    }

    // fire off emails
    function sendMessages (email, phone, matchedUser) {
      var response = { success: [] };
      if ( email ) {
        var opts = { to: [email] };
        response.success.push('email');
        $http.post('/messages/notifications/match', { email: true, messageOptions: opts }).
              catch(function (error) {
                return exception.catcher('XHR Failed for sendMessages')(error);
              });
      };

      if ( phone ) {
        var opts = { to: [phone] };
        response.success.push('text');
        $http.post('/messages/notifications/match', { sms: true, messageOptions: opts }).
              catch(function (error) {
                return exception.catcher('XHR Failed for sendMessages')(error);
              });
      }

      return response;
    }
  }
})();