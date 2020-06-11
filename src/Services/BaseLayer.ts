import config from 'config';

//this baselayer is used to inherit all common things for entire application
export class BaseLayer {
    protected environmentConfig: any = config;

    constructor() {
        const environment = (process.env.NODE_ENV || 'development').toLowerCase();
        if (environment === "development") {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        else if (environment === "production") {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
    }
}