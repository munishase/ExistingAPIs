import { EnumModule } from '../../Enum/EnumModule'
import { ActivePortNTUPort } from '../ActivePortNTUPort';

export class ActivePortNTUPortCreationSuccessResponse extends ActivePortNTUPort {
    module: string;
    id: number;
    orgId: string;
    orgName: string;
    tenantId: string;
    

    constructor(activeportNTUPort: ActivePortNTUPort, result: any) {
        super();
        this.module = EnumModule.ActivePort;
        this.id = result.id;
        this.ntuId = activeportNTUPort.ntuId;
        this.description = activeportNTUPort.description;
        this.internetPort = activeportNTUPort.internetPort;
        this.jumbo = activeportNTUPort.jumbo;
        this.label = activeportNTUPort.label;
        this.mac = activeportNTUPort.mac;
        this.name = activeportNTUPort.name;
        this.portSpeed = activeportNTUPort.portSpeed;
        this.portType = activeportNTUPort.portType;
        this.trunk = activeportNTUPort.trunk;
        this.orgId = result.orgId;
        this.orgName = result.orgName;
        this.tenantId = result.tenantId;
    }
}

