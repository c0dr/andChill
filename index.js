const Alexa = require('alexa-sdk');
const wrappedCode = require('./wrappedCode'); 

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        wrappedCode();
        this.response
        .cardRenderer('Stated music', 'Enjoy your evening!')
        this.emit(':responseReady');
	},
};