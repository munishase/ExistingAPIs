import { BaseLayer } from './BaseLayer';
const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';

export class DataikuBaseLayer extends BaseLayer {

    constructor() {
        super();
    }

    baseUrl(url: string) {
        return this.environmentConfig.Dataiku.Urls.BaseUrl + url;
    }

    //retrieve new Token for Dataiku
    protected authorizeDataiku() {
        sessionstorage.setItem(EnumToken.DataikuToken, this.environmentConfig.Dataiku.Secret)
        return true;
    }

    //isDataikuAuthorized token
    protected async isDataikuAuthorized() {
        if (await Logger.hasErrorLogs() == true)
            return false;
        else if (await this.authorizeDataiku() == false)
            return false;
        else
            return true;
    }

    protected dataikuHeader() {
        let auth =
        {
            user: '6SBXJWiJWg7BUAiKcgodLwXEczrIL3pf',
            password: ''
          }
        return auth;
    }

    //remove token
    protected removeToken() {
        try {
            sessionstorage.removeItem(EnumToken.DataikuToken);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuTokenRemovedSuccess, "", ""))
        }
        catch (error) {
            console.error(error);
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuTokenRemovedError, "", ""));
        }
    }

}