import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'

export class XcloudRetrieveSuccessResponse extends BaseResponse {
    message: any;
    constructor(result: any) {
        super();
        this.module = EnumModule.Xcloud;
        this.message = result;
        return this;
    }
}

