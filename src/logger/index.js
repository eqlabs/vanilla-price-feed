const winston = require("winston");
const { createLogger, transports, format } = winston;
const { combine, timestamp, printf } = format;

const consoleTransport = new transports.Console();

function logFormat() {
  return printf(
    info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
  );
}

if (process.env.NODE_ENV === "development") {
  consoleTransport.level = "debug";
}

if (process.env.NODE_ENV === "test") {
  consoleTransport.level = -1;
}

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(format.colorize(), timestamp(), logFormat()),
  transports: [consoleTransport],
  exceptionHandlers: [new transports.Console()]
});

function moduleLogger(module) {
  const { error, warn, info, verbose, debug, silly } = logger;
  const log = options => {
    if (module) {
      let moduleName;
      try {
        moduleName = module.id.substring(module.id.indexOf("/lib/") + 1);
      } catch (e) {
        moduleName = "unable-to-parse-module";
      }
      logger.log(Object.assign({}, { label: moduleName }, options));
    } else logger.log(Object.assign({}, { label: "no-module-given" }, options));
  };

  return {
    error,
    warn,
    info,
    verbose,
    debug,
    silly,
    log
  };
}

module.exports = moduleLogger;
