const fetch = require("node-fetch");
const logger = require("../logger")(module);

module.exports = function (URL) {
  logger.log({
    level: "debug",
    message: "Fetching from URL: " + URL.toString()
  });
  return fetch(URL).then(res => res.json());
};
