const { MailService } = require('../index');

//Instantiate mailers
const Paubox1 = new MailService();
const Paubox2 = new MailService();

//Set different API keys
Paubox1.setApiKey('KEY1');
Paubox2.setApiKey('KEY2');