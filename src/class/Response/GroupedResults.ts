import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'

export class GroupedResults {
    actualResult: any;
    customResult: any;

    //it will create one response of activeport ntu and ntu port creation and simplify that response
    constructor(actualResult: any, customResult: any) {
        this.actualResult = actualResult;
        this.customResult = customResult;
        return this;
    }
}

