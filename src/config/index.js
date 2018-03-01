module.exports.env = {
  POLL_INTERVAL: 15000
};

module.exports.priceURLs = {
  ETHUSD: {
    bittrex: "https://bittrex.com/api/v1.1/public/getticker?market=USDT-ETH",
    bitfinex: "https://api.bitfinex.com/v2/tickers?symbols=tETHUSD",
    kraken: "https://api.kraken.com/0/public/Ticker?pair=ETHUSD",
    binance: "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    poloniex: "https://api.bitfinex.com/v2/tickers?symbols=tETHUSD"
  },
  BTCUSD: {
    bittrex: "https://bittrex.com/api/v1.1/public/getticker?market=USDT-BTC",
    bitfinex: "https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD",
    kraken: "https://api.kraken.com/0/public/Ticker?pair=BTCUSD",
    binance: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    poloniex: "https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD"
  }
};

module.exports.volumeURLs = {
  binance: "https://api.binance.com/api/v1/ticker/24hr?symbol=ETHUSDT",
  poloniex: "https://poloniex.com/public?command=return24hVolume"
};
