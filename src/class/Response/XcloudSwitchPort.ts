import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'

export class XcloudSwitchPort extends BaseResponse {
    id: number;
    order_number: string;
    switch: string;
    switch_name: string;
    switch_type: string;
    provider_id: number;
    tenant_id: number;
    port_type: string;
    transceiver: string;
    status: string;
    speed: string;
    present: number;
    type: string;
    member_state: string;
    port_name: string;
    port: string;
    portName: string;
    port_id: number;
    name: string;
    vlan_from: number;
    vlan_to: number;
    port_extension: number;
    slave_port_ids: string;
    parent_port: number;
    switch_id: number;
    tenant: string;
    admin_down: number;
    mtu: number;
    lacp: string;
    site_id: number;
    site_name: string;


    constructor(switchPort: any) {
        super();
        this.module = EnumModule.Xcloud;
        this.id = switchPort.id;
        this.order_number = switchPort.order_number;
        this.switch = switchPort.switch;
        this.switch_name = switchPort.switch_name;
        this.switch_type = switchPort.switch_type;
        this.provider_id = switchPort.provider_id;
        this.tenant_id = switchPort.tenant_id;
        this.port_type = switchPort.port_type;
        this.transceiver = switchPort.transceiver;
        this.status = switchPort.status;
        this.speed = switchPort.speed;
        this.present = switchPort.present;
        this.type = switchPort.type;
        this.member_state = switchPort.member_state;
        this.port_name = switchPort.port_name;
        this.port = switchPort.port;
        this.portName = switchPort.port_name;
        this.port_id = switchPort.port_id;
        this.name = switchPort.name;
        this.vlan_from = switchPort.vlan_from;
        this.vlan_to = switchPort.vlan_to;
        this.port_extension = switchPort.port_extension;
        this.slave_port_ids = switchPort.slave_port_ids;
        this.parent_port = switchPort.parent_port;
        this.switch_id = switchPort.switch_id;
        this.tenant = switchPort.tenant;
        this.admin_down = switchPort.admin_down;
        this.mtu = switchPort.mtu;
        this.lacp = switchPort.lacp;
        this.site_id = switchPort.site_id;
        this.site_name = switchPort.site_name;
        return this;
    }
}

