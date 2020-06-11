import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'
import { ActivePortNTU } from '../ActivePortNTU';

export class ActivePortNtuRetrieveSuccessResponse extends BaseResponse {
    ActivePortNTU: ActivePortNTU[];

    constructor(activeportNTUs: ActivePortNTU[]) {
        super();
        this.module = EnumModule.ActivePort;
        this.ActivePortNTU = activeportNTUs;
    }
}

