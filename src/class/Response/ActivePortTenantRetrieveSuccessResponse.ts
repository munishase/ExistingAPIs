import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'
import { ActivePortTenant } from '../ActivePortTenant';

export class ActivePortTenantRetrieveSuccessResponse extends BaseResponse {
    ActivePortTenants: ActivePortTenant[];

    constructor(activeportTenants: ActivePortTenant[]) {
        super();
        this.module = EnumModule.ActivePort;
        this.ActivePortTenants = activeportTenants;
        return this;
    }
}

