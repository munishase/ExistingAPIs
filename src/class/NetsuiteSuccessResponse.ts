import { NetsuiteClient } from './NetsuiteClient'
import { EnumModule } from '../Enum/EnumModule'
import { BaseResponse } from './BaseResponse'

export class NetsuiteSuccessResponse extends BaseResponse {
    entityId:string;
    clientId: string;
    ClientName: string;
    ACN: string;

    constructor(netsuiteClient: NetsuiteClient) {
        super();
        this.module = EnumModule.Netsuite;
        this.entityId = netsuiteClient.EntityId;
        this.clientId = netsuiteClient.ClientId;
        this.ClientName = netsuiteClient.ClientName;
        this.ACN = netsuiteClient.ACN;
        return this;
    }
}

