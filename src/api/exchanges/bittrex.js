const config = require("../../config");
const fetchJSON = require("../fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.bittrex;
const VOLUME = config.volumeURLs.ETHUSD.bittrex;

module.exports = {
  "ETHUSD": {
    "getPrice": async () => {
      const response = await fetchJSON(ETHUSD);
      return response.result.Last;
    },
    "getVolume": async () => {
      const response = await fetchJSON(VOLUME);
      return response.result[0].Volume;
    }
  }
}
