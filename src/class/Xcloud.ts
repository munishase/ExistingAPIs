import { throws } from "assert";

export class Xcloud {
    id: number;
    name: string;
    owner: number;
    state: string;
    provisioning: number;
    sites: Sites[];
    tenants: Tenants[];
    gateways: Gateways[]
    members: Members[]
    mac_address: string;
    sites_id: string[];
    sites_name: string[];
    tenants_id: number[];
    tenants_name: string[];
    circuitTenants: number[];
    
    constructor() {
        this.id = 0
        this.name = "";
        this.owner = 0;
        this.state = ""
        this.provisioning = 0;
        this.sites = [];
        this.tenants = [];
        this.gateways = [];
        this.members = [];
        this.mac_address = "";
        this.sites_id = [];
        this.sites_name = [];
        this.tenants_id = [];
        this.tenants_name = [];
        this.circuitTenants = [];
    }
}


export class Sites {
    site_id: number;
    site_name: string;
    constructor() {
        this.site_id = 0;
        this.site_name = "";
    }
}


export class Tenants {
    tenant_id: number;
    tenant_name: string;
    constructor() {
        this.tenant_id = 0;
        this.tenant_name = "";
    }
}


export class Gateways {
    gateway: string;
    gw_length: number;
    tenant_name: string;
    constructor() {
        this.gateway = "";
        this.gw_length = 0;
        this.tenant_name = "";
    }
}


export class Members {
    id: number;
    vlan_id: number;
    port_id: number;
    port: string;
    port_status: string;
    name: string;
    slave_ports: string;
    member_state: string;
    tenant_id: number;
    site_id: number;
    admin_down: number;
    lacp: string;
    speed: string;
    childPort: number;

    constructor() {
        this.id = 0;
        this.vlan_id = 0;
        this.port_id = 0
        this.port = "";
        this.port_status = "";
        this.name = "";
        this.slave_ports = "";
        this.member_state = "active";
        this.tenant_id = 0
        this.site_id = 0
        this.admin_down = 0
        this.lacp = "";
        this.speed = "active";
        this.childPort = 0
    }
}
