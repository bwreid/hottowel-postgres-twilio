var client       = require('twilio');
var twilioConfig = require('../config/twilio');

var Texter = function () {
  this.options = {
    accountSid: twilioConfig.accountSid,
    authToken: twilioConfig.authToken
  };

  this.twilioKeysPresent = function () {
    return ( twilioConfig.accountSid &&
             twilioConfig.authToken && 
             twilioConfig.fromPhoneNumber );
  };

  this.logMessages = function (err, responseData) {
    var resp = err || { from: responseData.from, body: responseData.body };
    console.log(resp);
  };

  this.formatNumber = function (number) {
    if ( number.substr(0,2) !== '+1' ) {
      number = '+1' + number;
    }

    return number;
  };

  this.sendText = function (options) {
    options.to   = this.formatNumber(options.to);
    if ( this.twilioKeysPresent() ) {
      options.from = twilioConfig.fromPhoneNumber;
      
      var textClient = client(twilioConfig.accountSid, twilioConfig.authToken);
      textClient.sendMessage(options, this.logMessages);
    } else {
      console.log('To send text messages, please provide configuration.');
      console.log(options);
    }
  };
};

module.exports = Texter;