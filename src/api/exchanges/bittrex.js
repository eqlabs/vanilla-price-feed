const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.bittrex;
const ETH_VOLUME = config.volumeURLs.ETHUSD.bittrex;
const BTCUSD = config.priceURLs.BTCUSD.bittrex;
const BTC_VOLUME = config.volumeURLs.BTCUSD.bittrex;

module.exports = {
  "ETHUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(ETHUSD);
      return response.result.Last;
    },
    "getVolume": async () => {
      const response = await fetchJSON(ETH_VOLUME);
      return response.result[0].Volume;
    }
  },
  "BTCUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(BTCUSD);
      return response.result.Last;
    },
    "getVolume": async () => {
      const response = await fetchJSON(BTC_VOLUME);
      return response.result[0].Volume;
    }
  }
}
