import { Bucket } from './Bucket'
import { TenantPolicy } from './TenantPolicy';

export class ActivePortNTU {
    id: number;
    autoRollback: boolean;
    burstTime: number;
    configBackup: boolean;
    defaultRate: number;
    description: string;
    enableBod: boolean;
    endpoint: string;
    firmwareVersion: string;
    ipAddress: string;
    loIp: string;
    locationId: string;
    maxRate: number;
    minRate: number;
    mode: string;
    name: string;
    ntutypeId: number;
    restEnabled: boolean;
    restPassword: string;
    restUsername: string;
    secondUplinkPort: string;
    serialNumber: string;
    tenantId: string;
    timeZone: string;
    uplinkPort: string;
    constructor() {
        this.id = 0;
        this.autoRollback = true;
        this.burstTime = 0;
        this.configBackup = true;
        this.defaultRate = 0;
        this.description = "";
        this.enableBod = true;
        this.endpoint = "";
        this.firmwareVersion = "15.1X49-D130";
        this.ipAddress = "";
        this.loIp = "";
        this.locationId = "";
        this.maxRate = 1000;
        this.minRate = 100;
        this.mode = "EDGE";
        this.name = "";
        this.ntutypeId = 0;
        this.restEnabled = true;
        this.restPassword = "";
        this.restUsername = "";
        this.secondUplinkPort = "";
        this.serialNumber = "";
        this.tenantId = "";
        this.timeZone = "";
        this.uplinkPort = "";
    }
}

