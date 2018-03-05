const binance = require("./exchanges/binance");
const bittrex = require("./exchanges/bittrex");
const bitfinex = require("./exchanges/bitfinex");
const poloniex = require("./exchanges/poloniex");
const kraken = require("./exchanges/kraken");
const gdax = require("./exchanges/gdax");

const exchanges = [bittrex, binance, bitfinex, poloniex, kraken, gdax];

module.exports.fetchPrices = async () => {
  return await Promise.all(exchanges.map(exchange => exchange.getETHPrice()));
};

module.exports.fetchVolumes = async () => {
  return await Promise.all(exchanges.map(exchange => exchange.getETHVolume()));
};
