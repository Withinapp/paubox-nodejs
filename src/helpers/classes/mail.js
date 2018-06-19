'use strict';

const Message = require('./message');
const deepClone = require('../helpers/deep-clone');
const arrayToJSON = require('../helpers/array-to-json');

/**
 * Mail class
 */
class Mail {

  /**
   * Constructor
   */
  constructor(data) {

    //Initialize array and object properties
    this.message = {};

    //Process data if given
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * Build from data
   */
  fromData(data) {

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Mail data');
    }

    data.message = {
      recipients: [],
      headers: {},
      content: {},
      attachments: []
    };

    if (data.hasOwnProperty('to')) {
      data.message.recipients = [data.to];
    }

    if (data.hasOwnProperty('from')) {
      data.message.headers['from'] = data.from;
    }

    if (data.hasOwnProperty('subject')) {
      data.message.headers['subject'] = data.subject;
    }

    if (data.hasOwnProperty('text')) {
      data.message.content['text/plain'] = data.text;
    }

    if (data.hasOwnProperty('html')) {
      data.message.content['text/html'] = data.html;
    }

    console.info("fromData: ", data);

    const { message } = data;

    //Using "to" property for message
    if (message) {
      this.setMessage(message);
    }

  }

  /**
   * Set message
   */
  setMessage(message) {
    //Convert to class if needed
    if (!(message instanceof Message)) {
      message = new Message(message);
    }

    this.message = message;
  }

  /**
   * Add message
   */
  addMessage(message) {

    //Convert to class if needed
    if (!(message instanceof Message)) {
      message = new Message(message);
    }

    this.message = message;
  }

  /**
   * Convenience method for quickly creating message
   */
  addTo(recipient, bcc) {
    if (
      typeof recipient === 'undefined' &&
      typeof bcc === 'undefined'
    ) {
      throw new Error('Provide at least one of to or bcc');
    }
    this.addMessage(new Message({ recipient, bcc }));
  }

  /**
   * To JSON
   */
  toJSON() {
    const { message } = this;
    //Initialize with mandatory values
    const json = {
      message: message,
    };

    console.info('message: ', message);

    return { data: json };
  }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create a Mail instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of Mail class?
    if (data instanceof Mail) {
      return data;
    }

    //Create instance
    return new Mail(data);
  }
}

//Export class
module.exports = Mail;