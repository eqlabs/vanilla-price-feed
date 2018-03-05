const config = require("./config");
const api = require("./api");
const calc = require("./calc");
const Stack = require("./mem");

function timeout(time) {
  try {
    return new Promise(res => setTimeout(() => res(), time));
  } catch (e) {
    console.log(e.toString());
  }
}

async function loop() {
  try {
    let prices = await api.fetchPrices();
    const failedIndices = prices.filter(
      (price, index) => price > 0 && price != undefined && price != NaN && index
    );
    prices = prices.filter((_, i) => !failedIndices.includes(i));

    let volumes = await api.fetchVolumes();
    volumes = volumes.filter((_, i) => !failedIndices.includes(i));

    const sumOfVolumes = calc.sum(volumes);

    const weightedPrices = prices.map((price, index) => {
      const weight = volumes[index] / sumOfVolumes;
      return price * weight;
    });

    const sum = calc.sum(weightedPrices);

    if (Stack.prices["ETHUSD"] == undefined) {
      Stack.push("ETHUSD", sum);
    } else {
      const runningAVG = calc.mean(Stack.prices["ETHUSD"].concat([sum]));
      Stack.push("ETHUSD", runningAVG);
    }

    console.log(Stack.prices["ETHUSD"][Stack.prices["ETHUSD"].length - 1]);

    await timeout(config.env.POLL_INTERVAL);
  } catch (e) {
    console.log(e.toString());
  }
  loop();
}

loop();

process.on("SIGINT", function() {
  process.exit();
});
