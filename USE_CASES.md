This documentation provides examples for specific email use cases. Please [open an issue](https://github.com/Withinapp/paubox-nodejs/issues) or make a pull request for any email use cases you would like us to document here. Thank you!

# Table of Contents

* [Send a Single Email to a Single Recipient](#single-email-single-recipient)
* [BCC and Reply To](#cc-bcc-reply-to)
* [Advanced Usage](#advanced)
  * [Managing multiple API keys](#multipleapikeys)

<a name="single-email-single-recipient"></a>
# Send a Single Email to a Single Recipient

```js
const paubox = require('paubox-nodejs');
paubox.setApiKey(process.env.PAUBOX_API_KEY);
const msg = {
  to: 'recipient@example.org',
  from: 'sender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
paubox.send(msg);
```

<a name="cc-bcc-reply-to"></a>
# BCC and Reply To

You can specify the `bcc` and `replyTo` fields for more control over who you send the email to and where people will reply to:

```js
const msg = {
  to: 'recipient@example.org',
  bcc: ['me@example.org', 'you@example.org'],
  from: 'sender@example.org',
  replyTo: 'othersender@example.org',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<p>Hello HTML world!</p>',
};
```

<a name="advanced"></a>
# Advanced Usage

All other advanced settings are supported and can be passed in through the msg object according to the expected format as per the [API v1 documentation](https://www.paubox.com/solutions/email-api).

<a name="multipleapikeys"></a>
## Managing multiple API keys

In cases where you need to manage multiple instances of the mailer (or underlying client),
for example when you are using multiple API keys, you can import the mail service class and
instantiate new instances as required:

```js
const {MailService} = require('paubox-nodejs');

//Instantiate mailers
const paubox1 = new MailService();
const paubox2 = new MailService();

//Set different API keys
paubox1.setApiKey('KEY1');
paubox12.setApiKey('KEY2');

// Now send emails with the mailers as needed
```

<a name="kitchen-sink"></a>
## Kitchen Sink - an example with all settings used