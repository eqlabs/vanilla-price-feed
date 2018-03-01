const binance = require("./binance");
const bittrex = require("./bittrex");

module.exports.fetchAll = async () => {
  const exchanges = [bittrex, binance];

  const prices = await Promise.all(
    exchanges.map(exchange => exchange.getETHPrice())
  );

  return prices;
};
