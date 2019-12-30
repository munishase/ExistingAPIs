import { ActivePort } from '../class/ActivePort';
import { BaseLayer } from './BaseLayer';
const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
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

    baseUrl(url: string) {
        return this.environmentConfig.ActivePort.Urls.BaseUrl + url;
    }

    protected activePort: ActivePort = new ActivePort();

    //Generate new Token for ActivePort
    private generateActivePortToken() {

        this.activePort.Username = this.environmentConfig.ActivePort.Username;
        this.activePort.Password = this.environmentConfig.ActivePort.Password;
        
        let body = {
            "username": this.activePort.Username,
            "password": this.activePort.Password,
            "rememberMe": true
        };

        let options = {
            url: this.baseUrl(Constants.ActivePortAuthURL),
            method: 'POST',
            json: true,
            body: body
        };
        return httppromise(options);
    };


    //Check if ActivePort token already exists otherwise it will generate new Token for ActivePort
    protected authorizeActivePort() {
        if (sessionstorage.getItem(EnumToken.ActivePortToken) == null) {
            
                return this.generateActivePortToken().then(function (response: any) {
                sessionstorage.setItem(EnumToken.ActivePortToken, response.id_token)
                Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortAuthSuccess, response, ""))
                return true;
            }).catch(function (err: any) {
                console.log(err)

                Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortAuthError, err, ""));
                return false;
            })
            //return authorizeResponse;
        }
    }


    //isActivePortAuthorized token
    protected async isActivePortAuthorized() {
        if (await Logger.hasErrorLogs() == true)
            return false;
        else if (await this.authorizeActivePort() == false)
            return false;
        else
            return true;
    }

    //remove token
    protected removeToken() {
      try {
            sessionstorage.removeItem(EnumToken.ActivePortToken);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTokenRemovedSuccess, "", ""))
        }
        catch (error) {
            console.error(error);
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTokenRemovedError, "", ""));
        }
    }
}