import { EnumModule } from '../../Enum/EnumModule'
import { ActivePortNTU } from '../ActivePortNTU';

export class ActivePortNTUCreationSuccessResponse extends ActivePortNTU {
    module: string;
    id: number;
    

    constructor(activeportNTU: ActivePortNTU) {
        super();
        this.module = EnumModule.ActivePort;
        this.id = activeportNTU.id;
        this.autoRollback = activeportNTU.autoRollback;
        this.burstTime = activeportNTU.burstTime;
        this.configBackup = activeportNTU.configBackup;
        this.defaultRate = activeportNTU.defaultRate;
        this.description = activeportNTU.description;
        this.enableBod = activeportNTU.enableBod;
        this.endpoint = activeportNTU.endpoint;
        this.firmwareVersion = activeportNTU.firmwareVersion;
        this.ipAddress = activeportNTU.ipAddress;
        this.loIp = activeportNTU.loIp;
        this.serviceConfigurationId = activeportNTU.serviceConfigurationId;
        this.maxRate = activeportNTU.maxRate;
        this.minRate = activeportNTU.minRate;
        this.mode = activeportNTU.mode;
        this.name = activeportNTU.name;
        this.ntutypeId = activeportNTU.ntutypeId;
        this.restEnabled = activeportNTU.restEnabled;
        this.restPassword = activeportNTU.restPassword;
        this.restUsername = activeportNTU.restUsername;
        this.secondUplinkPort = activeportNTU.secondUplinkPort;
        this.serialNumber = activeportNTU.serialNumber;
        this.tenantId = activeportNTU.tenantId;
        this.timeZone = activeportNTU.timeZone;
        this.uplinkPort = activeportNTU.uplinkPort;
    }
}

