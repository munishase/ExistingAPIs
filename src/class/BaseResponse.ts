import { EnumModule } from '../Enum/EnumModule'

export class BaseResponse {
    module: EnumModule;

    constructor(){
        this.module = EnumModule.Storagegrid;
    }
}

