export class ActivePortServiceRequest {
    uuid = "";
    name = "";
    serviceConfigurationId = 0;
    ntuId = 0;
    description = "";
    type = "";
    remotePortUuid = "";
    accountId = "";
    rateLimit = 0;
    hostedType = "";
    awsType = "";
    circuitType = "VLAN"; //TODO default config
    callbackUrl = "";
    downLinkPort = "";
}
