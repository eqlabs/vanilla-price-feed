const config = require("../config");
const redis = require("redis");
const logger = require("../logger")(module);
const client = redis.createClient({ host: config.env.DB_URL, port: config.env.DB_PORT });
const { promisify } = require('util');
const zrangebyscore = promisify(client.zrangebyscore).bind(client);
const zadd = promisify(client.zadd).bind(client);
const zremrangebyrank = promisify(client.zremrangebyrank).bind(client);

client.on("error", function (err) {
  logger.log({
    level: "error",
    message: "Error " + err
  });
});

module.exports.redis = {
  zadd: async (key, arg1, arg2) => {
    await zadd(key, arg1, arg2);
  },
  zrangebyscore: async (key, start, stop) => {
    const values = await zrangebyscore(key, start, stop);
    return values;
  },
  zremrangebyrank: async (key, start, stop) => {
    await zremrangebyrank(key, start, stop);
  }
}
