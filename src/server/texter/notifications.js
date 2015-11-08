var Texter = require('./texter');

var sendMatchTexts = function (options) {
  var texter = new Texter();
  options.to.forEach(function (phoneNumber) {
    texter.sendText({ to: phoneNumber,
                      body: 'You\'ve got a match!'});
  });
}

var notificationsTexter = {
  sendMatchTexts: sendMatchTexts
}

module.exports = notificationsTexter;