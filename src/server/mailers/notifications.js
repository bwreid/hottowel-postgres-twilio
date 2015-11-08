var Mailer = require('./mailer');

var sendMatchEmail = function (options) {  
  var messageOptions = {
    messageDetails: {
      to: options.to,
      from: 'Wes Reid <wesley.reid@galvanize.com>',
      subject: 'You\'ve got a match!'
    },
    template: './src/views/emails/notifications/match.html'
  };

  var mailer = new Mailer();
  mailer.sendMail(messageOptions);
};

var notifiationsMailer = {
  sendMatchEmail: sendMatchEmail
};

module.exports = notifiationsMailer;