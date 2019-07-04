import { BaseLayer } from "./BaseLayer";

var jwt = require('jsonwebtoken');
const fs = require('fs');
var sessionstorage = require('sessionstorage');

export class Authentication extends BaseLayer {

    async Authorize(username: string, password: string) {

        if (username == "munish" && password == "singla") {
            let payload = { username: username, password: password };

            var signOptions = {
                issuer: this.environmentConfig.PrivateKey.Issuer,
                subject: this.environmentConfig.PrivateKey.Subject,
                audience: this.environmentConfig.PrivateKey.Audience,
                expiresIn: this.environmentConfig.PrivateKey.ExpiresIn
                //algorithm: "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
            };

            var token = jwt.sign(payload, this.environmentConfig.PrivateKey.Value, signOptions);
            //sessionstorage.setItem("Authorization", token);
            //console.log("\nToken is1: " + sessionstorage.getItem("Authorization", token));
            return token;
        }
        else {
            return 'invalid';
        }
    }

    verifyAuthentication(token: string) {
        //console.log("\nToken is 2: " + sessionstorage.getItem("Authorization", token));
        var decoded = jwt.verify(token, this.environmentConfig.PrivateKey);
        //console.log(decoded);
        if (decoded.username == "munish" && decoded.password == "singla") {
            return true;
        }
        else
            return false;

    }
}