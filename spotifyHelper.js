const SpotifyWebApi = require('spotify-web-api-node');

class SpotifyHelper {
        
        constructor (spotifyConfig) {
            this.spotifyConfig = spotifyConfig;
            this.scopes = ['user-modify-playback-state','user-read-playback-state', 'playlist-read-private'];
        }

        generateAPIInstance() {
            this.spotifyObject = new SpotifyWebApi(this.spotifyConfig);
        }
    
        getDeviceIDByName(deviceName) {
            return new Promise((resolve, reject) => {
                this.spotifyObject.getMyDevices().then((response) => {
                    for(let device of response.body.devices) {
                        if(device.name == deviceName) {
                            resolve(device.id);
                        }
                    }
                    reject(new Error('No matching device found'));
                }).catch(reject);
            })
        };

        setDevice(deviceName = this.spotifyConfig.targetDeviceName) {
            return this.getDeviceIDByName(deviceName).then((device) => {
                this.spotifyConfig.targetDevice = device.id;
            })
        }

        generateAPIToken(accessCode) {
            return this.spotifyObject.authorizationCodeGrant(accessCode).then((data) =>{
                // TODO: Save this data
                let accessToken = data.body['access_token'];
                console.log(accessToken);
                SpotifyWebApi.setAccessToken(accessToken);
            })
        }

        initAPI() {
            //FIXME: Handle cases without refresh token
            return this.refreshAPIToken();
        }

        refreshAPIToken() {
            return this.spotifyObject.refreshAccessToken().then((data) => {
                this.spotifyObject.setAccessToken(data.body['access_token']);
                console.log("new token: " + data.body['access_token']);
                return data.body['access_token'];
            })
        }

        setTargetDevice(deviceId) {
            this.targetDevice = deviceId;
        }

        getContextUri(username = this.spotifyConfig.username, targetPlaylist = this.spotifyConfig.targetPlaylist) {
            return `spotify:user:${username}:playlist:${targetPlaylist}`;
        }

        playSong(targetDevice = this.spotifyConfig.targetDevice) {
            return this.play(targetDevice, this.getContextUri());
        }
    
        play(device_id = this.targetDevice, context_uri) {
            return this.spotifyObject.play({
                context_uri: context_uri,
                device_id: device_id,
            })
        };
        
}
    
module.exports = SpotifyHelper;