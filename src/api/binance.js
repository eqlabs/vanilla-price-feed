const config = require("../config");
const fetchJSON = require("./fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.binance;

module.exports.getETHPrice = async () => {
  const response = await fetchJSON(ETHUSD);
  return parseFloat(response.price);
};
