export class XcloudEbgp {
    id: number;
    name: string;
    terminate_on_switch: string;
    neighbor_as: string;
    ip_version: string;
    status: string;
    originate: string;
    vlan: number;
    site_id: number;
    local_ip: string;
    remote_ip: string;
    local_preference: number;
    nfv_port_id: number;
    prefix_length: number;
    prefix_list_outbound: string;
    prefix_list_inbound: string;
    multihop: number;
    weight: number;
    community: string;
    term_switch_id: number;
    allowas_in: number;
    rcircuit_id: string;
    switch_port_id: number;
   
    
    constructor() {
        this.id = 0
        this.name = "";
        this.terminate_on_switch = "";
        this.neighbor_as = "";
        this.ip_version = ""
        this.status = "";
        this.originate = "";
        this.vlan = 0;
        this.site_id = 0;
        this.local_ip = "";
        this.remote_ip = "";
        this.local_preference = 0;
        this.nfv_port_id = 0;
        this.prefix_length = 0;
        this.prefix_list_outbound = "";
        this.prefix_list_inbound = "";
        this.multihop = 0;
        this.weight = 0;
        this.community = "";
        this.term_switch_id = 0;
        this.allowas_in = 0;
        this.rcircuit_id = "";
        this.switch_port_id = 0;
        
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
    //port: string;
    //port_status: string;
    //name: string;
    //slave_ports: string;
    member_state: string;
    //tenant_id: number;
    //site_id: number;
    //admin_down: number;
    //lacp: string;
    //speed: string;
    //childPort: number;

    constructor() {
        this.id = 0;
        this.vlan_id = 0;
        this.port_id = 0
        //this.port = "";
        //this.port_status = "";
        //this.name = "";
        //this.slave_ports = "";
        this.member_state = "active";
        //this.tenant_id = 0
        //this.site_id = 0
        //this.admin_down = 0
        //this.lacp = "";
        //this.speed = "active";
        //this.childPort = 0
    }
}
