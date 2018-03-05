const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.poloniex;
const ETH_VOLUME = config.volumeURLs.ETHUSD.poloniex;
const BTCUSD = config.priceURLs.BTCUSD.poloniex;
const BTC_VOLUME = config.volumeURLs.BTCUSD.poloniex;

module.exports = {
  "ETHUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(ETHUSD);
      return response[0][1];
    },
    "getVolume": async () => {
      const response = await fetchJSON(ETH_VOLUME);
      return parseFloat(response.USDT_ETH.ETH);
    }
  },
  "BTCUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(BTCUSD);
      return response[0][1];
    },
    "getVolume": async () => {
      const response = await fetchJSON(BTC_VOLUME);
      return parseFloat(response.USDT_BTC.BTC);
    }
  }
}
