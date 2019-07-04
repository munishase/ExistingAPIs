//const config = require('../config.json');
import { Authentication } from './Authentication'

export class AuthenticationMiddleware {

    constructor() { }

    verifyAuthentication(req: any, res: any, next: any) {
        let doNotSecureUrls: string[] = ['/authenticate', 'swagger'];
        let secureUrl: Boolean = false;
        doNotSecureUrls.forEach(function (item, index) {
            if (req.url.indexOf(item) >= 0) {
                secureUrl = true;

            }
        });

        if (secureUrl == true || new Authentication().verifyAuthentication(req.header('token')) == true) {
            next();
        }
        else
            throw 'Invalid Login credentials';
    }

    
    private doNotSecureUrls(requestedUrl: string) {

        let doNotSecureUrls: string[] = ['/authenticate', 'swagger'];
        doNotSecureUrls.forEach(function (item, index) {
            if (requestedUrl.indexOf(item) >= 0)
                return true;
        });
        return false;
    }

}