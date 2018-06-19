'use strict';

/** Dependencies */
const EmailAddress = require('./email-address');
const deepClone = require('../helpers/deep-clone');
const merge = require('deepmerge');

/** Message class */
class Message {

  /** Constructor */
  constructor(data) {

    // Init array and object placeholders
    this.recipients = [];
    this.bcc = [];
    this.headers = {};
    this.content = {};
    this.allowNonTLS = false;
    this.attachments = [];

    // Build from data if given
    if (data) {
      this.fromData(data);
    }
  }

  /** From data */
  fromData(data) {

    // Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Mail data');
    }

    // Extract properties from data
    const {
      recipients, bcc, attachments, headers, content, allowNonTLS, attachments
    } = data;

    // Set data
    this.setTo(recipients);
    this.setBcc(bcc);
    this.setHeaders(headers);
    this.setContent(content);
    this.setNonTLS(allowNonTLS);
    this.setAttachments(attachments);
  }

  /** Set allowNonTLS  */
  setNonTLS(allowNonTLS) {
    if (typeof allowNonTLS === 'undefined') {
      return;
    }
    if (typeof allowNonTLS !== 'boolean') {
      throw new Error('Booleam expected for `allowNonTLS`');
    }
    this.allowNonTLS = allowNonTLS;
  }

  /** Set recipients */
  setTo(recipient) {
    if (typeof recipient === 'undefined') {
      return;
    }
    if (!Array.isArray(recipient)) {
      recipient = [recipient];
    }
    this.recipients = EmailAddress.create(recipient);
  }

  /** Add a single recipient */
  addTo(recipient) {
    if (typeof recipient === 'undefined') {
      return;
    }
    this.recipients.push(EmailAddress.create(recipient));
  }

  /** Set bcc */
  setBcc(bcc) {
    if (typeof bcc === 'undefined') {
      return;
    }
    if (!Array.isArray(bcc)) {
      bcc = [bcc];
    }
    this.bcc = EmailAddress.create(bcc);
  }

  /** Add a single bcc */
  addBcc(bcc) {
    if (typeof bcc === 'undefined') {
      return;
    }
    this.bcc.push(EmailAddress.create(bcc));
  }

  /** Set headers */
  setHeaders(headers) {
    if (typeof headers === 'undefined') {
      return;
    }
    if (typeof headers !== 'object' || headers === null) {
      throw new Error('Object expected for `headers`');
    }
    this.headers = headers;
  }

  /** Add a header */
  addHeader(key, value) {
    if (typeof key !== 'string') {
      throw new Error('String expected for header key');
    }
    if (typeof value !== 'string') {
      throw new Error('String expected for header value');
    }
    this.headers[key] = value;
  }

  /** Set Content */
  setContent(content) {
    if (typeof content === 'undefined') {
      return;
    }
    if (typeof content !== 'object' || content === null) {
      throw new Error('Object expected for `content`');
    }
    this.content = content;
  }

  /** Add mail content */
  addContent(key, value) {
    if (typeof key !== 'string') {
      throw new Error('String expected for content key');
    }
    if (typeof value !== 'string') {
      throw new Error('String expected for content value');
    }
    this.content[key] = value;
  }

  /** To JSON */
  toJSON() {

    const {
      recipients, bcc, headers, content, allowNonTLS, attachments,
    } = this;

    const json = { recipients };

    if (Array.isArray(bcc) && bcc.length > 0) {
      json.bcc = bcc;
    }

    // Objects
    if (Object.keys(headers).length > 0) {
      json.headers = headers;
    }

    // Objects
    if (Object.keys(content).length > 0) {
      json.content = content;
    }

    if (typeof sendAt !== 'undefined') {
      json.sendAt = sendAt;
    }

    if (Array.isArray(attachments) && attachments.length > 0) {
      json.attachments = attachments;
    }

    // Return message object
    return { message: json };
  }
}

module.exports = Message;