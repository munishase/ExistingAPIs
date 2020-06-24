import { StorageGrid } from '../class/StorageGrid';
import { BaseLayer } from './BaseLayer';
import httppromise, { Options, Response } from 'got';
import sessionstorage from 'sessionstorage';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';

export class StorageGridBaseLayer extends BaseLayer {

    constructor() {
        super();
    }

    baseUrl(url: string): string {
        return this.environmentConfig.StorageGrid.Urls.BaseUrl + url;
    }

    protected storageGrid: StorageGrid = new StorageGrid();

    //Generate new Token for StorageGrid
    private async generateStorageGridToken() {

        this.storageGrid.Username = this.environmentConfig.StorageGrid.Username;
        this.storageGrid.Password = this.environmentConfig.StorageGrid.Password;
        this.storageGrid.Cookie = this.environmentConfig.StorageGrid.Cookie;
        this.storageGrid.CsrfToken = this.environmentConfig.StorageGrid.CsrfToken;

        const body = {
            "username": this.storageGrid.Username,
            "password": this.storageGrid.Password,
            "cookie": this.storageGrid.Cookie,
            "csrfToken": this.storageGrid.CsrfToken
        };

        const options: Options = {
            url: this.baseUrl(Constants.StorageGridAuthURL),
            method: 'POST',
            json: body,
            responseType: 'json'
        };
        const { body: response}: any = await httppromise(options) as Response;
        return response;
    }

    //Check if StorageGrid token already exists otherwise it will generate new Token for StorageGrid
    protected async authorizeStorageGrid(): Promise<boolean> {
        if (sessionstorage.getItem(EnumToken.StorageGridToken) == null) {
            try {
                const response: any = await this.generateStorageGridToken();
                sessionstorage.setItem(EnumToken.StorageGridToken, response.data)
                Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Storagegrid, Constants.StorageGridAuthSuccess, response, ""))
                return true;
            } catch (err) {
                Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Storagegrid, Constants.StorageGridAuthError, err, ""));
            }
        }
        return false;
    }

    //Generate new Token for Tenant, but it require StorageGrid Token in Bearer Header
    private async generateTenantToken() {

        const body = {
            "accountId": this.storageGrid.Tenant.AccountId,
            "username": this.environmentConfig.StorageGrid.Tenant.DefaultUsername,
            "password": this.storageGrid.Tenant.UserPassword,
            "cookie": this.environmentConfig.StorageGrid.Tenant.Cookie,
            "csrfToken": this.environmentConfig.StorageGrid.Tenant.CsrfToken
        };

        const options: Options = {
            url: this.baseUrl(Constants.StorageGridAuthURL),
            method: "POST",
            headers: {
                "Authorization": sessionstorage.getItem(EnumToken.StorageGridToken),
                "content-type": "text/json"
            },
            json: body,
            responseType: 'json'
        };
        const { body: response}: any = await httppromise(options) as Response;
        return response;
    }

    //Check if Tenant token already exists in session storage otherwise it will generate new Token for Tenant
    protected async authorizeTenantAccount(): Promise<boolean> {
        if (sessionstorage.getItem(EnumToken.TenantToken) == null) {
            try {
                const response: any = await this.generateTenantToken();
                sessionstorage.setItem(EnumToken.TenantToken, response.data)
                Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Storagegrid, Constants.StorageGridTenantAuthSuccess, response, ""));
            } catch (err) {
                Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Storagegrid, Constants.StorageGridTenantAuthError, err, ""));
                return false;
            }
        }
        return true;
    }

    //isTenantAuthorized token
    protected async isStoragegridAuthorized(): Promise<boolean> {
        if (Logger.hasErrorLogs() == true) {
            return false;
        }
        const authorizeResult = await this.authorizeStorageGrid();
        return !!authorizeResult;
    }

    //isTenantAuthorized token
    protected async isTenantAuthorized(): Promise<boolean> {
        if (Logger.hasErrorLogs() == true) {
            return false;
        }
        const authorizeStorageResult = await this.authorizeStorageGrid();
        if (!authorizeStorageResult) {
            return false;
        }

        const authorizeTenantResult = await this.authorizeTenantAccount();
        if (!authorizeTenantResult) {
            return false;
        }

        return true;
    }

    //remove token
    protected removeToken(): void {
        try {
            sessionstorage.removeItem(EnumToken.StorageGridToken);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Storagegrid, Constants.StoragegridTokenRemovedSuccess, "", ""))
        }
        catch (error) {
            console.error(error);
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Storagegrid, Constants.StoragegridTokenRemovedError, "", ""));
        }

        try {
            sessionstorage.removeItem(EnumToken.TenantToken);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Storagegrid, Constants.StoragegridTenantTokenRemovedSuccess, "", ""))
        }
        catch (error) {
            console.error(error);
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Storagegrid, Constants.StoragegridTenantTokenRemovedError, "", ""));
        }

    }
}