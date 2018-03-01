const fetch = require("node-fetch");

module.exports = function(URL) {
  return fetch(URL).then(res => res.json());
};
