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
import { XcloudCircuit } from '../class/XcloudCircuit';
import Common from '../class/Common'
import { XcloudRetrieveSuccessResponse } from '../class/Response/XcloudRetrieveSuccessResponse';
import { XcloudSwitchPort } from '../class/Response/XcloudSwitchPort';
import { constants } from 'os';
import { XcloudEbgp } from '../class/XcloudEbgp';
import DbCrudOperations from './DbCrudOperations';
import { XcloudSubnet } from '../class/XcloudSubnet';
import { EnumResultType } from '../Enum/EnumResultType';
import { EnumXcloudSubnetType } from '../Enum/EnumXcloudSubnetType';
const uuidv1 = require('uuid');

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

        let xcloudCircuit = new XcloudCircuit();
        xcloudCircuit.name = requestBody.virtualNetworkName;
        xcloudCircuit.owner = requestBody.owner;
        xcloudCircuit.tenants = requestBody.tenants;
        xcloudCircuit.sites = requestBody.sites;
        xcloudCircuit.gateways = requestBody.gateways;

        let body = {
            "name": xcloudCircuit.name,
            "owner": xcloudCircuit.owner,
            "state": xcloudCircuit.state,
            "provisioning": xcloudCircuit.provisioning,
            "tenants": xcloudCircuit.tenants,
            "sites": xcloudCircuit.sites,
            "gateways": xcloudCircuit.gateways,
            "members": xcloudCircuit.members,
            "va_mode": xcloudCircuit.va_mode,
            "va_native_vlan": xcloudCircuit.va_native_vlan
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
            xcloudCircuit.id = response.circuitID;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudCreateCircuitSuccess, response, ''));
        }).catch(function (err: any) {
            result = err;
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudCreateCircuitError, err, ''));
        })
        return new XcloudRetrieveSuccessResponse(xcloudCircuit);
    };

    /*
    
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
    */

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

            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, response, EnumResultType.success));
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.fluid, Constants.XcloudGetSwitchPortSuccess, response, ''));
        }).catch(function (err: any) {
            result = err;
            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, err, EnumResultType.fail));
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.fluid, Constants.XcloudGetSwitchPortError, err, ''));
        })


        //if there is o switchport with the id then
        if (switchPort == undefined) {
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.fluid, Constants.XcloudGetSwitchPortError, Constants.XcloudNoSwitchPortError, ''));
            return undefined;
        }
        else
            return new XcloudSwitchPort(switchPort);
    };

    //add ebgp in xcloud
    async addEbgpforxcloud(requestBody: any, activeportCreateServiceByUUID: any) {

        if (await this.isAuthorized() == false)
            return;

        let xcloudEbgp = new XcloudEbgp();
        xcloudEbgp.name = activeportCreateServiceByUUID.uuid;
        //xcloudEbgp.site_id = activeportCreateServiceByUUID.locationId;
        xcloudEbgp.site_id = requestBody.site_id;

        //set for testing environment
        //start
        let customerIp = "40.40.40.1/30";
        let ipDetails = customerIp.split("/");
        xcloudEbgp.neighbor_as = "65999"; //requestBody.neighbor_as;
        xcloudEbgp.vlan = 3; //activeportCreateServiceByUUID.vlanIdB;
        xcloudEbgp.remote_ip = "40.40.40.2"; //activeportCreateServiceByUUID.providerIp;
        xcloudEbgp.local_ip = ipDetails[0]; //activeportCreateServiceByUUID.customerIp;
        xcloudEbgp.prefix_length = parseInt(ipDetails[1]);//requestBody.prefix_length;
        xcloudEbgp.term_switch_id = 143;//requestBody.term_switch_id;
        xcloudEbgp.switch_port_id = 18663;//requestBody.switch_port_id;
        //end

        //values set in class as default so no need to asign from any request
        //xcloudEbgp.prefix_list_outbound = requestBody.prefix_list_outbound;
        //xcloudEbgp.prefix_list_inbound = requestBody.prefix_list_inbound;
        //xcloudEbgp.status = requestBody.status;
        //xcloudEbgp.originate = requestBody.originate;
        //xcloudEbgp.local_preference = activeportCreateServiceByUUID.bgpAuthKey;
        //xcloudEbgp.terminate_on_switch = requestBody.terminate_on_switch;
        //xcloudEbgp.ip_version = requestBody.ip_version;
        //xcloudEbgp.multihop = requestBody.multihop;
        //xcloudEbgp.weight = requestBody.weight;
        //xcloudEbgp.community = requestBody.community;
        //xcloudEbgp.allowas_in = requestBody.allowas_in;
        //xcloudEbgp.rcircuit_id = requestBody.rcircuit_id;


        let body = {
            "name": xcloudEbgp.name,
            "terminate_on_switch": xcloudEbgp.terminate_on_switch,
            "neighbor_as": xcloudEbgp.neighbor_as,
            "ip_version": xcloudEbgp.ip_version,
            "status": xcloudEbgp.status,
            "originate": xcloudEbgp.originate,
            "vlan": xcloudEbgp.vlan,
            "site_id": xcloudEbgp.site_id,
            "local_ip": xcloudEbgp.local_ip,
            "remote_ip": xcloudEbgp.remote_ip,
            "local_preference": xcloudEbgp.local_preference,
            "prefix_length": xcloudEbgp.prefix_length,
            "prefix_list_outbound": xcloudEbgp.prefix_list_outbound,
            "prefix_list_inbound": xcloudEbgp.prefix_list_inbound,
            "multihop": xcloudEbgp.multihop,
            "weight": xcloudEbgp.weight,
            "community": xcloudEbgp.community,
            "term_switch_id": xcloudEbgp.term_switch_id,
            "allowas_in": xcloudEbgp.allowas_in,
            "rcircuit_id": xcloudEbgp.rcircuit_id,
            "switch_port_id": xcloudEbgp.switch_port_id
        }


        let options = {
            url: this.baseUrl(Constants.XcloudEbgpURL),
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
            xcloudEbgp.id = response.data.id;
            result = xcloudEbgp;
            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, response, EnumResultType.success));
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudCreateEbgpSuccess, response, ''));
        }).catch(function (err: any) {
            result = err;
            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, err, EnumResultType.fail));
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudCreateEbgpError, err, ''));
        })
        return new XcloudRetrieveSuccessResponse(result);
    };

    //add subet proxy in xcloud
    async addSubnetforxcloudAllocationAndAssignment(requestBody: any) {

        let subnetName = uuidv1();
        let xcloudSubnetObject = new XcloudSubnet()
        let xcloudSubnetResponse = await this.addSubnetforxcloud(requestBody, EnumXcloudSubnetType.allocation, subnetName, xcloudSubnetObject);
        if (Logger.hasErrorLogs())
            return xcloudSubnetResponse;
        else {
            let xcloudSubnetFinalResult = await this.addSubnetforxcloud(requestBody, EnumXcloudSubnetType.assignment, subnetName, xcloudSubnetObject.convertToXcloudSubnetObject(xcloudSubnetResponse));
            return xcloudSubnetObject.convertToXcloudSubnetObject(xcloudSubnetFinalResult);
        }
    }

    //add subet in xcloud
    async addSubnetforxcloud(requestBody: any, xcloudSubnetType: EnumXcloudSubnetType, subnetName: string, xcloudSubnetObject: XcloudSubnet) {

        if (await this.isAuthorized() == false)
            return;

        xcloudSubnetObject.name = subnetName;
        xcloudSubnetObject.cidr = requestBody.cidr;
        xcloudSubnetObject.selectedSite = requestBody.selectedSite;
        xcloudSubnetObject.selectedTenant = requestBody.selectedTenant;
        xcloudSubnetObject.selectedType = xcloudSubnetType;

        let body = {
            "name": xcloudSubnetObject.name,
            "cidr": xcloudSubnetObject.cidr,
            "selectedSite": xcloudSubnetObject.selectedSite,
            "selectedTenant": xcloudSubnetObject.selectedTenant,
            "selectedType": xcloudSubnetObject.selectedType,
            "ipVersion": xcloudSubnetObject.ipVersion
        }

        let options = {
            url: this.baseUrl(Constants.XcloudSubnetURL),
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
            //this function runs two time so depending upon the type assign the result id
            if (xcloudSubnetType == EnumXcloudSubnetType.allocation)
                xcloudSubnetObject.allocationId = response.data.id;
            else if (xcloudSubnetType == EnumXcloudSubnetType.assignment)
                xcloudSubnetObject.assignmentId = response.data.id;

            result = xcloudSubnetObject;
            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, response, EnumResultType.success));
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudCreateSubnetSuccess, response, ''));
        }).catch(function (err: any) {
            result = err;
            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, err, EnumResultType.fail));
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudCreateSubnetError, err, ''));
        })
        return result;
    };

}


export default new XcloudHttpRequests();