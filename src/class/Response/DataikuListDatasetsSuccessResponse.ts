
import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'

export class DataikuListDatasetsSuccessResponse extends BaseResponse {
    
    clusters: any[];

    constructor(dataikuDatasets: any) {
        super();
        this.module = EnumModule.Dataiku;
        this.clusters = dataikuDatasets;
        
        return this;
    }
}

