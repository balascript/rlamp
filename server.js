"use strict";

/**
 * Module Dependencies
 */
const config = require("./config"),
  restify = require("restify"),
  localStore = require("./local_store");

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
  res.send(200, { message: "Welcome to the r-lights API" });
  return next();
});
server.get("/colors/:id", (req, res, next) => {
  if (req.params.id == "927833") {
    res.send(200, localStore.local.id2);
  } else {
    res.send(200, localStore.local.id1);
  }
  return next();
});
server.put("/colors/:id", (req, res, next) => {
  if (req.params.id == "927833") {
    localStore.local.id2 = { color: req.body.color };
    res.send(200, localStore.local.id2);
  } else {
    localStore.local.id1 = { color: req.body.color };
    res.send(200, localStore.local.id1);
  }
  return next();
});

/**
 * Lift Server
 */
server.listen(config.port, () => {
  console.log("listening in port #", config.port);
});
