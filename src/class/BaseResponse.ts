import { EnumModule } from '../Enum/EnumModule'

export class BaseResponse {
    module: EnumModule;
   // message: string;

    constructor(){
        this.module = EnumModule.Storagegrid;
        //this.message = "";
    }
}

