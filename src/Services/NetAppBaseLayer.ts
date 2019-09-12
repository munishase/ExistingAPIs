import { BaseLayer } from './BaseLayer';
const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';

export class NetAppBaseLayer extends BaseLayer {

    constructor() {
        super();
    }

    baseUrl(url: string) {
        return this.environmentConfig.NetApp.Urls.BaseUrl + Constants.NetAppOrg + this.environmentConfig.NetApp.OrgId + url;
    }

    //protected activePort: ActivePort = new ActivePort();


    //retrieve new Token for NetApp
    protected authorizeNetApp() {
        sessionstorage.setItem(EnumToken.NetAppToken, this.environmentConfig.NetApp.Token)
        return true;
    }

    //isNetAppAuthorized token
    protected async isNetAppAuthorized() {
        if (await Logger.hasErrorLogs() == true)
            return false;
        else if (await this.authorizeNetApp() == false)
            return false;
        else
            return true;
    }

    protected netAppHeader() {
        let header =
        {
            'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.NetAppToken),
            'content-type': 'application/json'
        }
        return header;
    }
    //remove token
    protected removeToken() {
        try {
            sessionstorage.removeItem(EnumToken.NetAppToken);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.ActivePortTokenRemovedSuccess, "", ""))
        }
        catch (error) {
            console.error(error);
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.ActivePortTokenRemovedError, "", ""));
        }
    }

}