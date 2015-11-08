var express             = require('express'),
    router              = express.Router(),
    notificationsMailer = require('../mailers/notifications');

router.post('/notifications/match', function (req, res, next) {
  notificationsMailer.sendMatchEmail(req.body);
  res.send(200);
});

module.exports = router;