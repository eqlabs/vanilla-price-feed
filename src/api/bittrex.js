const config = require("../config");
const fetchJSON = require("./fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.bittrex;

module.exports.getETHPrice = async () => {
  const response = await fetchJSON(ETHUSD);
  return response.result.Last;
};
