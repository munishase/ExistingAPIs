import { BaseLayer } from "./BaseLayer";
import jwt from 'jsonwebtoken';
import AuthenticationToken from "../types/AuthenticationToken";

export class Authentication extends BaseLayer {

    public Authorize(username: string, password: string): string {
        if (username == "munish" && password == "singla") {
            const payload = { username, password };

            const signOptions = {
                issuer: this.environmentConfig.PrivateKey.Issuer,
                subject: this.environmentConfig.PrivateKey.Subject,
                audience: this.environmentConfig.PrivateKey.Audience,
                expiresIn: this.environmentConfig.PrivateKey.ExpiresIn
                //algorithm: "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
            };

            return jwt.sign(payload, this.environmentConfig.PrivateKey.Value, signOptions);
        } else {
            throw new Error("invalid");
        }
    }

    public verifyAuthentication(token: unknown): boolean {
        if (token && typeof token === 'string') {
            const decoded = jwt.verify(token, this.environmentConfig.PrivateKey) as AuthenticationToken;
            return decoded.username === "munish" && decoded.password === "singla";
        }
        return false;
    }
}