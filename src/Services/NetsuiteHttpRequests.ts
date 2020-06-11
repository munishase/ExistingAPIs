import { NetsuiteClient } from '../class/NetsuiteClient';
import { NetsuiteSuccessResponse } from '../class/Response/NetsuiteSuccessResponse';
import { NetsuiteBaseLayer } from './NetsuiteBaseLayer';
import httppromise, { Options } from 'got';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule'
import { EnumCurrency } from '../Enum/EnumCurrency';
import { EnumCustomForm } from '../Enum/EnumCustomForm';
import { EnumClientStatus } from '../Enum/EnumClientStatus';
import { EnumClientType } from '../Enum/EnumClientType';

class NetsuiteHttpRequests extends NetsuiteBaseLayer {

    netsuiteClient: NetsuiteClient = new NetsuiteClient();

    constructor() {
        super();
    }

    //create netsuite client
    async createnetsuiteclient(netsuiteClient: NetsuiteClient) {

        const body = {
            "recordtype": netsuiteClient.RecordType,
            "customform": netsuiteClient.CustomForm,
            "companyname": netsuiteClient.ClientName,
            "currency": netsuiteClient.Currency,
            "custentity_acn": netsuiteClient.ACN
        };

        const options: Options = {
            url: this.baseUrl(Constants.NetsuiteCreateClientURL),
            method: 'POST',
            headers: this.header(),
            json: body
        };

        try {
            const response: any = await httppromise(options);
            const result = JSON.parse(response);
            netsuiteClient.EntityId = result.fields.entityid;
            netsuiteClient.ClientId = result.id;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Netsuite, Constants.NetsuiteClientCreationSuccess, response, body));
        } catch (err) {
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Netsuite, Constants.NetsuiteClientCreationError, err, body));
        }

    }

    async updatenetsuiteclient(netsuiteClient: NetsuiteClient) {
        const body = {
            "id": netsuiteClient.ClientId,
            "recordtype": netsuiteClient.RecordType,
            "address": netsuiteClient.Address,
            "type": netsuiteClient.Type,
            "status": netsuiteClient.Status
        };

        const options: Options = {
            url: this.baseUrl(Constants.NetsuiteCreateClientURL),
            method: 'PUT',
            headers: this.header(),
            json: body
        };

        try {
            const response: any = await httppromise(options);
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Netsuite, Constants.NetsuiteClientUpdationSuccess, response, body));
        } catch (err) {
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Netsuite, Constants.NetsuiteClientUpdationError, err, body));
        }

    }

    //setup netsuite client details with storagegrid details & call create netsuite client
    async createnetsuiteclientAsync(RequestBody: any, webResponse: any) {

        if (Logger.hasErrorLogs() == true)
            return;

        this.netsuiteClient.RecordType = "customer";
        this.netsuiteClient.CustomForm = EnumCustomForm.ASEClientForm;
        this.netsuiteClient.ClientName = RequestBody.clientname;
        this.netsuiteClient.Currency = EnumCurrency.AUD;
        this.netsuiteClient.ACN = RequestBody.acn;
        await this.createnetsuiteclient(this.netsuiteClient)
        return new NetsuiteSuccessResponse(this.netsuiteClient);
    }

    //async updatenetsuiteclientAsync(storageGrid: StorageGridSuccessResponse, RequestBody: any, webResponse: any) {
    async updatenetsuiteclientAsync(storageGrid: any, RequestBody: any, webResponse: any) {

        if (Logger.hasErrorLogs() == true)
            return;

        ///here we are temporary storing tenantname & bucketname in netsuite sublist address 
        this.netsuiteClient.Address = storageGrid.tenantaccountid;
        this.netsuiteClient.Type = EnumClientType.Company;
        this.netsuiteClient.Status = EnumClientStatus.CLIENTClosedWon;
        await this.updatenetsuiteclient(this.netsuiteClient);
        return new NetsuiteSuccessResponse(this.netsuiteClient);
    }

}


export default new NetsuiteHttpRequests();