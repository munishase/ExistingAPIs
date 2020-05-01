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
    prefix_length: number;
    prefix_list_outbound: string;
    prefix_list_inbound: string;
    multihop: number;
    weight: number;
    community: string;
    term_switch_id: number;
    allowas_in: number;
    rcircuit_id: number;
    switch_port_id: number;
   
    
    constructor() {
        this.id = 0
        this.name = "";
        this.terminate_on_switch = "yes"; //default value
        this.neighbor_as = "";
        this.ip_version = "ipv4"
        this.status = "enabled"; //default value
        this.originate = "disabled"; //default value
        this.vlan = 0;
        this.site_id = 0;
        this.local_ip = "";
        this.remote_ip = "";
        this.local_preference = 100; //default value
        this.prefix_length = 0;
        this.prefix_list_outbound = ""; //default value
        this.prefix_list_inbound = ""; //default value
        this.multihop = 0; //default value
        this.weight = 0; //default value
        this.community = ""; //default value
        this.term_switch_id = 0;
        this.allowas_in = 0; //default value
        this.rcircuit_id = 0; //default value
        this.switch_port_id = 0;
        
    }
}