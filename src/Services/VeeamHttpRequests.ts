import { Veeam } from '../class/Veeam';
import httppromise, { Options } from 'got';
import sessionstorage from 'sessionstorage';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { VeeamBaseLayer } from './VeeamBaseLayer';
import Common from '../class/Common';
import { VeeamSuccessResponse } from '../class/Response/VeeamSuccessResponse';
import { EnumToken } from '../Enum/EnumToken';
import { NetsuiteSuccessResponse } from '../class/Response/NetsuiteSuccessResponse';

export class VeeamHttpRequests extends VeeamBaseLayer {

    constructor() {
        super();
    }

    //Check if Veeam token already exists otherwise it will generate new Token for Veeam
    async createVeeamWithStoragegrid(veeam: Veeam): Promise<void> {

        const body = {
            "name": this.veeam.Name,
            "userName": this.veeam.Username,
            "password": this.veeam.Password,
            "backupProtectionEnabled": this.veeam.BackupProtectionEnabled,
            "backupProtectionPeriod": this.veeam.BackupProtectionPeriod,
            "maxConcurrentTask": this.veeam.MaxConcurrentTask,
            "vMsBackedUp": this.veeam.VMsBackedUp,
            "vMsBackedUpToCloud": this.veeam.VMsBackedUpToCloud,
            "managedPhysicalServers": this.veeam.ManagedPhysicalServers,
            "cloudConnectAgentUid": this.veeam.CloudConnectAgentUid,
            "expirationEnabled": this.veeam.ExpirationEnabled
        };

        const options: Options = {
            url: this.baseUrl(Constants.VeeamTenantURL),
            method: 'POST',
            headers: {
                'Authorization': sessionstorage.getItem(EnumToken.VeeamToken),
                'content-type': 'application/json'
            },
            json: body
        };

        try {
            const response: any = await httppromise(options);
            veeam.Id = response.id;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Veeam, Constants.VeeamAccountCreationSuccess, response, body));
        } catch (err) {
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Veeam, Constants.VeeamAccountCreationError, err, body));
        } finally {
            this.removeToken()
        }

    }

    async createVeeamWithStoragegridAsync(netSuite: NetsuiteSuccessResponse, requestBody: VeeamStorageRequest): Promise<VeeamSuccessResponse | undefined> {

        //if veeam authentication is incorrect
        const isAuthorized = await this.isAuthorized();
        if (!isAuthorized)
            return;

        this.veeam.Name = netSuite.entityId;
        this.veeam.Username = netSuite.entityId;
        this.veeam.Password = Common.randomPassword(12);
        this.veeam.VMsBackedUp = requestBody.vmsbackedup;
        this.veeam.VMsBackedUpToCloud = requestBody.vmsbackeduptocloud;
        this.veeam.ManagedPhysicalServers = requestBody.managedphysicalservers;

        await this.createVeeamWithStoragegrid(this.veeam);
        return new VeeamSuccessResponse(this.veeam);
    }

    async createVeeam(RequestBody: VeeamStorageRequest): Promise<VeeamSuccessResponse | undefined> {

        //if veeam authentication is incorrect
        const isAuthorized = await this.isAuthorized();
        if (!isAuthorized)
            return;

        try {
            this.veeam.Name = RequestBody.name;
            this.veeam.Username = RequestBody.username;
            this.veeam.Password = Common.randomPassword(12);
            this.veeam.VMsBackedUp = RequestBody.vmsbackedup;
            this.veeam.VMsBackedUpToCloud = RequestBody.vmsbackeduptocloud;
            this.veeam.ManagedPhysicalServers = RequestBody.managedphysicalservers;

            await this.createVeeamWithStoragegrid(this.veeam);
            return new VeeamSuccessResponse(this.veeam);
        }
        finally {
            this.removeToken();
        }
    }
}


export default new VeeamHttpRequests();