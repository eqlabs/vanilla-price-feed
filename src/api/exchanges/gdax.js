const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.gdax;
const ETH_VOLUME = config.volumeURLs.ETHUSD.gdax;
const BTCUSD = config.priceURLs.BTCUSD.gdax;
const BTC_VOLUME = config.volumeURLs.BTCUSD.gdax;

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
