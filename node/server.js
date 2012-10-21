#!/usr/bin/env node
var cluster = require('cluster');
var cpus = require('os').cpus().length;
var app = require('./application');

var workers = [];
if (cluster.isMaster) {
  for (var i = 0; i < cpus-1; i++) {
    workers[i] = cluster.fork();
  }

  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} else {
  var port = 3000;
  app.listen(port, function() {
    console.log("Stingy API server listening on port %d", port);
  });
}
