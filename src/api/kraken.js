const config = require("../config");
const fetchJSON = require("./fetchJSON");

const ETHUSD = config.priceURLs.ETHUSD.kraken;
const VOLUME = config.volumeURLs.ETHUSD.kraken;

module.exports.getETHPrice = async () => {
  const response = await fetchJSON(ETHUSD);
  return parseFloat(response.result.XETHZUSD.c[0]);
};

module.exports.getETHVolume = async () => {
  const response = await fetchJSON(VOLUME);
  return parseFloat(response.result.XETHZUSD.v[1]);
};
