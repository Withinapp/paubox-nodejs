'use strict';

/**
 * Dependencies
 */
const { Client } = require('../../client');
const { classes: { Mail } } = require('../../helpers');

/**
 * Mail service class
 */
class MailService {

  /**
   * Constructor
   */
  constructor() {

    //Set client and initialize substitution wrappers
    this.setClient(new Client());
  }

  /**
   * Set client
   */
  setClient(client) {
    this.client = client;
  }

  /**
   * API key pass through for convenience
   */
  setApiKey(apiKey) {
    this.client.setApiKey(apiKey);
  }

  /**
  * Username pass through for convenience
  */
  setApiUsername(username) {
    this.client.setApiUsername(username);
  }

  /**
  * testMode pass through for convenience
  */
  isTestMode(debug) {
    this.client.isTestMode(debug);
  }

  /**
   * Send email
   */
  send(data, isMultiple = false, cb) {

    //Callback as second parameter
    if (typeof isMultiple === 'function') {
      cb = isMultiple;
      isMultiple = false;
    }

    //Array? Send in parallel
    if (Array.isArray(data)) {

      //Create promise
      const promise = Promise.all(data.map(item => {
        return this.send(item, isMultiple);
      }));

      //Execute callback if provided
      if (cb) {
        promise
          .then(result => cb(null, result))
          .catch(error => cb(error, null));
      }

      //Return promise
      return promise;
    }

    //Send mail
    try {

      //Create Mail instance from data and get JSON body for request
      const mail = Mail.create(data);
      const body = mail.toJSON();

      //Create request
      const request = {
        method: 'POST',
        // baseUrl: `https://api.paubox.net/v1/${this.client.username}`,
        url: '/messages',
        body,
      };

      //Send
      return this.client.request(request, cb);
    }

    //Catch sync errors
    catch (error) {

      //Pass to callback if provided
      if (cb) {
        cb(error, null);
      }

      //Reject promise
      return Promise.reject(error);
    }
  }
}

//Export class
module.exports = MailService;