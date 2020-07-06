import ActivePortHttpRequests from "../ActivePortHttpRequests";
import XcloudHttpRequests from "../XcloudHttpRequests";
import { XcloudEbgp } from "../../class/XcloudEbgp";
import { AWSService } from "../AWSService";
import { QueueService } from "../QueueService";
import { ActivePortServiceRequest } from "../../class/ActivePortServiceRequest";
import IPCIDR from "ip-cidr";
import { DirectConnect } from "aws-sdk";

declare class TempJob {
    initialRequest: any;
    activePortValidation: any;
    activePortCreation: any;
    awsConfirm: DirectConnect.ConfirmConnectionResponse;
    awsInterfaceCreation: DirectConnect.VirtualInterface;
}

export class AWSDirectConnectFlow {

    private awsService = new AWSService();
    private queueService = new QueueService();

    constructor() {
        this.queueService.clearRedis(this.queueService.fluidDXActivePortValidate);
        this.queueService.clearRedis(this.queueService.fluidDXActivePortCreate);
        this.queueService.clearRedis(this.queueService.fluidDXAWSConfirm);
        this.queueService.clearRedis(this.queueService.fluidDXAWSInterfaceCreate);
        this.queueService.clearRedis(this.queueService.fluidDXXCloudEBGP);

        // register queue processes
        this.queueService.fluidDXActivePortValidate.process(async (job) => {
            const jobData = (job.data || {}) as TempJob;
            try {
                console.log('entered queue 1');
                const result = await ActivePortHttpRequests.validateServiceRequest({ ...new ActivePortServiceRequest(), ...jobData.initialRequest });
                this.queueService.fluidDXActivePortCreate.add({ ...jobData, activePortValidation: result });
                console.log('exited queue 1');
            } catch (err) {
                console.error('failure queue 1', err);
            }
        });
        this.queueService.fluidDXActivePortCreate.process(async (job) => {
            const jobData = (job.data || {}) as TempJob;
            try {
                console.log('entered queue 2');
                const result = await ActivePortHttpRequests.createServiceByUUID(jobData.activePortValidation);
                this.queueService.fluidDXAWSConfirm.add({ ...jobData, activePortCreation: result });
                console.log('exited queue 2');
            } catch (err) {
                console.error('failure queue 2', err);
            }
        });
        this.queueService.fluidDXAWSConfirm.process(async (job) => {
            const jobData = (job.data || {}) as TempJob;
            try {
                console.log('entered queue 3');
                const result = await this.awsService.confirmDirectConnection(jobData.initialRequest.name);
                this.queueService.fluidDXAWSInterfaceCreate.add({ ...jobData, awsConfirm: result });
                console.log('exited queue 3');
            } catch (err) {
                if (err.message === 'DX Connection not found or is in wrong state.') {
                    this.queueService.fluidDXAWSConfirm.add(job.data, { delay: 30000 });
                    console.log('added again queue 3');
                } else {
                    console.error('failure queue 3', err);
                }
            }
        });
        this.queueService.fluidDXAWSInterfaceCreate.process(async (job) => {
            const jobData = (job.data || {}) as TempJob;
            try {
                console.log('entered queue 4');
                const result = await this.awsService.createVIF(jobData.initialRequest);
                this.queueService.fluidDXXCloudEBGP.add({ ...jobData, awsInterfaceCreation: result });
                console.log('exited queue 4');
            } catch (err) {
                if (err.message === "DX Connection not found or is in wrong state.") {
                    this.queueService.fluidDXAWSInterfaceCreate.add(jobData, { delay: 30000 });
                    console.log('added again queue 4');
                } else {
                    console.error('failure queue 4', err);
                }
            }
        });
        this.queueService.fluidDXXCloudEBGP.process(async (job) => {
            const jobData = (job.data || {}) as TempJob;
            try {
                console.log('entered queue 5');
                const amazonIp = (jobData.awsInterfaceCreation.amazonAddress || "").split("/");
                const internalIp = (jobData.awsInterfaceCreation.customerAddress || "").split("/");

                const xcloudEbgp = new XcloudEbgp();
                xcloudEbgp.name = jobData.initialRequest.name;
                xcloudEbgp.site_id = jobData.initialRequest.site_id;
                xcloudEbgp.nfv_port_id = jobData.initialRequest.nfv_port_id;
                xcloudEbgp.switch_port_id = 18660; // TODO hard-code or not
                xcloudEbgp.term_switch_id = 144; // TODO hard-code or not

                xcloudEbgp.neighbor_as = jobData.awsInterfaceCreation.amazonSideAsn || 0;
                xcloudEbgp.bgp_password = jobData.awsInterfaceCreation.authKey || "";
                xcloudEbgp.vlan = jobData.activePortCreation.vlanIdS;
                xcloudEbgp.remote_ip = amazonIp[0];
                xcloudEbgp.local_ip = internalIp[0];
                xcloudEbgp.prefix_length = parseInt(internalIp[1]);

                const xcloudCircuits = await XcloudHttpRequests.getallcircuits();
                const requestedCircuit = (xcloudCircuits.data || []).find((circuit) => circuit.id === jobData.initialRequest.circuit_id);

                if (requestedCircuit) {
                    const { gateways } = requestedCircuit;

                    for (const gw of (gateways || [])) {
                        const gw_string = `${gw.gateway}/${gw.gw_length}`;
                        const cidr = new IPCIDR(gw_string) as any;
                        xcloudEbgp.prefix_list_outbound += `permit ${cidr.addressStart.address}${cidr.addressStart.subnet} le 32\n`;
                    }

                    const xcloudEbgpCreationResponse = await XcloudHttpRequests.addEbgpforxcloud(xcloudEbgp);
                    console.log('exited queue 5');
                }

            } catch (err) {
                console.error('failure queue 5', err);
            }
        });
    }

    public async createFluidDX(requestBody: any) {
        try {
            this.queueService.fluidDXActivePortValidate.add({ initialRequest: requestBody });
            // const temp = { "initialRequest": { "circuit_id": 526, "name": "FLUIDev030720 2", "serviceConfigurationId": "72", "ntuId": "157", "description": "Testing at 1314", "type": "AWS", "remotePortUuid": "5aa726661a0b300012bc98a0", "accountId": "018232283193", "rateLimit": 100, "hostedType": "AWSHC", "awsType": "PRIVATE", "circuitType": "VLAN", "downLinkPort": "ge-0/0/16", "site_id": 1, "directConnectGatewayId": "76087ded-bffe-40a0-98a1-d915eb945303" }, "activePortValidation": { "createdBy": null, "createdDate": "2020-07-03T03:15:20.663Z", "lastModifiedBy": null, "lastModifiedDate": "2020-07-03T03:15:20.663Z", "tenantId": "86ac47a8-e8d9-47dd-820c-f4013b907d6e", "orgId": "90e6c471-055e-2aml-235t-ee2de18c8848", "orgName": null, "id": null, "type": "AWS", "name": "FLUIDev030720 2", "description": "Testing at 1314", "serviceKey": null, "rateLimit": 100, "price": "Monthly rate: $390.00 - Setup Price: $10.00 [AUD]", "uuid": "e266a31c-3ab3-4ea9-b42f-1a41bce32651", "productUid": null, "reTaggedVlanId": null, "provisioningStatus": "DESIGN", "vlanIdA": 1386, "vlanIdB": null, "vlanIdS": 3685, "ntuId": 157, "customerIp": null, "firewallPrice": null, "firewallStatus": "DISABLED", "state": "ACTIVE", "partnerType": "PCCW", "circuitType": "VLAN", "customerSubnet": null, "providerIp": null, "bgpAuthKey": "LsKLHFL47HD98nuROONn", "providerGwIp": null, "asn": null, "peerAsn": null, "vxcType": "PRIMARY", "partnerId": 42, "partnerName": "ASE-PCCW-SYDNEY", "ntuPortId": null, "ntuPortName": null, "serviceConfigurationName": null, "serviceConfigurationId": 72, "unitRandom": 12086, "accountId": "018232283193", "locationMetro": "ap-southeast-2", "awsType": "PRIVATE", "rateChange": false, "prvRateLimit": null, "companyUid": "5aa7209defe3bc00124d075f", "companyName": null, "title": "ap-southeast-2", "locationId": null, "speed": null, "rank": null, "bandwidth": null, "locationName": "Sydney (ap-southeast-2) - Equinix SY1", "mac": null, "jobUid": "e266a31c-3ab3-4ea9-b42f-1a41bce32651", "callbackUrl": "", "hostedType": "AWSHC", "downLinkPort": "ge-0/0/16", "initiator": null, "assignee": null, "partnerUid": null, "portId": null, "allowRateChange": null, "bendProductUid": "5aa726661a0b300012bc98a0", "serviceRequest": { "ntuPort": null, "megaportUid": null, "productName": null, "vlanId": 0, "validated": true, "partnerUid": null, "serviceKey": null, "vlanIdB": 0, "returnError": false, "targets": [], "rate": 0, "newPrice": null, "action": null, "validationUid": "e266a31c-3ab3-4ea9-b42f-1a41bce32651", "vlan": null, "isServiceKey": false, "request": null, "partnerId": null, "metroRegion": null, "remotePort": { "locationId": null, "uid": "5aa726661a0b300012bc98a0", "metroId": "a5b8a5791a43059a05d9052d", "companyId": "5aa7209defe3bc00124d075f", "companyName": null, "dataCenterFacilityId": "5a98b176339bad0012edd0a2", "asnId": null, "zone": null, "vlanId": null, "regionName": null, "type": "DCP", "partnerPort": null, "market": "PRIMARY", "country": "ap-southeast-2", "networkRegion": null, "address": null, "campus": null, "metro": "ap-southeast-2", "name": "Sydney (ap-southeast-2) - Equinix SY1", "id": null, "providerType": "PCCW", "partner": { "regionNames": ["ap-southeast-2"], "connectionSpeeds": [{ "type": "AUTOMATIC", "value": 50 }, { "type": "AUTOMATIC", "value": 100 }, { "type": "AUTOMATIC", "value": 200 }, { "type": "AUTOMATIC", "value": 300 }, { "type": "AUTOMATIC", "value": 400 }, { "type": "AUTOMATIC", "value": 500 }], "type": "AWS", "partnerPort": "dxcon-fg1rx6k9" }, "serviceCodeId": 2, "portId": null, "bandwidths": null, "connectType": "AWSHC", "productUid": null, "companyUid": null, "title": "ap-southeast-2", "speed": 10000, "vxcPermitted": null, "rank": null, "vxc": null, "description": null, "portSpeed": null, "state": null, "data": null }, "serviceConfiguarion": null, "addToProvider": true } }, "activePortCreation": { "createdBy": "dan_ward", "createdDate": "2020-07-03T03:15:41.041Z", "lastModifiedBy": "dan_ward", "lastModifiedDate": "2020-07-03T03:15:41.041Z", "tenantId": "86ac47a8-e8d9-47dd-820c-f4013b907d6e", "orgId": "90e6c471-055e-2aml-235t-ee2de18c8848", "orgName": null, "id": 422, "type": "AWS", "name": "FLUIDev030720 2", "description": "Testing at 1314", "serviceKey": null, "rateLimit": 100, "price": "Monthly rate: $390.00 - Setup Price: $10.00 [AUD]", "uuid": "e266a31c-3ab3-4ea9-b42f-1a41bce32651", "productUid": "5efea2ddff1f6b001476777f", "reTaggedVlanId": null, "provisioningStatus": "CONFIGURED", "vlanIdA": 1386, "vlanIdB": null, "vlanIdS": 3685, "ntuId": 157, "customerIp": null, "firewallPrice": null, "firewallStatus": "DISABLED", "state": "ACTIVE", "partnerType": "PCCW", "circuitType": "VLAN", "customerSubnet": null, "providerIp": null, "bgpAuthKey": "LsKLHFL47HD98nuROONn", "providerGwIp": null, "asn": null, "peerAsn": null, "vxcType": "PRIMARY", "partnerId": 42, "partnerName": null, "ntuPortId": null, "ntuPortName": null, "serviceConfigurationName": null, "serviceConfigurationId": 72, "unitRandom": 12086, "accountId": "018232283193", "locationMetro": "ap-southeast-2", "awsType": "PRIVATE", "rateChange": false, "prvRateLimit": null, "companyUid": "5aa7209defe3bc00124d075f", "companyName": null, "title": "ap-southeast-2", "locationId": null, "speed": null, "rank": null, "bandwidth": null, "locationName": "Sydney (ap-southeast-2) - Equinix SY1", "mac": null, "jobUid": null, "callbackUrl": null, "hostedType": "AWSHC", "downLinkPort": "ge-0/0/16", "initiator": null, "assignee": null, "partnerUid": null, "portId": null, "allowRateChange": null, "bendProductUid": "5aa726661a0b300012bc98a0", "serviceRequest": { "ntuPort": null, "megaportUid": null, "productName": null, "vlanId": 0, "validated": true, "partnerUid": null, "serviceKey": null, "vlanIdB": 0, "returnError": false, "targets": [], "rate": 0, "newPrice": null, "action": null, "validationUid": "e266a31c-3ab3-4ea9-b42f-1a41bce32651", "vlan": null, "isServiceKey": false, "request": null, "partnerId": null, "metroRegion": null, "remotePort": { "locationId": null, "uid": "5aa726661a0b300012bc98a0", "metroId": "a5b8a5791a43059a05d9052d", "companyId": "5aa7209defe3bc00124d075f", "companyName": null, "dataCenterFacilityId": "5a98b176339bad0012edd0a2", "asnId": null, "zone": null, "vlanId": null, "regionName": null, "type": "DCP", "partnerPort": null, "market": "PRIMARY", "country": "ap-southeast-2", "networkRegion": null, "address": null, "campus": null, "metro": "ap-southeast-2", "name": "Sydney (ap-southeast-2) - Equinix SY1", "id": null, "providerType": "PCCW", "partner": { "regionNames": ["ap-southeast-2"], "connectionSpeeds": [{ "type": "AUTOMATIC", "value": 50 }, { "type": "AUTOMATIC", "value": 100 }, { "type": "AUTOMATIC", "value": 200 }, { "type": "AUTOMATIC", "value": 300 }, { "type": "AUTOMATIC", "value": 400 }, { "type": "AUTOMATIC", "value": 500 }], "type": "AWS", "partnerPort": "dxcon-fg1rx6k9" }, "serviceCodeId": 2, "portId": null, "bandwidths": null, "connectType": "AWSHC", "productUid": null, "companyUid": null, "title": "ap-southeast-2", "speed": 10000, "vxcPermitted": null, "rank": null, "vxc": null, "description": null, "portSpeed": null, "state": null, "data": null }, "serviceConfiguarion": null, "addToProvider": true } }, "awsConfirm": { "connectionState": "pending" }, "awsInterfaceCreation": { "ownerAccount": "018232283193", "virtualInterfaceId": "dxvif-fgfyvns9", "location": "EqSY3", "connectionId": "dxcon-fglf64je", "virtualInterfaceType": "private", "virtualInterfaceName": "FLUIDev030720 2 - VIF", "vlan": 2805, "asn": 64800, "amazonSideAsn": 64999, "authKey": "0xxacZ9nrPsSHBIc0UT3aQ7n", "amazonAddress": "169.254.247.1/30", "customerAddress": "169.254.247.2/30", "addressFamily": "ipv4", "virtualInterfaceState": "pending", "customerRouterConfig": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<logical_connection id=\"dxvif-fgfyvns9\">\n  <vlan>2805</vlan>\n  <customer_address>169.254.247.2/30</customer_address>\n  <amazon_address>169.254.247.1/30</amazon_address>\n  <bgp_asn>64800</bgp_asn>\n  <bgp_auth_key>0xxacZ9nrPsSHBIc0UT3aQ7n</bgp_auth_key>\n  <amazon_bgp_asn>64999</amazon_bgp_asn>\n  <connection_type>private</connection_type>\n</logical_connection>\n", "mtu": 1500, "jumboFrameCapable": false, "virtualGatewayId": "", "directConnectGatewayId": "76087ded-bffe-40a0-98a1-d915eb945303", "routeFilterPrefixes": [], "bgpPeers": [{ "bgpPeerId": "dxpeer-fgfnx1l0", "asn": 64800, "authKey": "0xxacZ9nrPsSHBIc0UT3aQ7n", "addressFamily": "ipv4", "amazonAddress": "169.254.247.1/30", "customerAddress": "169.254.247.2/30", "bgpPeerState": "pending", "bgpStatus": "down", "awsDeviceV2": "EqSY3-rn10cxbywrb9" }], "region": "ap-southeast-2", "awsDeviceV2": "EqSY3-rn10cxbywrb9", "tags": [] } };
            // this.queueService.fluidDXXCloudEBGP.add(temp);
        } catch (err) {
            console.error(err);
        }
    }
}