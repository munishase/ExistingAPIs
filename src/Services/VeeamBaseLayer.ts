import { Veeam } from '../class/Veeam';
import { BaseLayer } from './BaseLayer';
import httppromise from 'request-promise';
import sessionstorage from 'sessionstorage';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';

export class VeeamBaseLayer extends BaseLayer {

    protected veeam: Veeam = new Veeam();

    constructor() {
        super();
        this.setDefaultValues();
    }

    setDefaultValues(): void {
        //below valaues are default and pickedup from config file
        this.veeam.CloudConnectAgentUid = this.environmentConfig.Veeam.CloudConnectAgentUid;
        this.veeam.BackupProtectionEnabled = this.environmentConfig.Veeam.DefaultValues.BackupProtectionEnabled;
        this.veeam.BackupProtectionPeriod = this.environmentConfig.Veeam.DefaultValues.BackupProtectionPeriod;
        this.veeam.MaxConcurrentTask = this.environmentConfig.Veeam.DefaultValues.MaxConcurrentTask;
        this.veeam.ExpirationEnabled = this.environmentConfig.Veeam.DefaultValues.ExpirationEnabled;
    }

    baseUrl(url: string): string {
        return this.environmentConfig.Veeam.Urls.BaseUrl + url;
    }

    //Generate new Token for veeam
    private generateVeeamToken() {
        //let body = "grant_type=password&username=TESTING.ASEIT.NET%5Cmunish.singla&password=munishtest2019";
        const body = "grant_type=password&username=" + this.environmentConfig.Veeam.Username + "&password=" + this.environmentConfig.Veeam.Password;

        const options = {
            url: this.baseUrl(Constants.VeeamAuthURL),
            method: 'POST',
            body: body
        };
        return httppromise(options);
    }

    //Check if Veeam token already exists otherwise it will generate new Token for Veeam
    protected async authorizeVeeamGrid(): Promise<boolean> {
        if (sessionstorage.getItem(EnumToken.VeeamToken) == null) {
            try {
                const response = await this.generateVeeamToken();
                const veemAuthenticationResponse = JSON.parse(response);
                sessionstorage.setItem(EnumToken.VeeamToken, "Bearer " + veemAuthenticationResponse.access_token)
                Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Veeam, Constants.VeeamAuthSuccess, response, ""))
                return true;
            } catch (err) {
                Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Veeam, Constants.VeeamAuthError, err, ""));
            }
        }
        return false;
    }

    //isAuthorized token
    protected async isAuthorized(): Promise<boolean> {
        if (await Logger.hasErrorLogs() == true)
            return false;
        else if (await this.authorizeVeeamGrid() == false)
            return false;
        else
            return true;
    }


    //remove token
    protected removeToken(): void {
        try {
            sessionstorage.removeItem(EnumToken.VeeamToken);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Veeam, Constants.VeeamTokenRemovedSuccess, "", ""))
        }
        catch (error) {
            console.error(error);
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Veeam, Constants.VeeamTokenRemovedFailure, "", ""));
        }
    }
}