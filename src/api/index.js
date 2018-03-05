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

module.exports.fetchPrices = async () => {
  return await Promise.all(Object.keys(exchanges).map(name => exchanges[name].getETHPrice()));
};

module.exports.fetchVolumes = async () => {
  return await Promise.all(Object.keys(exchanges).map(name => exchanges[name].getETHVolume()));
};

module.exports.exchanges = Object.keys(exchanges);
