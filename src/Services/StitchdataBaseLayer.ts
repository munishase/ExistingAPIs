import { Stitchdata } from '../class/Stitchdata';
import { BaseLayer } from './BaseLayer';
import httppromise, { Options, Response } from 'got';
import sessionstorage from 'sessionstorage';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';

export class StitchdataBaseLayer extends BaseLayer {

    constructor() {
        super();
    }

    baseUrl(url: string): string {
        return this.environmentConfig.Stitchdata.Urls.BaseUrl + url;
    }

    protected stitchdata: Stitchdata = new Stitchdata();

    //Generate new Token for Stitch
    private async generateStitchdataToken() {

        this.assignStitchdataEssentials();
        this.stitchdata.GrantType = this.environmentConfig.Stitchdata.GrantType;
        this.stitchdata.ContentType = this.environmentConfig.Stitchdata.ContentType;

        const options: Options = {
            method: 'POST',
            url: this.baseUrl(Constants.StitchdataAuthURL),
            headers:
            {
                'Content-Type': this.stitchdata.ContentType
            },
            form:
            {
                client_secret: this.stitchdata.PartnerSecret,
                code: this.stitchdata.AuthorizationCode,
                grant_type: this.stitchdata.GrantType
            },
            responseType: 'json'
        };
        const { body: response}: any = await httppromise(options) as Response;
        return response;
    }

    //Check if Stitchdata token already exists otherwise it will generate new Token for Stitchdata
    protected async authorizeStitchdata(stitchdata: Stitchdata): Promise<boolean> {
        if (sessionstorage.getItem(EnumToken.StitchdataToken) == null) {
            try {
                const response: any = await this.generateStitchdataToken();
                const jsonResponse = JSON.parse(response);
                stitchdata.AccountId = jsonResponse.stitch_account_id;
                stitchdata.Token = jsonResponse.access_token;
                stitchdata.TokenType = jsonResponse.token_type;
                //temporary commented sessionstorage.setItem(EnumToken.StitchdataToken, jsonResponse.access_token)
                Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataAuthSuccess, response, ""))
                return true;
            } catch (err) {
                Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataAuthError, err, ""));
            }
        }
        return false;
    }


    //Setup stitch object essentials
    protected assignStitchdataEssentials(): void {
        this.stitchdata.PartnerId = this.environmentConfig.Stitchdata.PartnerId;
        this.stitchdata.PartnerSecret = this.environmentConfig.Stitchdata.PartnerSecret;
    }

    //remove token
    protected removeToken(): void {
        try {
            sessionstorage.removeItem(EnumToken.StitchdataToken);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataTokenRemovedSuccess, "", ""))
        } catch (error) {
            console.error(error);
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataTokenRemovedError, "", ""));
        }

    }

}