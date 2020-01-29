import { BaseLayer } from './BaseLayer';
const request = require('request');
const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';

export class XcloudBaseLayer extends BaseLayer {

    constructor() {
        super();
    }

    baseUrl(url: string) {
        return this.environmentConfig.Xcloud.Urls.BaseUrl + url;
    }

    //Generate new Token for Xcloud
    private generateXcloudToken() {
        let body = "user=" + this.environmentConfig.Xcloud.Username + "&password=" + this.environmentConfig.Xcloud.Password + "&auth_scheme_id=" + this.environmentConfig.Xcloud.auth_scheme_id;

        let options = {
            url: this.baseUrl(Constants.XcloudAuthURL),
            method: 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: body
        };

        return options;
    };

    //Check if Xcloud token already exists otherwise it will generate new Token for Xcloud
    protected async authorizeXcloudGrid() {

        let options = this.generateXcloudToken();
        return new Promise((resolve, reject) => {
            request(options, function (error: any, response: any) {
                if (error) {
                    console.log('Error')
                    throw new Error(error);
                }
                else {
                    let cookie = ((response.headers["set-cookie"]).toString()).split(";")[0];
                    sessionstorage.setItem(EnumToken.XcloudCookie, cookie)
                    return resolve({ connect_sid: cookie })
                }
            });
        })

    }

    //isAuthorized token
    protected async isAuthorized() {
        sessionstorage.removeItem(EnumToken.XcloudCookie);
        if (await Logger.hasErrorLogs() == true)
            return false;
        else if (await this.authorizeXcloudGrid() == false)
            return false;
        else
            return true;
    }

    //remove token
    protected removeToken() {
        try {
            sessionstorage.removeItem(EnumToken.XcloudCookie);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudTokenRemovedSuccess, "", ""))
        }
        catch (error) {
            console.error(error);
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudTokenRemovedFailure, "", ""));
        }
    }

}