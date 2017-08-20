function Channel(channel) {
    this.address = "/ch/" + channel;
}

Channel.prototype.setFaderLevel = function(level) {
    this.connection.send({
        address: this.address + "/mix/fader",
        args: [
            {
                type: "f",
                value: level
            }
        ]
    });
};

module.exports = Channel;