import { NetsuiteClient } from '../class/NetsuiteClient';
import { NetsuiteSuccessResponse } from '../class/NetsuiteSuccessResponse';
import { NetsuiteBaseLayer } from './NetsuiteBaseLayer';
const httppromise = require('request-promise');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule'
import { StorageGridSuccessResponse } from '../class/StorageGridSuccessResponse';
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
    createnetsuiteclient(netsuiteClient: NetsuiteClient) {

        let body = {
            "recordtype": netsuiteClient.RecordType,
            "customform": netsuiteClient.CustomForm,
            "companyname": netsuiteClient.ClientName,
            "currency": netsuiteClient.Currency,
            "custentity_acn": netsuiteClient.ACN
        };

        let options = {
            url: this.baseUrl(Constants.NetsuiteCreateClientURL),
            method: 'POST',
            json: true,
            headers: this.header(),
            body: body
        };

        return httppromise(options).then(function (response: any) {
            let result = JSON.parse(response);
            netsuiteClient.EntityId = result.fields.entityid;
            netsuiteClient.ClientId = result.id;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Netsuite, Constants.NetsuiteClientCreationSuccess, response, body));
        }).catch(function (err: any) {
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Netsuite, Constants.NetsuiteClientCreationError, err, body));
        })

    };

    updatenetsuiteclient(netsuiteClient: NetsuiteClient) {

        let body = {
            "id": netsuiteClient.ClientId,
            "recordtype": netsuiteClient.RecordType,
            "address": netsuiteClient.Address,
            "type": netsuiteClient.Type,
            "status": netsuiteClient.Status
        };

        let options = {
            url: this.baseUrl(Constants.NetsuiteCreateClientURL),
            method: 'PUT',
            json: true,
            headers: this.header(),
            body: body
        };

        return httppromise(options).then(function (response: any) {
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Netsuite, Constants.NetsuiteClientUpdationSuccess, response, body));
        }).catch(function (err: any) {
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Netsuite, Constants.NetsuiteClientUpdationError, err, body));
        })

    };

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