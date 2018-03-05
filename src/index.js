const config = require("./config");
const api = require("./api");
const calc = require("./calc");
const Stack = require("./mem");
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
        (price, index) => {
          return (price == 0 || price == undefined || isNaN(price) || volumes[index] == 0 || volumes[index] == undefined || isNaN(volumes[index])) ? index : false;
        }
      );

      // Filter out failed API calls from data
      volumes = volumes.filter((number, i) => !failedIndices.includes(i));
      prices = prices.filter((number, i) => !failedIndices.includes(i));

      if (failedIndices.find(index => index != false)) {
        logger.log({
          level: "debug",
          message: "Failed indices: " + failedIndices.toString()
        });
      }

      logger.log({
        level: "info",
        message: currencyPair + " prices fetched:" + api.exchanges.map((name, index) => ` ${name}: ${Math.round(prices[index])}$`
        )
      });

      logger.log({
        level: "info",
        message: currencyPair + "24h volumes fetched:" + api.exchanges.map((name, index) => ` ${name}: ${Math.round(volumes[index])}$`
        )
      });

      // Sum of volumes of all exchanges
      const sumOfVolumes = calc.sum(volumes);

      // Weigh each price by its exchange's volume
      const weightedPrices = prices.map((price, index) => {
        const weight = volumes[index] / sumOfVolumes;
        return price * weight;
      });

      // Sum weighed prices together to reach a 100% weighed price
      const sum = calc.sum(weightedPrices);

      // Push newest price to stack, taking a moving average with previous prices
      if (Stack.prices[currencyPair] == undefined) {
        Stack.push(currencyPair, sum);
      } else {
        const movingAVG = calc.mean(Stack.prices[currencyPair].concat([sum]));
        Stack.push(currencyPair, movingAVG);
      }

      // Print out the newest price
      logger.log({
        level: "info",
        message: "Latest " + currencyPair + " price calculated: " + Stack.prices[currencyPair][Stack.prices[currencyPair].length - 1]
      });

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
