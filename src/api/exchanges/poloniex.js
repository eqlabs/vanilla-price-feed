const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.poloniex;
const VOLUME = config.volumeURLs.ETHUSD.poloniex;

module.exports = {
  "ETHUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(ETHUSD);
      return response[0][1];
    },
    "getVolume": async () => {
      const response = await fetchJSON(VOLUME);
      return parseFloat(response.USDT_ETH.ETH);
    }
  }
}
