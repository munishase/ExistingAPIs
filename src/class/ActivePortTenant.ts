import { Bucket } from './Bucket'
import { TenantPolicy } from './TenantPolicy';

export class ActivePortTenant {
    id: number;
    description: string;
    name: string;
    tenantId: string;
    tiles: tiles[];


    constructor() {
        this.id = 0;
        this.description = "";
        this.name = "";
        this.tenantId = "";
        this.tiles = [];
    }
}

export class tiles {
    tileId: number;
    serviceTypeCode: string;
    constructor() {
        this.tileId = 0;
        this.serviceTypeCode = "";
    }
}

