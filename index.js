'use strict';

const mailer = require('./src/mail/mail');
const MailService = require('./src/mail/classes/mail-service');

module.exports = mailer;
module.exports.MailService = MailService;