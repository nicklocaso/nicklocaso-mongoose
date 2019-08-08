"use strict";

// Mongoose
const _mongoose = require("mongoose");

/**
 * Database class
 *
 */
class Mongoose {
  constructor(...args) {
    try {
      args[1] = Object.assign({ useNewUrlParser: true }, args[1]);
      this.connection = _mongoose.createConnection(...args);
    } catch (err) {
      throw err;
    }
    this.schemas = {};
    this.models = {};
  }

  /**
   * Methods
   *
   */

  whenDisconnected(cb) {
    this.connection.on("disconnected", cb);
  }

  whenConnected(cb) {
    this.connection.on("connected", cb);
  }

  whenConnecting(cb) {
    this.connection.on("connecting", cb);
  }

  whenDisconnecting(cb) {
    this.connection.on("disconnecting", cb);
  }

  /**
   * Schema
   *
   */

  createSchema(name, definition) {
    let schema;
    try {
      schema = _mongoose.Schema(definition);
    } catch (err) {
      throw err;
    }
    this.schemas[name] = schema;
    return schema;
  }

  getSchema(name) {
    return this.schemas[name];
  }

  /**
   * Model
   *
   */

  createModel(...args) {
    let model;
    try {
      if (!args[1]) {
        args[1] = this.getSchema(args[0]);
      }
      model = this.connection.model(...args);
    } catch (err) {
      throw err;
    }
    this.models[args[0]] = model;
    return model;
  }

  getModel(name) {
    return this.models[name];
  }
}

module.exports = Mongoose;
