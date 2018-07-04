"use strict";

/**
 * Module Dependencies
 */
const config = require("./config"),
  restify = require("restify");

/**
 * Initialize Server
 */
const server = restify.createServer({
  name: config.name,
  version: config.version
});

/**
 * Bundled Plugins (http://restify.com/#bundled-plugins)
 */
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/", (req, res, next) => {
  res.send(200, { message: "hello world" });
  return next();
});

/**
 * Lift Server
 */
server.listen(config.port, () => {
  console.log("listening in port #", config.port);
});
