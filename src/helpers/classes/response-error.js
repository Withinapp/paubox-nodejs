'use strict';

/**
 * Dependencies
 */
const chalk = require('chalk');

/**
 * Response error class
 */
class ResponseError extends Error {

  /**
   * Constructor
   */
  constructor(response) {

    //Super
    super();

    //Extract data from response
    const { headers, statusCode, statusDetails, body } = response;

    //Set data
    this.code = statusCode;
    this.details = statusDetails;
    this.response = { headers, body };

    //Capture stack trace
    if (!this.stack) {
      Error.captureStackTrace(this, this.constructor);
    }

    //Clean up stack trace
    const regex = new RegExp(process.cwd() + '/', 'gi');
    this.stack = this.stack.replace(regex, '');
  }

  /**
   * Convert to string
   */
  toString() {
    const { body } = this.response;
    let err = chalk.red(`${this.message} (${this.code})`);
    if (body && Array.isArray(body.errors)) {
      body.errors.forEach(error => {
        const details = chalk.yellow(error.details);
        const title = chalk.grey(error.title);
        const code = chalk.grey(error.code);
        err += `\n  ${title}\n    ${details}\n    ${code}`;
      });
    }
    return err;
  }

  /**
   * Convert to simple object for JSON responses
   */
  toJSON() {
    const { details, code, response } = this;
    return { details, code, response };
  }
}

//Export
module.exports = ResponseError;