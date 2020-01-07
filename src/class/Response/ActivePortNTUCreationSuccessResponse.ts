import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'
import { ActivePortNTU } from '../ActivePortNTU';

export class ActivePortNTUCreationSuccessResponse extends ActivePortNTU {
    module: string;
    id: number;
    

    constructor(activeportNTU: ActivePortNTU) {
        super();
        this.module = EnumModule.ActivePort;
        this.id = activeportNTU.id;
        return this;
    }
}

