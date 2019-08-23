import { Bucket } from './Bucket'
import { TenantPolicy } from './TenantPolicy';

export class ActivePortTenant {
    id: number;
    description: string;
    name: string;
    tenantId: string;
    servicesList: string[];
    

    constructor() {
        this.id = 0;
        this.description = "";
        this.name = "";
        this.tenantId = "";
        this.servicesList = [];
    }
}

