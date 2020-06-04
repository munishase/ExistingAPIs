import { ActivePort } from '../class/ActivePort';
import { BaseLayer } from './BaseLayer';
import httppromise from 'request-promise';
import sessionstorage from 'sessionstorage';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';

export class ActivePortBaseLayer extends BaseLayer {

    constructor() {
        super();
    }

    baseUrl(url: string): string {
        return this.environmentConfig.ActivePort.Urls.BaseUrl + url;
    }

    protected activePort: ActivePort = new ActivePort();

    //Generate new Token for ActivePort
    private async generateActivePortToken() {

        this.activePort.Username = this.environmentConfig.ActivePort.Username;
        this.activePort.Password = this.environmentConfig.ActivePort.Password;

        const body = {
            "username": this.activePort.Username,
            "password": this.activePort.Password,
            "rememberMe": true
        };

        const options = {
            url: this.baseUrl(Constants.ActivePortAuthURL),
            method: 'POST',
            json: true,
            body: body
        };
        return await httppromise(options);
    }


    //Check if ActivePort token already exists otherwise it will generate new Token for ActivePort
    protected async authorizeActivePort(): Promise<boolean> {
        if (sessionstorage.getItem(EnumToken.ActivePortToken) == null) {
            try {
                const response = await this.generateActivePortToken();
                sessionstorage.setItem(EnumToken.ActivePortToken, response.id_token)
                Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortAuthSuccess, response, ""))
                return true;
            } catch (err) {
                console.error(err)
                Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortAuthError, err, ""));
                return false;
            }
        }
        return false;
    }


    //isActivePortAuthorized token
    protected async isActivePortAuthorized(): Promise<boolean> {
        if (await Logger.hasErrorLogs() == true)
            return false;
        else if (await this.authorizeActivePort() == false)
            return false;
        else
            return true;
    }

    //remove token
    protected removeToken(): void {
        try {
            sessionstorage.removeItem(EnumToken.ActivePortToken);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTokenRemovedSuccess, "", ""))
        } catch (error) {
            console.error(error);
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTokenRemovedError, "", ""));
        }
    }
}