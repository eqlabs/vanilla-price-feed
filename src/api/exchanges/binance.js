const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.binance;
const ETH_VOLUME = config.volumeURLs.ETHUSD.binance;
const BTCUSD = config.priceURLs.BTCUSD.binance;
const BTC_VOLUME = config.volumeURLs.BTCUSD.binance;

module.exports = {
  "ETHUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(ETHUSD);
      return parseFloat(response.price);
    },
    "getVolume": async () => {
      const response = await fetchJSON(ETH_VOLUME);
      return parseFloat(response.volume);
    }
  },
  "BTCUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(BTCUSD);
      return parseFloat(response.price);
    },
    "getVolume": async () => {
      const response = await fetchJSON(BTC_VOLUME);
      return parseFloat(response.volume);
    }
  }
}
