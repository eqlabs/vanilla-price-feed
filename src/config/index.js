module.exports.env = {
  POLL_INTERVAL: 15000
};

module.exports.priceURLs = {
  ETHUSD: {
    bittrex: "https://bittrex.com/api/v1.1/public/getticker?market=USDT-ETH",
    bitfinex: "https://api.bitfinex.com/v2/tickers?symbols=tETHUSD",
    kraken: "https://api.kraken.com/0/public/Ticker?pair=ETHUSD",
    binance: "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    poloniex: "https://api.bitfinex.com/v2/tickers?symbols=tETHUSD",
    gdax: "https://api.gdax.com/products/ETH-USD/ticker"
  },
  BTCUSD: {
    bittrex: "https://bittrex.com/api/v1.1/public/getticker?market=USDT-BTC",
    bitfinex: "https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD",
    kraken: "https://api.kraken.com/0/public/Ticker?pair=BTCUSD",
    binance: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    poloniex: "https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD",
    gdax: "https://api.gdax.com/products/BTC-USD/ticker"
  }
};

module.exports.volumeURLs = {
  ETHUSD: {
    binance: "https://api.binance.com/api/v1/ticker/24hr?symbol=ETHUSDT",
    poloniex: "https://poloniex.com/public?command=return24hVolume",
    kraken: "https://api.kraken.com/0/public/Ticker?pair=ETHUSD",
    bittrex:
      "https://bittrex.com/api/v1.1/public/getmarketsummary?market=usdt-eth",
    bitfinex: "https://api.bitfinex.com/v2/tickers?symbols=tETHUSD",
    gdax: "https://api.gdax.com/products/ETH-USD/stats"
  },
  BTCUSD: {
    binance: "https://api.binance.com/api/v1/ticker/24hr?symbol=BTCUSDT",
    poloniex: "https://poloniex.com/public?command=return24hVolume",
    kraken: "https://api.kraken.com/0/public/Ticker?pair=BTCUSD",
    bittrex:
      "https://bittrex.com/api/v1.1/public/getmarketsummary?market=usdt-btc",
    bitfinex: "https://api.bitfinex.com/v2/tickers?symbols=tBTCUSD",
    gdax: "https://api.gdax.com/products/BTC-USD/stats"
  }
};
