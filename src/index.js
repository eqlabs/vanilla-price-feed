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
    const prices = await api.fetchAll();
    const mean = calc.mean(prices);

    if (Stack.prices["ETHUSD"] == undefined) {
      Stack.push("ETHUSD", mean);
    } else {
      const runningAVG = calc.mean(Stack.prices["ETHUSD"].concat([mean]));
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
