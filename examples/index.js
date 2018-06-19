const Paubox = require('../index');

Paubox.setApiKey('24f5564f0265ad1120e72eb4d6c045a5');
Paubox.setApiUsername('trylevel');
Paubox.isTestMode(true);

const data = {
  to: 'Brian Mwadime <brian.mwadime@gmail.com>',
  from: 'brian@trylevel.com',
  subject: 'Integration Tests',
  text: 'Hello World!',
  html: '<strong>Hello World!</strong>',
  // message: {
  //   recipients: [
  //     'Brian Mwadime <brian.mwadime@gmail.com>'
  //   ],
  //   headers: {
  //     from: 'brian@trylevel.com',
  //     subject: 'Integration Tests',
  //     'reply-to': 'brian@trylevel.com'
  //   },
  //   content: {
  //     'text/plain': 'Hello World!'
  //   }
  // }
};
Paubox.send(data);