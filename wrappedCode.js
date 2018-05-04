const SpotifyHelper = require('./spotifyHelper.js');
const HueHelper = require('./hueHelper.js');
const config = require('./config');

let spotifyHelper = new SpotifyHelper(config.spotifyConfig);
spotifyHelper.generateAPIInstance();

let hueHelper = new HueHelper(config.hueConfig);

const targetDevice = process.env.spotifyTargetDeviceName;
const targetPlaylist = process.env.spotifyTargetPlaylist;
const targetUsername = process.env.spotifyTargetUsername;

function playMusic() {
    return spotifyHelper.refreshAPIToken().then(() => {
        return spotifyHelper.getDeviceIDByName(targetDevice);
    }).then((targetDeviceID) =>{
        let targetUri = spotifyHelper.getContextUri(targetUsername, targetPlaylist);
        return spotifyHelper.play(targetDeviceID, targetUri);
    });
}

function setLight() {
    return hueHelper.turnLightOn();
}

function init() {
    playMusic().then(setLight).catch(console.log);
}


module.exports = init;

/*
AWS Lambda currently does not support ES6. Discovered this the hard way.

async function startMusic() {
    let apiToken = await spotifyHelper.refreshAPIToken();
    let targetDeviceID = await spotifyHelper.getDeviceIDByName(config.spotifyConfig.targetDeviceName);
    let targetPlaylist = spotifyHelper.getContextUri();
    return spotifyHelper.play(targetDeviceID, targetPlaylist);
}

async function dimLight() {
    return hueHelper.turnLightOn();
}

async function init() {
    return startMusic().then(dimLight);
}
*/