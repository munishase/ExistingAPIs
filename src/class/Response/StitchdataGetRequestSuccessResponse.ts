import { BaseResponse } from '../BaseResponse';

export class StitchdataGetRequestSuccessResponse extends BaseResponse {
    access_token: string;
    message: any;
    

    constructor(access_token: string, message: any) {
        super();
        this.access_token = access_token;
        this.message = message;
        return this;
    }
}

