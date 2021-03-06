const config = require("./config");
const api = require("./api");
const calc = require("./calc");
const { redis } = require("./db");
const logger = require("./logger")(module);

/**
 * Timeout function that waits for a specified number of milliseconds
 * @param {Number} time to wait in milliseconds
 */
function timeout(time) {
  try {
    return new Promise(res => setTimeout(() => res(), time));
  } catch (e) {
    console.log(e.toString());
  }
}

/**
 * Program loop, which fetches prices and volumes from all APIs and
 * saves a new price which is calculated as a moving average
 */
async function loop() {
  await Promise.all(Object.keys(config.priceURLs).map(async currencyPair => {

    logger.log({
      level: "info",
      message: "Fetching a new price for " + currencyPair
    });

    try {
      // Get prices from all active APIs
      let prices = await api.fetchPrices(currencyPair);

      // Get 24h trading volumes for all active APIs
      let volumes = await api.fetchVolumes(currencyPair);

      // Filter out failed API calls
      const failedIndices = prices.map(
        (exchange, index) => {
          return (exchange.price == 0 || exchange.price == undefined || isNaN(exchange.price) || volumes[index].volume == 0 || volumes[index].volume == undefined || isNaN(volumes[index].volume)) ? index : false;
        }
      );

      // Filter out failed API calls from data
      volumes = volumes.filter((exchange, i) => !failedIndices.includes(i));
      prices = prices.filter((exchange, i) => !failedIndices.includes(i));

      if (failedIndices.find(index => index != false)) {
        logger.log({
          level: "debug",
          message: "Failed indices: " + failedIndices.toString()
        });
      }

      if (volumes.length >= 2 && volumes.length === prices.length) {

        logger.log({
          level: "debug",
          message: currencyPair + " prices fetched:" + prices.map(exchange => ` ${exchange.name}: ${Math.round(exchange.price)}$`
          )
        });

        logger.log({
          level: "debug",
          message: currencyPair + "24h volumes fetched:" + volumes.map(exchange => ` ${exchange.name}: ${Math.round(exchange.volume)}$`
          )
        });

        // Sum of volumes of all exchanges
        const sumOfVolumes = calc.sum(volumes.map(exchange => exchange.volume));

        // Weigh each price by its exchange's volume
        const weightedPrices = prices.map((exchange, index) => {
          const weight = volumes[index].volume / sumOfVolumes;
          return exchange.price * weight;
        });

        // Sum weighed prices together to reach a 100% weighed price
        const sum = calc.sum(weightedPrices);

        // Get this time in seconds
        const time = Math.trunc(new Date().getTime() / 1000);

        // Fetch prices from last 15 minutes (900 seconds before now), add newest price to list
        let pricesOfLast15Minutes = await redis.zrangebyscore(currencyPair, time - 900, time);
        pricesOfLast15Minutes = pricesOfLast15Minutes.map(price => parseFloat(price)).concat(sum);

        // Calculate the moving average of last 15 minutes
        const movingAVG = pricesOfLast15Minutes.length > 0 ? calc.mean(pricesOfLast15Minutes) : sum;

        // Print out the newest price
        logger.log({
          level: "info",
          message: "Latest " + currencyPair + " price calculated: " + movingAVG
        });

        // Store new price to redis
        await redis.zadd(currencyPair, time, JSON.stringify(movingAVG));

      } else {
        // Wait and think what you've done (too many requests, duh)
        await timeout(config.env.POLL_INTERVAL * 3);
      }

      // Remove prices older than 12 hours (720 minutes) from redis
      const keepAmount = 60000 / config.env.POLL_INTERVAL * 720;
      await redis.zremrangebyrank(currencyPair, 0, -keepAmount);

      // Wait for POLL_INTERVAL
      await timeout(config.env.POLL_INTERVAL);
    } catch (e) {
      logger.log({
        level: "error",
        message: "There was an error in fetching prices and/or volumes: " + e.toString()
      });
    }
  }));

  // Start another iteration
  loop();
}

// Main program loop
loop();

// Allow CTRL+C to end program execution
process.on("SIGINT", function () {
  process.exit();
});
