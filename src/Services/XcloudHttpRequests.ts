const httppromise = require('request-promise');
const request = require('request');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { XcloudBaseLayer } from './XcloudBaseLayer';
import { EnumToken } from '../Enum/EnumToken';
import { response } from 'express';
import { Xcloud } from '../class/Xcloud';
import Common from '../class/Common'
import { XcloudRetrieveSuccessResponse } from '../class/Response/XcloudRetrieveSuccessResponse';
import { XcloudSwitchPort } from '../class/Response/XcloudSwitchPort';
import { constants } from 'os';


export class XcloudHttpRequests extends XcloudBaseLayer {

    constructor() {
        super();
    }


    //Here we are retriving all xcloud circuit
    //prerequisite: Xcloud cookie in Header
    async getallcircuits(requestBody: any) {

        if (await this.isAuthorized() == false)
            return;

        let options = {
            url: this.baseUrl(Constants.XcloudCircuitURL),
            method: 'GET',
            headers: {
                'Cookie': sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            json: true
        };
        let self = this;
        let result;
        await httppromise(options).then(function (response: any) {
            result = response;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudCreateNTUSuccess, response, ''));
        }).catch(function (err: any) {
            result = err;
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudCreateNTUError, err, ''));
        })


        return new XcloudRetrieveSuccessResponse(result);
    };


    //Here we add new circuit in xcloud
    async addnewcircuitforxcloud(requestBody: any) {

        if (await this.isAuthorized() == false)
            return;

        let xcloud = new Xcloud();
        xcloud.name = requestBody.name;
        xcloud.owner = requestBody.owner;
        xcloud.state = requestBody.state;
        xcloud.provisioning = requestBody.provisioning;
        xcloud.sites = requestBody.sites;
        xcloud.tenants = requestBody.tenants;
        xcloud.gateways = requestBody.gateways;
        xcloud.members = requestBody.members;
        xcloud.mac_address = requestBody.mac_address;
        xcloud.sites_id = requestBody.sites_id;
        xcloud.sites_name = requestBody.sites_name;
        xcloud.tenants_id = requestBody.tenants_id;
        xcloud.tenants_name = requestBody.tenants_name;
        xcloud.circuitTenants = requestBody.circuitTenants;

        let body = {
            "name": xcloud.name,
            "owner": xcloud.owner,
            "state": xcloud.state,
            "provisioning": xcloud.provisioning,
            "sites": xcloud.sites,
            "tenants": xcloud.tenants,
            "gateways": xcloud.gateways,
            "members": JSON.stringify(xcloud.members),
            "mac_address": xcloud.mac_address,
            "sites_id": xcloud.sites_id,
            "sites_name": xcloud.sites_name,
            "tenants_id": xcloud.tenants_id,
            "tenants_name": xcloud.tenants_name,
            "circuitTenants": xcloud.circuitTenants,
        }


        let options = {
            url: this.baseUrl(Constants.XcloudCircuitURL),
            method: 'POST',
            headers: {
                'Cookie': sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            body: body,
            json: true
        };
        let self = this;
        let result;

        await httppromise(options).then(function (response: any) {
            result = response;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudCreateCircuitSuccess, response, ''));
        }).catch(function (err: any) {
            result = err;
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudCreateCircuitError, err, ''));
        })
        return new XcloudRetrieveSuccessResponse(result);
    };


    //Here  update existing circuit in xcloud
    async updateexistingcircuitforxcloud(requestBody: any) {

        if (await this.isAuthorized() == false)
            return;

        let xcloud = new Xcloud();
        xcloud.id = requestBody.id;
        xcloud.name = requestBody.name;
        xcloud.owner = requestBody.owner;
        xcloud.state = requestBody.state;
        xcloud.provisioning = requestBody.provisioning;
        xcloud.sites = requestBody.sites;
        xcloud.tenants = requestBody.tenants;
        xcloud.gateways = requestBody.gateways;
        xcloud.members = requestBody.members;
        xcloud.mac_address = requestBody.mac_address;
        xcloud.sites_id = requestBody.sites_id;
        xcloud.sites_name = requestBody.sites_name;
        xcloud.tenants_id = requestBody.tenants_id;
        xcloud.tenants_name = requestBody.tenants_name;
        xcloud.circuitTenants = requestBody.circuitTenants;

        let body = {
            "id": xcloud.id,
            "name": xcloud.name,
            "owner": xcloud.owner,
            "state": xcloud.state,
            "provisioning": xcloud.provisioning,
            "sites": xcloud.sites,
            "tenants": xcloud.tenants,
            "gateways": xcloud.gateways,
            "members": JSON.stringify(xcloud.members),
            "mac_address": xcloud.mac_address,
            "sites_id": xcloud.sites_id,
            "sites_name": xcloud.sites_name,
            "tenants_id": xcloud.tenants_id,
            "tenants_name": xcloud.tenants_name,
            "circuitTenants": xcloud.circuitTenants,
        }


        let options = {
            url: this.baseUrl(Constants.XcloudCircuitURL),
            method: 'PUT',
            headers: {
                'Cookie': sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            body: body,
            json: true
        };
        let self = this;
        let result;


        await httppromise(options).then(function (response: any) {
            result = response;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudUpdateCircuitSuccess, response, ''));
        }).catch(function (err: any) {

            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudUpdateCircuitError, err, ''));
        })

        return new XcloudRetrieveSuccessResponse(result);


    };


    //Here  validate existing circuit in xcloud
    async validateexistingcircuitforxcloud(requestBody: any) {

        if (await this.isAuthorized() == false)
            return;

        let xcloud = new Xcloud();
        xcloud.id = requestBody.id;
        xcloud.name = requestBody.name;
        xcloud.owner = requestBody.owner;
        xcloud.state = requestBody.state;
        xcloud.provisioning = requestBody.provisioning;
        xcloud.sites = requestBody.sites;
        xcloud.tenants = requestBody.tenants;
        xcloud.gateways = requestBody.gateways;
        xcloud.members = requestBody.members;
        xcloud.mac_address = requestBody.mac_address;
        xcloud.sites_id = requestBody.sites_id;
        xcloud.sites_name = requestBody.sites_name;
        xcloud.tenants_id = requestBody.tenants_id;
        xcloud.tenants_name = requestBody.tenants_name;
        xcloud.circuitTenants = requestBody.circuitTenants;

        let body = {
            "id": xcloud.id,
            "name": xcloud.name,
            "owner": xcloud.owner,
            "state": xcloud.state,
            "provisioning": xcloud.provisioning,
            "sites": xcloud.sites,
            "tenants": xcloud.tenants,
            "gateways": xcloud.gateways,
            "members": JSON.stringify(xcloud.members)
        }


        let options = {
            url: this.baseUrl(Constants.XcloudValidateCircuitURL),
            method: 'PUT',
            headers: {
                'Cookie': sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            body: body,
            json: true
        };
        let self = this;
        let result;

        await httppromise(options).then(function (response: any) {
            result = response;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudValidateCircuitSuccess, response, ''));
        }).catch(function (err: any) {
            result = err;
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudValidateCircuitError, err, ''));
        })

        return new XcloudRetrieveSuccessResponse(result);
    };

    //Here circuit deleted in xcloud
    async deletecircuitforxcloud(requestBody: any) {

        if (await this.isAuthorized() == false)
            return;

        let xcloud = new Xcloud();
        xcloud.id = requestBody.id;
        xcloud.owner = requestBody.owner;
        xcloud.members = requestBody.members;

        var body = {
            "id": xcloud.id,
            "owner": xcloud.owner,
            "members": JSON.stringify(xcloud.members)
        }

        let options = {
            url: this.baseUrl(Constants.XcloudCircuitURL),
            method: 'DELETE',
            headers: {
                Cookie: sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            body: body,
            json: true
        };

        let result;
        await httppromise(options).then(function (response: any) {
            result = response;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudDeleteCircuitSuccess, response, ''));
        }).catch(function (err: any) {
            result = err;

            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudDeleteCircuitError, err, ''));
        })
        return new XcloudRetrieveSuccessResponse(result);
    };

    //here to find switch port by id
    async retrieveswitchportbyid(params: any) {
       
        if (await this.isAuthorized() == false)
            return;

        let options = {
            url: this.baseUrl(Constants.XcloudSwitchPortURL),
            method: 'GET',
            headers: {
                Cookie: sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            json: true
        };

        let result;
        let switchPort
        await httppromise(options).then(function (response: any) {

            switchPort = response.data.filter(function (switchport: any) {
                return switchport.id == params.switchportid;
            })[0]

            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.fluid, Constants.XcloudGetSwitchPortSuccess, response, ''));
        }).catch(function (err: any) {
            result = err;
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.fluid, Constants.XcloudGetSwitchPortError, err, ''));
        })

        
        //if there is o switchport with the id then
        if (switchPort == undefined){
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.fluid, Constants.XcloudGetSwitchPortError, Constants.XcloudNoSwitchPortError, ''));
            return undefined;
        }
        else
            return new XcloudSwitchPort(switchPort);
    };

}


export default new XcloudHttpRequests();