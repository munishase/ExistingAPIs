import { Bucket } from './Bucket'
import { TenantPolicy } from './TenantPolicy';

export class ActivePortNTUPort {
    id: number;
    ntuId: number;
    description: string;
    internetPort: boolean;
    jumbo: boolean;
    label: string;
    mac: string;
    name: string;
    portSpeed: string;
    portType: string;
    trunk: boolean
    constructor() {
        this.id = 0;
        this.ntuId = 0;
        this.description = "";
        this.internetPort = false;
        this.jumbo = true;
        this.label = "";
        this.mac = "";
        this.name = "";
        this.portSpeed = "";
        this.portType = "";
        this.trunk = false;
       
    }
}

