const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.bitfinex;
const VOLUME = config.volumeURLs.ETHUSD.bitfinex;

module.exports = {
  "ETHUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(ETHUSD);
      return response[0][7];
    },
    "getVolume": async () => {
      const response = await fetchJSON(VOLUME);
      return response[0][8];
    }
  }
}
