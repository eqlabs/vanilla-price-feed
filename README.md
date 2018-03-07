## Price feed for Vanilla oracle
1. Fetches latest prices for following currency pairs:
  - ETH/USD
  - BTC/USD

...from the following exchanges' public APIs:
  - Binance
  - Gdax
  - Poloniex
  - Bitfinex
  - Kraken
  - Bittrex

...with their accompanying 24h trade volumes.

2. Calculates a weighted average based on the 24h volume of each exchange.
3. Fetches prices for the last 15 minutes from Redis, and calculates a moving average from them and the latest price.
4. Saves the newest price to Redis.
5. Removes all prices from Redis that are older than 12 hours.

## Developing
```bash
make redis
make dev
```
