// config-overrides.js
const crypto = require('crypto-browserify');
const util = require('util');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: false, 
    util: false,
  };

  return config;
};
