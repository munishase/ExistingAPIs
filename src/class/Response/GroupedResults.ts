import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'

export class GroupedResults {
    actualResult: any;
    customResult: any;

    //it will create one response of activeport ntu and ntu port creation and simplify that response
    constructor(results: GroupedResults) {
        this.actualResult = results.actualResult;
        this.customResult = results.customResult;
        return this;
    }
}

