
import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'

export class NetAppClustersRetrievalSuccessResponse extends BaseResponse {

    clusters: any[];

    constructor(netAppClusters: any) {
        super();
        this.module = EnumModule.NetApp;
        this.clusters = netAppClusters;
    }
}

