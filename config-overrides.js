const crypto = require('crypto-browserify');
const util = require('util');

const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = function override(config, env) {
  if (isEnvProduction) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      util: false,
    };
  }

  return config;
};
