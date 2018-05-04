const config =  require('./Config');
const SpotifyWebApi = require('spotify-web-api-node');


const scopes = ['user-modify-playback-state','user-read-playback-state', 'playlist-read-private'];
const state = 'some-state-of-my-choice';

let spotifyApi = new SpotifyWebApi(config.spotifyConfig);

if(!config.spotifyConfig.accessCode) {
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    console.log(authorizeURL);
    return;
}

if(!config.spotifyConfig.accessToken) {
    spotifyApi.authorizationCodeGrant(config.spotifyConfig.accessCode).then(function(data) {
        console.log("Access Token:" + data.body['access_token']+  "\n");
        console.log('Refresh token ' + data.body['refresh_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
    }, function(err) {
        console.log('Something went wrong!', err);
    });
    return;
}

spotifyApi.setAccessToken(config.spotifyConfig.accessToken);
spotifyApi.setRefreshToken(config.spotifyConfig.refreshToken);

if(!config.spotifyConfig.targetPlaylist) {
    spotifyApi.getUserPlaylists().then((response) => {
        for(playlist of response.body.items) {
            console.log(`${playlist.name} : ${playlist.id} \n`);
        }
    }).catch((err) => {
        console.log(err);
    })
}

if(!config.spotifyConfig.targetDevice) {
    spotifyApi.getMyDevices().then((response) => {
        for(device of response.body.devices) {
            console.log(`${device.name} : ${device.id} \n`);
        }
    }).catch((err) => {
        console.log(err);
    })
}
