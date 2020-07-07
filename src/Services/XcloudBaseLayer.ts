import { BaseLayer } from './BaseLayer';
import httppromise, { Options, Response } from 'got';
import sessionstorage from 'sessionstorage';
import Constants from '../class/Constants'
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
    protected async authorizeXcloudGrid(): Promise<{ connect_sid: string }> {

        const options = this.generateXcloudToken();
        try {
            const response = await httppromise(options) as Response;
            if (response.headers && response.headers["set-cookie"]) {
                const cookie = ((response.headers["set-cookie"]).toString()).split(";")[0];
                sessionstorage.setItem(EnumToken.XcloudCookie, cookie);
                return { connect_sid: cookie };
            }
        } catch (err) {
            console.error(err)
        }
        throw new Error("Could not authorise XCloud");
    }

    //isAuthorized token
    protected async isAuthorized(): Promise<boolean> {
        sessionstorage.removeItem(EnumToken.XcloudCookie);
        const authorizeResult = await this.authorizeXcloudGrid();
        return !!authorizeResult;
    }

    //remove token
    protected removeToken(): void {
        try {
            sessionstorage.removeItem(EnumToken.XcloudCookie);
            // Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudTokenRemovedSuccess, "", ""))
        }
        catch (error) {
            console.error(error);
            // Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudTokenRemovedFailure, "", ""));
        }
    }

}