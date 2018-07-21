const Paubox = require('../index');

Paubox.setApiKey('24f5564f0265ad1120e72eb4d6c045a5');
Paubox.setApiUsername('trylevel');
Paubox.isTestMode(true);

const data = {
  to: 'Brian Mwadime <brian@trylevel.com>',
  from: 'founders@trylevel.com',
  subject: 'Tests',
  // text: 'Hello World!',
  html: '<strong>Hello World!</strong>'
};
Paubox.send(data);