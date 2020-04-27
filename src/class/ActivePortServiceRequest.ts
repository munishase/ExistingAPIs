

export class ActivePortServiceRequest {
    uuid: string;
    name: string;
    serviceConfigurationId: number;
    ntuId: number;
    description: string
    type: string
    remotePortUuid: string
    accountId: string
    rateLimit: number
    hostedType: string
    awsType: string
    circuitType: string
    callbackUrl: string
    downLinkPort: string
    constructor() {
        this.uuid = "";
        this.name = "";
        this.serviceConfigurationId = 0;
        this.ntuId = 0;
        this.description = "";
        this.type = "";
        this.remotePortUuid = "";
        this.accountId = "";
        this.rateLimit = 0;
        this.hostedType = "";
        this.awsType = "";
        this.circuitType = "";
        this.callbackUrl = "";
        this.downLinkPort = "";
    }
}

