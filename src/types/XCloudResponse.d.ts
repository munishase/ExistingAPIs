/*
 * Refer: https://xcloud.fluid.aseit.com.au/api/docs
 */

declare class XCloudCircuitResponse extends XCloudBaseResponse {
    data: XCloudCircuit[];
}

declare class XCloudCreateCircuitResponse extends XCloudBaseResponse {
    data: { circuitID: number };
}

declare class XCloudCreateEbgpResponse extends XCloudBaseResponse {
    data: { id: number };
}

declare class XCloudCreateSubnetResponse extends XCloudCreateEbgpResponse { }

declare class XCloudBaseResponse {
    data: unknown;
    statusCode: number;
    status: number;
    error: number;
    message: string;
}

declare class XCloudCircuit {
    id: number;
    name: string;
    owner: number;
    owner_name: string;
    state: string;
    provisioning: number;
    vxlan_id: number;
    mcast_hw_address_last_octet: number;
    mac_address: string;
    site_name: string;
    create_date: string;
    modified_date: string;
    sites_name: unknown[];
    tenants_id: unknown[];
    tenants_name: unknown[];
    circuitTenants: unknown[];
    sites: XCloudSite[];
    tenants: XCloudTenant[];
    gateways: XCloudGateway[];
    members: XCloudMember[];
}

declare class XCloudSite {
    site_id: number;
    site_name: string;
}

declare class XCloudTenant {
    tenant_id: number;
    tenant_name: string;
}

declare class XCloudGateway {
    id: number;
    gateway: string;
    gw_length: number;
    version: string;
}

declare class XCloudMember {
    id: number;
    vlan_id: number;
    port_id: number;
    port: string;
    portname: string;
    switch_ip_address: string;
    port_status: string;
    name: string;
    slave_ports: string;
    mac_count: number;
    switch_id: number;
    member_state: string;
    member_provisioning: number;
    port_add_date: string;
    port_mod_date: string;
    mtu: number;
    tenant_id: number;
    port_tenant_name: string;
    site_id: number;
    last_check_time: string;
    message: string;
    admin_down: number;
    lacp: string;
    switch_name: string;
    speed: number;
    member_internal: number;
    childPort: number;
}