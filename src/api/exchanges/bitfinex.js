const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.bitfinex;
const ETH_VOLUME = config.volumeURLs.ETHUSD.bitfinex;
const BTCUSD = config.priceURLs.BTCUSD.bitfinex;
const BTC_VOLUME = config.volumeURLs.BTCUSD.bitfinex;

module.exports = {
  "ETHUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(ETHUSD);
      return response[0][7];
    },
    "getVolume": async () => {
      const response = await fetchJSON(ETH_VOLUME);
      return response[0][8];
    }
  },
  "BTCUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(BTCUSD);
      return response[0][7];
    },
    "getVolume": async () => {
      const response = await fetchJSON(BTC_VOLUME);
      return response[0][8];
    }
  }
}
