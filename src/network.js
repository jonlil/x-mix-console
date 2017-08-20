var osc = require('osc');
var _ = require('lodash');

module.exports = function(callback) {

  // Create an osc.js UDP Port listening on port 57121.
  var udpPort = new osc.UDPPort({
      localAddress: "0.0.0.0",
      localPort: 57121,
      remoteAddress: "192.168.1.250",
      remotePort: 10024,
      metadata: true
  });

  // Listen for incoming OSC bundles.
  udpPort.on("bundle", function (oscBundle, timeTag, info) {
      console.log("An OSC bundle just arrived for time tag", timeTag, ":", oscBundle);
      console.log("Remote info is: ", info);
  });

  // Open the socket.
  udpPort.open();

  // When the port is read, send an OSC message to, say, SuperCollider
  udpPort.on("ready", function() {
    callback(null, udpPort);
  });
  udpPort.on('error', console.error);
};


