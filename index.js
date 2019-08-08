"use strict";

const Mongoose = require("./Mongoose");

let singleton;
const getInstance = (...args) => {
  singleton = singleton || new Mongoose(...args);
  return singleton;
};

module.exports = getInstance;
