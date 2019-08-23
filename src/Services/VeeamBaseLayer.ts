import { Veeam } from '../class/Veeam';
import { BaseLayer } from './BaseLayer';
const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
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

    setDefaultValues() {
        //below valaues are default and pickedup from config file
        this.veeam.CloudConnectAgentUid = this.environmentConfig.Veeam.CloudConnectAgentUid;
        this.veeam.BackupProtectionEnabled = this.environmentConfig.Veeam.DefaultValues.BackupProtectionEnabled;
        this.veeam.BackupProtectionPeriod = this.environmentConfig.Veeam.DefaultValues.BackupProtectionPeriod;
        this.veeam.MaxConcurrentTask = this.environmentConfig.Veeam.DefaultValues.MaxConcurrentTask;
        this.veeam.ExpirationEnabled = this.environmentConfig.Veeam.DefaultValues.ExpirationEnabled;
    }

    baseUrl(url: string) {
        return this.environmentConfig.Veeam.Urls.BaseUrl + url;
    }

    //Generate new Token for veeam
    private generateVeeamToken() {
        //let body = "grant_type=password&username=TESTING.ASEIT.NET%5Cmunish.singla&password=munishtest2019";
        let body = "grant_type=password&username=" + this.environmentConfig.Veeam.Username + "&password=" + this.environmentConfig.Veeam.Password;

        let options = {
            url: this.baseUrl(Constants.VeeamAuthURL),
            method: 'POST',
            body: body
        };
        return httppromise(options);
    };

    //Check if Veeam token already exists otherwise it will generate new Token for Veeam
    protected authorizeVeeamGrid() {
        
        if (sessionstorage.getItem(EnumToken.VeeamToken) == null) {
                return this.generateVeeamToken().then(function (response: any) {
                let veemAuthenticationResponse = JSON.parse(response);
                sessionstorage.setItem(EnumToken.VeeamToken, "Bearer " + veemAuthenticationResponse.access_token)
                Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Veeam, Constants.VeeamAuthSuccess, response, ""))
                return true;
            }).catch(function (err: any) {
                Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Veeam, Constants.VeeamAuthError, err, ""));
                return false;
            })
        }
    }

    //isAuthorized token
    protected async isAuthorized() {
         if (await Logger.hasErrorLogs() == true)
            return false;
        else if (await this.authorizeVeeamGrid() == false)
            return false;
        else
            return true;
    }


    //remove token
    protected removeToken() {
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