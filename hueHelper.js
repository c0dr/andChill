const request = require('superagent');

class HueHelper {
    
    constructor(config) {
        this.config = config;
    }

    turnLightOn(targetGroup = this.config.targetGroup, targetSceneName = this.config.targetSceneName, token = this.config.token){
        return request
        .put(`/api/0/groups/${targetGroup}/action`)
        .send({
            "on": true,
            "scene": targetSceneName
        }) // sends a JSON post body
        .set('x-token', token);
    }
    
}

module.exports = HueHelper;