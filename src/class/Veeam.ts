export class Veeam {
    // input from other sources like netsuite
    Id = "";
    Name = "";
    Username = "";
    Password = "";

    // below are default values for Veeam and need to be set from config 
    BackupProtectionEnabled = false;
    BackupProtectionPeriod = 0;
    MaxConcurrentTask = 0;
    CloudConnectAgentUid = "";
    ExpirationEnabled = false;

    // below inputs will be provided by user
    VMsBackedUp = 0;
    VMsBackedUpToCloud = 0;
    ManagedPhysicalServers = 0;
}
