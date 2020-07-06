export class XcloudEbgp {
    id!: number;
    name = "";
    terminate_on_switch = "no";
    neighbor_as = 0;
    bgp_password = "";
    ip_version = "ipv4";
    status = "enabled";
    originate = "disabled";
    vlan = 0;
    site_id = 0;
    local_ip = "";
    remote_ip = "";
    local_preference = 100;
    prefix_length = 0;
    prefix_list_outbound = "";
    prefix_list_inbound = "";
    multihop = 0;
    weight = 0;
    community = "";
    term_switch_id = 0;
    allowas_in = 0;
    rcircuit_id = 0;
    switch_port_id = 0;
    nfv_port_id!: number;
}
