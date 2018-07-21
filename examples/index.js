const Paubox = require('../index');

Paubox.setApiKey('API KEY');
Paubox.setApiUsername('username');
Paubox.isTestMode(true);

const data = {
  to: 'Brian Mwadime <brian@trylevel.com>',
  from: 'founders@trylevel.com',
  subject: 'Tests',
  // text: 'Hello World!',
  html: '<strong>Hello World!</strong>'
};
Paubox.send(data);