var _             = require('underscore-node');
var fs            = require('fs');
var nodemailer    = require('nodemailer');
var sesConfig     = require('../config/amazon-ses');
var sesTransport  = require('nodemailer-ses-transport');
var stubTransport = require('nodemailer-stub-transport');
var htmlToText    = require('nodemailer-html-to-text').htmlToText;

var Mailer = function () {
  this.options = {
    accessKeyId: sesConfig.accessKeyId,
    secretAccessKey: sesConfig.secretAccessKey,
    rateLimit: 5,
    region: 'us-west-2'
  };

  this.amazonKeysPresent = function () {
    return ( sesConfig.accessKeyId && sesConfig.secretAccessKey );
  };

  this.createTransporter = function (options) {
    if ( !this.amazonKeysPresent() ){
      return nodemailer.createTransport(stubTransport());
    } else {
      var opt = ( options ) ? _.extend(options, this.options) : this.options;
      return nodemailer.createTransport(sesTransport(opt));
    }
  };

  this.logMessages = function (err, info) {
    var message = ( info && info.response ) ? info.response.toString() : info;
    var resp = err || message;
    console.log(resp);
  };

  this.sendMail = function (options) {
    var html = fs.readFileSync(options.template, 'utf8');
    var opts = _.extend(options.messageDetails, { html: html });

    var transporter = this.createTransporter();
    transporter.use('compile', htmlToText(opts));

    transporter.sendMail(opts, this.logMessages);
  };
};

module.exports = Mailer;