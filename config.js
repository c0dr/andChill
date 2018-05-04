const spotifyConfig = {
  clientId : process.env.spotifyClientID,
  clientSecret : process.env.spotifyClientSecret,
  redirectUri : 'http://simon-schraeder.de/dev/spotify/test',
  accessCode: process.env.spotifyAccessCode,
  accessToken: process.env.spotifyAccessToken,
  refreshToken: process.env.spotifyRefreshToken,
};

const hueConfig = {
  token: process.env.hueToken,
  targetGroup: process.env.hueTargetGroup,
  targetSceneName : process.env.hueTargetSceneName,
};

module.exports = {spotifyConfig: spotifyConfig, hueConfig: hueConfig}