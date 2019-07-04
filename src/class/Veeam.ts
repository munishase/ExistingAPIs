export class Veeam {
    Id: string;
    Name: string;
    Username: string;
    Password: string;
    BackupProtectionEnabled: boolean;
    BackupProtectionPeriod: number;
    MaxConcurrentTask: number;
    VMsBackedUp: number;
    VMsBackedUpToCloud: number;
    ManagedPhysicalServers: number;
    CloudConnectAgentUid: string;
    ExpirationEnabled: boolean;

    constructor() {
        //inpit from other sources like netsuite
        this.Id = "";
        this.Name = "";
        this.Username = "";
        this.Password = "";

        //below are default values for Veeam and need to be set from config 
        this.BackupProtectionEnabled = false;
        this.BackupProtectionPeriod = 0;
        this.MaxConcurrentTask = 0;
        this.CloudConnectAgentUid = "";
        this.ExpirationEnabled = false;
        //

        //below inputs will be provided by user
        this.VMsBackedUp = 0;
        this.VMsBackedUpToCloud = 0;
        this.ManagedPhysicalServers = 0;
    }
}

