export class XcloudCircuit {
    id: number;
    name: string;
    owner: number;
    state: string;
    provisioning: number;
    tenants: number[];
    sites: number[];
    gateways: Gateways[];
    members: string;
    va_mode: boolean;
    va_native_vlan: number;


    constructor() {
        this.id = 0
        this.name = "";
        this.owner = 0;
        this.state = "active"
        this.provisioning = 1;
        this.tenants = [];
        this.sites = [];
        this.gateways = [];
        this.members = "[]";
        this.va_mode = false;
        this.va_native_vlan = 1;
    }
}


export class Gateways {
    gateway: string;
    gw_length: number;
    version: string;
    nos: string;
    reservedIps: ReservedIps[];
    switchIds: number[];
    constructor() {
        this.gateway = "";
        this.gw_length = 0;
        this.version = "ipv4";
        this.nos = "";
        this.reservedIps = [];
        this.switchIds = [];
    }
}

export class ReservedIps {
    id: string;
    constructor() {
        this.id = "";
    }
}