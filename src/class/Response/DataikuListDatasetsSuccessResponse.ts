
import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'

export class DataikuListDatasetsSuccessResponse extends BaseResponse {

    response: unknown[];

    constructor(dataikuDatasets: any) {
        super();
        this.module = EnumModule.Dataiku;
        this.response = dataikuDatasets;
    }
}

