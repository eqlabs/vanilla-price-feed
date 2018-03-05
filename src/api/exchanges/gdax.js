const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.gdax;
const VOLUME = config.volumeURLs.ETHUSD.gdax;

module.exports = {
  "ETHUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(ETHUSD);
      return parseFloat(response.price);
    },
    "getVolume": async () => {
      const response = await fetchJSON(VOLUME);
      return parseFloat(response.volume);
    }
  }
}
