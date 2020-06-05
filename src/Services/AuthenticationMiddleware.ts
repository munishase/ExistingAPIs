import { Authentication } from './Authentication'
import { Request, Response, NextFunction } from 'express';

export class AuthenticationMiddleware {

    verifyAuthentication(req: Request, res: Response, next: NextFunction): void {
        // console.log(req.query);
        const bypassUrls = ['/authenticate', 'swagger'];
        const isBypassUrl = bypassUrls.find((url) => (req.url || "").includes(url));

        if (isBypassUrl || new Authentication().verifyAuthentication(req.header('token'))) {
            next();
        } else {
            throw 'Invalid Login credentials';
        }
    }

}