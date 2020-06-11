import { BaseLayer } from './BaseLayer';
import httppromise, { Options } from 'got';
import sessionstorage from 'sessionstorage';
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

    baseUrl(url: string): string {
        return this.environmentConfig.Xcloud.Urls.BaseUrl + url;
    }

    //Generate new Token for Xcloud
    private generateXcloudToken(): Options {
        const body = "user=" + this.environmentConfig.Xcloud.Username + "&password=" + this.environmentConfig.Xcloud.Password + "&auth_scheme_id=" + this.environmentConfig.Xcloud.auth_scheme_id;

        return {
            url: this.baseUrl(Constants.XcloudAuthURL),
            method: 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: body
        };
    }

    //Check if Xcloud token already exists otherwise it will generate new Token for Xcloud
    protected async authorizeXcloudGrid(): Promise<any> {

        const options = this.generateXcloudToken();
        try {
            const response: any = await httppromise(options);
            const cookie = ((response.headers["set-cookie"]).toString()).split(";")[0];
            sessionstorage.setItem(EnumToken.XcloudCookie, cookie);
            return { connect_sid: cookie };
        } catch (err) {
            console.log('Error')
            throw new Error(err);
        }

    }

    //isAuthorized token
    protected async isAuthorized(): Promise<boolean> {
        sessionstorage.removeItem(EnumToken.XcloudCookie);
        if (await Logger.hasErrorLogs() == true)
            return false;
        else if (await this.authorizeXcloudGrid() == false)
            return false;
        else
            return true;
    }

    //remove token
    protected removeToken(): void {
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