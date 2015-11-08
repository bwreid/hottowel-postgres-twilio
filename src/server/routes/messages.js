var express             = require('express'),
    router              = express.Router(),
    notificationsMailer = require('../mailers/notifications'),
    notificationsTexter = require('../texter/notifications');

router.post('/notifications/match', function (req, res, next) {
  if ( req.body.email ) {
    notificationsMailer.sendMatchEmail(req.body.emailOptions);
  }
  
  if ( req.body.sms ) {
    notificationsTexter.sendMatchTexts(req.body.smsOptions);
  }

  res.send(201);
});

module.exports = router;