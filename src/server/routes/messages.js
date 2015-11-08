var express             = require('express'),
    router              = express.Router(),
    notificationsMailer = require('../mailers/notifications'),
    notificationsTexter = require('../texter/notifications');

router.post('/notifications/match', function (req, res, next) {
  var message;
  if ( req.body.email ) {
    notificationsMailer.sendMatchEmail(req.body.messageOptions);
    message = 'Email attempt.';
  }
  
  if ( req.body.sms ) {
    notificationsTexter.sendMatchTexts(req.body.messageOptions);
    message = 'Text attempt.';
  }

  if ( !(req.body.email || req.body.sms) ) {
    message = 'No message type specified.';
  }

  res.status(201).send(message);
});

module.exports = router;