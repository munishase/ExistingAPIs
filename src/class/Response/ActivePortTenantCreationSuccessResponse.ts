import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'
import { ActivePortTenant } from '../ActivePortTenant';

export class ActivePortTenantCreationSuccessResponse extends BaseResponse {
    id: number;
    description: string;
    name: string;
    tenantId: string;
    servicesList: string[];

    constructor(activeportTenant: ActivePortTenant) {
        super();
        this.module = EnumModule.ActivePort;
        this.id = activeportTenant.id;
        this.description = activeportTenant.description;
        this.name = activeportTenant.name;
        this.tenantId = activeportTenant.tenantId;
        this.servicesList = activeportTenant.servicesList;
        
        return this;
    }
}

