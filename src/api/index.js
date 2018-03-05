const logger = require("../logger")(module);

const binance = require("./exchanges/binance");
const bittrex = require("./exchanges/bittrex");
const bitfinex = require("./exchanges/bitfinex");
const poloniex = require("./exchanges/poloniex");
const kraken = require("./exchanges/kraken");
const gdax = require("./exchanges/gdax");

const exchanges = {
  "Bittrex": bittrex,
  "Binance": binance,
  "Bitfinex": bitfinex,
  "Poloniex": poloniex,
  "Kraken": kraken,
  "Gdax": gdax
};

module.exports.fetchPrices = async (currencyPair) => {
  return await Promise.all(Object.keys(exchanges).map(name => {
    try {
      return exchanges[name][currencyPair] && exchanges[name][currencyPair].getPrice();
    } catch (e) {
      logger.log({
        level: "error",
        message: "Error fetching price for " + currencyPair + " from " + name
      });
    }
  }));
};

module.exports.fetchVolumes = async (currencyPair) => {
  return await Promise.all(Object.keys(exchanges).map(name => {
    try {
      return exchanges[name][currencyPair] && exchanges[name][currencyPair].getVolume();
    } catch (e) {
      logger.log({
        level: "error",
        message: "Error fetching 24h volume for " + currencyPair + " from " + name
      });
    }
  }));
};

module.exports.exchanges = Object.keys(exchanges);
