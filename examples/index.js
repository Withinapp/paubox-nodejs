const Paubox = require('../index');

Paubox.setApiKey('API KEY');
Paubox.setApiUsername('username');
Paubox.isTestMode(true);

const data = {
  to: 'Brian Mwadime <test.test@test.com>',
  from: 'test@test.com',
  subject: 'Tests',
  text: 'Hello World!',
  html: '<strong>Hello World!</strong>'
};
Paubox.send(data);