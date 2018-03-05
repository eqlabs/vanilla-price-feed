const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.kraken;
const ETH_VOLUME = config.volumeURLs.ETHUSD.kraken;
const BTCUSD = config.priceURLs.BTCUSD.kraken;
const BTC_VOLUME = config.volumeURLs.BTCUSD.kraken;

module.exports = {
  "ETHUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(ETHUSD);
      return parseFloat(response.result.XETHZUSD.c[0]);
    },
    "getVolume": async () => {
      const response = await fetchJSON(ETH_VOLUME);
      return parseFloat(response.result.XETHZUSD.v[1]);
    }
  },
  "BTCUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(BTCUSD);
      return parseFloat(response.result.XXBTZUSD.c[0]);
    },
    "getVolume": async () => {
      const response = await fetchJSON(BTC_VOLUME);
      return parseFloat(response.result.XXBTZUSD.v[1]);
    }
  }
}
