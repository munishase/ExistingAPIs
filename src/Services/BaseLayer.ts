import config from '../../config.json';

//this baselayer is used to inherit all common things for entire application
export class BaseLayer {
    private _environmentConfig: any;
    protected get environmentConfig(): any {
        return this._environmentConfig;
    }
    protected set environmentConfig(value: any) {
        this._environmentConfig = value;
    }

    constructor() {
        const environment = (process.env.NODE_ENV || 'development').toLowerCase();
        if (environment === "development") {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        else if (environment === "production") {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        this.environmentConfig = config[environment];
    }
}