var mixerInterface;
var Channel = require('./src/x18').Channel;
var _ = require('lodash');

function isChannel(status) {
  return status >= 224 || status <= (224 + 16);
}

require('./src/network')(function(error, mixerInterface) {

  function midiMessage(deltaTime, message) {
    console.log(message);
    if (isChannel(message[0])) {
      var channel = new Channel(_.padStart(message[0]-223, 2, 0));
      channel.connection = mixerInterface;

      channel.setFaderLevel(parseInt(message[2], 10) / 127);
    }
  };

  // setup midi channel
  require('./src/midi')(midiMessage);
});






