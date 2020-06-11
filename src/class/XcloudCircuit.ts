export class XcloudCircuit {
    id = 0;
    name = "";
    owner = 0;
    state = "active";
    provisioning = 1;
    tenants: number[] = [];
    sites: number[] = [];
    gateways: Gateways[] = [];
    members = "[]";
    va_mode = false;
    va_native_vlan = 1;
}

export class Gateways {
    gateway = "";
    gw_length = 0;
    version = "ipv4";
    nos = "";
    reservedIps: ReservedIps[] = [];
    switchIds: number[] = [];
}

export class ReservedIps {
    id = "";
}
