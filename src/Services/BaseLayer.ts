const config = require('../../config.json');

//this baselayer is used to inherit all common things for entire application
export class BaseLayer{
    protected  environmentConfig :any;
    
    constructor(){
        const environment = process.env.NODE_ENV || 'development';
        if (environment === "development"){
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
          }
          this.environmentConfig = config[environment];
      }
}