import httppromise, { Options, Response } from 'got';
import sessionstorage from 'sessionstorage';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { XcloudBaseLayer } from './XcloudBaseLayer';
import { EnumToken } from '../Enum/EnumToken';
import { XcloudCircuit } from '../class/XcloudCircuit';
import Common from '../class/Common'
import { XcloudRetrieveSuccessResponse } from '../class/Response/XcloudRetrieveSuccessResponse';
import { XcloudSwitchPort } from '../class/Response/XcloudSwitchPort';
import { XcloudEbgp } from '../class/XcloudEbgp';
import DbCrudOperations from './DbCrudOperations';
import { XcloudSubnet } from '../class/XcloudSubnet';
import { EnumResultType } from '../Enum/EnumResultType';
import { EnumXcloudSubnetType } from '../Enum/EnumXcloudSubnetType';
import { v1 as uuidv1 } from 'uuid';

export class XcloudHttpRequests extends XcloudBaseLayer {

    constructor() {
        super();
    }

    //Here we are retriving all xcloud circuit
    //prerequisite: Xcloud cookie in Header
    async getallcircuits(): Promise<XCloudCircuitResponse> {
        const token = (await this.authorizeXcloudGrid()).connect_sid;

        const options: Options = {
            url: this.baseUrl(Constants.XcloudCircuitURL),
            method: 'GET',
            headers: {
                'Cookie': sessionstorage.getItem(EnumToken.XcloudCookie),
            },
            responseType: 'json'
        };

        const response: XCloudCircuitResponse = (await httppromise(options) as any).body;
        return response;
    }

    //Here we add new circuit in xcloud
    async addnewcircuitforxcloud(requestBody: any): Promise<XcloudRetrieveSuccessResponse | undefined> {
        const isAuthorized = await this.isAuthorized();
        if (!isAuthorized)
            return;

        const xcloudCircuit = new XcloudCircuit();
        xcloudCircuit.name = requestBody.virtualNetworkName;
        xcloudCircuit.owner = requestBody.owner;
        xcloudCircuit.tenants = requestBody.tenants;
        xcloudCircuit.sites = requestBody.sites;
        xcloudCircuit.gateways = requestBody.gateways;

        const body = {
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


        const options: Options = {
            url: this.baseUrl(Constants.XcloudCircuitURL),
            method: 'POST',
            headers: {
                'Cookie': sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            json: body,
            responseType: 'json'
        };

        try {
            const response: XCloudCreateCircuitResponse = (await httppromise(options) as any).body;
            xcloudCircuit.id = response.data.circuitID;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudCreateCircuitSuccess, response, ''));
        } catch (err) {
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudCreateCircuitError, err, ''));
        }

        return new XcloudRetrieveSuccessResponse(xcloudCircuit);
    }

    /*
    
        //Here  update existing circuit in xcloud
        async updateexistingcircuitforxcloud(requestBody: any) {
            const isAuthorized = await this.isAuthorized();
            if (!isAuthorized)
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
            const isAuthorized = await this.isAuthorized();
            if (!isAuthorized)
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
            xcloud.members = requestB;
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
            const isAuthorized = await this.isAuthorized();
            if (!isAuthorized)
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
    async retrieveswitchportbyid(params: any): Promise<XcloudSwitchPort | undefined> {
        const isAuthorized = await this.isAuthorized();
        if (!isAuthorized)
            return;

        const options: Options = {
            url: this.baseUrl(Constants.XcloudSwitchPortURL),
            method: 'GET',
            headers: {
                Cookie: sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            responseType: 'json'
        };

        try {
            const { body: response }: any = await httppromise(options) as Response;
            const switchPort = ((response || {}).data || []).find((switchport: any) => switchport.id == params.switchportid);

            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, response, EnumResultType.success));
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.fluid, Constants.XcloudGetSwitchPortSuccess, response, ''));

            //if there is no switchport with the id then
            if (!switchPort) {
                Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.fluid, Constants.XcloudGetSwitchPortError, Constants.XcloudNoSwitchPortError, ''));
                return;
            } else {
                return new XcloudSwitchPort(switchPort);
            }

        } catch (err) {
            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, err, EnumResultType.fail));
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.fluid, Constants.XcloudGetSwitchPortError, err, ''));
        }

    }

    //add ebgp in xcloud
    async addEbgpforxcloud(request: XcloudEbgp) {
        const token = (await this.authorizeXcloudGrid()).connect_sid;

        const options: Options = {
            url: this.baseUrl(Constants.XcloudEbgpURL),
            method: 'POST',
            headers: {
                'Cookie': token
            },
            json: request,
            responseType: 'json'
        };

        const response: XCloudCreateEbgpResponse = (await httppromise(options) as any).body;
        return response;
    }

    async removeEbgp(request: XcloudEbgp) {
        const token = (await this.authorizeXcloudGrid()).connect_sid;

        const options: Options = {
            url: this.baseUrl(Constants.XcloudEbgpURL),
            method: 'DELETE',
            headers: {
                'Cookie': token
            },
            json: request,
            responseType: 'json'
        };

        const response: XCloudCreateEbgpResponse = (await httppromise(options) as any).body;
        return response;
    }

    //add subet proxy in xcloud
    async addSubnetforxcloudAllocationAndAssignment(requestBody: any) {

        const subnetName = uuidv1();
        const xcloudSubnetObject = new XcloudSubnet()
        const xcloudSubnetResponse = await this.addSubnetforxcloud(requestBody, EnumXcloudSubnetType.allocation, subnetName, xcloudSubnetObject) as unknown as XcloudSubnet;
        if (!Logger.hasErrorLogs() && !!xcloudSubnetResponse) {
            const xcloudSubnetFinalResult = await this.addSubnetforxcloud(requestBody, EnumXcloudSubnetType.assignment, subnetName, xcloudSubnetObject.convertToXcloudSubnetObject(xcloudSubnetResponse)) as unknown as XcloudSubnet;
            if (xcloudSubnetFinalResult) {
                return xcloudSubnetObject.convertToXcloudSubnetObject(xcloudSubnetFinalResult);
            }
        }
        return xcloudSubnetResponse;
    }

    //add subet in xcloud
    async addSubnetforxcloud(requestBody: any, xcloudSubnetType: EnumXcloudSubnetType, subnetName: string, xcloudSubnetObject: XcloudSubnet): Promise<XCloudCreateSubnetResponse | undefined> {
        const isAuthorized = await this.isAuthorized();
        if (!isAuthorized)
            return;

        xcloudSubnetObject.name = subnetName;
        xcloudSubnetObject.cidr = requestBody.cidr;
        xcloudSubnetObject.selectedSite = requestBody.selectedSite;
        xcloudSubnetObject.selectedTenant = requestBody.selectedTenant;
        xcloudSubnetObject.selectedType = xcloudSubnetType;

        const body = {
            "name": xcloudSubnetObject.name,
            "cidr": xcloudSubnetObject.cidr,
            "selectedSite": xcloudSubnetObject.selectedSite,
            "selectedTenant": xcloudSubnetObject.selectedTenant,
            "selectedType": xcloudSubnetObject.selectedType,
            "ipVersion": xcloudSubnetObject.ipVersion
        };

        const options: Options = {
            url: this.baseUrl(Constants.XcloudSubnetURL),
            method: 'POST',
            headers: {
                'Cookie': sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            json: body,
            responseType: 'json'
        };

        try {
            const response: XCloudCreateSubnetResponse = (await httppromise(options) as any).body;
            //this function runs two time so depending upon the type assign the result id
            if (xcloudSubnetType == EnumXcloudSubnetType.allocation) {
                xcloudSubnetObject.allocationId = response.data.id;
            } else if (xcloudSubnetType == EnumXcloudSubnetType.assignment) {
                xcloudSubnetObject.assignmentId = response.data.id;
            }

            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, response, EnumResultType.success));
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Xcloud, Constants.XcloudCreateSubnetSuccess, response, ''));
            return response;
        } catch (err) {
            DbCrudOperations.saveRecord(Common.createFluidDbObject(options, err, EnumResultType.fail));
            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Xcloud, Constants.XcloudCreateSubnetError, err, ''));
            return err;
        }

    }

}


export default new XcloudHttpRequests();