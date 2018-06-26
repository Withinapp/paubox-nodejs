'use strict';

const http = require('request');
const pkg = require('../../../../package.json');

const {
  helpers: {
    mergeData,
  },
  classes: {
    ResponseError,
  },
} = require('../../../helpers');

/**
 * Paubox REST Client
 */
class Client {

  constructor() {

    // API key
    this.apiKey = '';
    // Api User
    this.apiUsername = '';
    // Api Version
    this.apiVersion = 'v1';
    // Api Mode
    this.testMode = false;

    //Default headers
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-agent': 'paubox/' + pkg.version + ';nodejs',
    };

    //Empty default request
    this.defaultRequest = {
      json: true,
      baseUrl: `https://api.paubox.net/${this.apiVersion}`,
      url: '',
      method: 'GET',
      headers: {},
    };
  }

  /**
   * Set API key
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  /**
  * Set API User
  */
  setApiUsername(username) {
    this.apiUsername = username;
  }

  /**
  * Set Test Mode
  */
  isTestMode(debug) {
    this.testMode = debug;
  }

  /**
   * Set default header
   */
  setDefaultHeader(key, value) {
    this.defaultHeaders[key] = value;
    return this;
  }

  /**
   * Set default request
   */
  setDefaultRequest(key, value) {
    this.defaultRequest[key] = value;
    return this;
  }

  /**
   * Create headers for request
   */
  createHeaders(data) {

    //Merge data with default headers
    const headers = mergeData(this.defaultHeaders, data);

    //Add API key, but don't overwrite if header already set
    if (typeof headers.Authorization === 'undefined' && this.apiKey) {
      headers.Authorization = `Token token=${this.apiKey}`;
    }

    //Return
    return headers;
  }

  /**
   * Create request
   */
  createRequest(data) {

    //Keep URL parameter consistent
    if (data.uri) {
      data.url = data.uri;
      delete data.uri;
    }

    // TODO: find better way to handle this
    this.setDefaultRequest('baseUrl', `${this.defaultRequest.baseUrl}/${this.apiUsername}/`)

    //Merge data with empty request
    const request = mergeData(this.defaultRequest, data);

    //Add headers
    request.headers = this.createHeaders(request.headers);
    return request;
  }

  /**
   * Do a request
   */
  request(data, cb) {

    //Create request
    const request = this.createRequest(data);

    //Perform request
    const promise = new Promise((resolve, reject) => {
      http(request, (error, response, body) => {

        //Request error
        if (error) {
          return reject(error);
        }

        //Response error
        if (response.statusCode >= 400) {
          console.error('Paubox Error: ', response.body);
          return reject(new ResponseError(response));
        }

        // Successful response
        resolve([response, body]);
      });
    });

    // Throw and error incase function not passed
    if (cb && typeof cb !== 'function') {
      throw new Error('Callback passed is not a function.');
    }

    //Execute callback if provided
    if (cb) {
      promise
        .then(result => cb(null, result))
        .catch(error => cb(error, null));
    }

    //Return promise
    return promise;
  }
}

module.exports = Client;