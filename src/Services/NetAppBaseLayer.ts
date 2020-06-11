import { BaseLayer } from './BaseLayer';
import sessionstorage from 'sessionstorage';
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

    baseUrl(url: string): string {
        return this.environmentConfig.NetApp.Urls.BaseUrl + Constants.NetAppOrg + this.environmentConfig.NetApp.OrgId + url;
    }

    //retrieve new Token for NetApp
    protected authorizeNetApp(): boolean {
        sessionstorage.setItem(EnumToken.NetAppToken, this.environmentConfig.NetApp.Token)
        return true;
    }

    //isNetAppAuthorized token
    protected async isNetAppAuthorized(): Promise<boolean> {
        if (await Logger.hasErrorLogs() == true)
            return false;
        else if (await this.authorizeNetApp() == false)
            return false;
        else
            return true;
    }

    protected netAppHeader(): any {
        return {
            'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.NetAppToken),
            'content-type': 'application/json'
        }
    }
    //remove token
    protected removeToken(): void {
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