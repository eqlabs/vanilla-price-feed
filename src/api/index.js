const binance = require("./binance");
const bittrex = require("./bittrex");
const bitfinex = require("./bitfinex");
const poloniex = require("./poloniex");
const kraken = require("./kraken");

const exchanges = [bittrex, binance, bitfinex, poloniex, kraken];

module.exports.fetchPrices = async () => {
  return await Promise.all(exchanges.map(exchange => exchange.getETHPrice()));
};

module.exports.fetchVolumes = async () => {
  return await Promise.all(exchanges.map(exchange => exchange.getETHVolume()));
};
