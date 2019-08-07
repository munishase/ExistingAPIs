import { Stitchdata } from './Stitchdata'
import { EnumModule } from '../Enum/EnumModule'
import { BaseResponse } from './BaseResponse'

export class StitchdataSuccessResponse extends BaseResponse {
    access_token: string;
    token_type: string;
    stitch_account_id: string;
    
    constructor(stitchdata: Stitchdata) {
        super();
        this.module = EnumModule.Stitchdata;
        this.access_token = stitchdata.Token;
        this.token_type = stitchdata.TokenType;
        this.stitch_account_id = stitchdata.AccountId;
        return this;
    }
}

