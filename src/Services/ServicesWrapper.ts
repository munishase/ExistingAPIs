/* eslint-disable @typescript-eslint/no-explicit-any */
import StorageGridHttpRequests from './StorageGridHttpRequests';
import VeeamHttpRequests from './VeeamHttpRequests';
import NetsuiteHttpRequests from './NetsuiteHttpRequests';
import StitchdataHttpRequests from './StitchdataHttpRequests';
import { Logger } from '../class/Logger'
import Common from '../class/Common';
import { EnumPartOf } from '../Enum/EnumPartOf'
import ActivePortHttpRequests from './ActivePortHttpRequests';
import NetAppHttpRequests from './NetAppHttpRequests';
import DataikuHttpRequests from './DataikuHttpRequests';
import XcloudHttpRequests from './XcloudHttpRequests';
import { ActivePortNTUandNTUPortCreationSuccessResponse } from '../class/Response/ActivePortNTUandNTUPortCreationSuccessResponse';
import { NetsuiteSuccessResponse } from '../class/Response/NetsuiteSuccessResponse';


// this class is wrapper to call other services methods
class ServicesWrapper {

    //combine multiple services as below
    //Storagegrid, Netsuite
    async processrequestAsync(requestBody: any, webResponse: any) {
        Logger.cleanLogs();

        const results: any[] = [];

        //create netsuite
        const netsuite = await NetsuiteHttpRequests.createnetsuiteclientAsync(requestBody) as NetsuiteSuccessResponse;
        Common.pushtoCollectionResult(results, netsuite);

        //create storagegrid
        const storageGrid = await StorageGridHttpRequests.processStorageGridWithNetsuite(netsuite, requestBody);
        Common.pushtoCollectionResult(results, storageGrid);

        //if no error update netsuite with storagegrid
        await NetsuiteHttpRequests.updatenetsuiteclientAsync(storageGrid)

        //create veeam with storagegrid imput like entity id
        const veeam = await VeeamHttpRequests.createVeeamWithStoragegridAsync(netsuite, requestBody);
        Common.pushtoCollectionResult(results, veeam);

        return Common.beautifyResult(results, webResponse, EnumPartOf.Group);
    }

    //call storageGrid processStorageGrid
    async createStorageGridTanent(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const storagegridResponse = await StorageGridHttpRequests.processStorageGrid(requestBody)
        return Common.beautifyResult(storagegridResponse, webResponse, EnumPartOf.Individual);
    }

    //call Netsuite createnetsuiteclientAsync
    async createVeeam(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const veeamResponse = await VeeamHttpRequests.createVeeam(requestBody);
        return Common.beautifyResult(veeamResponse, webResponse, EnumPartOf.Individual);
    }

    //call Netsuite createnetsuiteclientAsync
    async createNetsuiteClient(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const netsuiteResponse = await NetsuiteHttpRequests.createnetsuiteclientAsync(requestBody);
        return Common.beautifyResult(netsuiteResponse, webResponse, EnumPartOf.Individual);
    }

    //generate token for existing account in Stitchdata 
    async generateTokenForExistingStitchdataAccount(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const stitchdataResponse = await StitchdataHttpRequests.generateTokenForExistingStitchdataAccount(requestBody);
        return Common.beautifyResult(stitchdataResponse, webResponse, EnumPartOf.Individual);
    }


    //register new account in Stitchdata
    async registerAccountForStitchdata(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const stitchdataResponse = await StitchdataHttpRequests.registerAccountForStitchdata(requestBody);
        return Common.beautifyResult(stitchdataResponse, webResponse, EnumPartOf.Individual);
    }


    //retreive all sources in Stitchdata
    async retrievesourcesfromstitchdata(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const stitchdataResponse = await StitchdataHttpRequests.retrievesourcesfromstitchdata(requestBody);
        return Common.beautifyResult(stitchdataResponse, webResponse, EnumPartOf.Individual);
    }


    //retreive all destination in Stitchdata
    async retrievedestinationfromstitchdata(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const stitchdataResponse = await StitchdataHttpRequests.retrievedestinationfromstitchdata(requestBody);
        return Common.beautifyResult(stitchdataResponse, webResponse, EnumPartOf.Individual);
    }


    //retreive all tenants from ActivePort
    async retrievetenantsforactiveport(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const activeportResponse = await ActivePortHttpRequests.retrieveAllTenants();
        return Common.beautifyResult(activeportResponse, webResponse, EnumPartOf.Individual);
    }

    //insert new tenant in ActivePort
    async createnewtenantforactiveport(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const avtiveportResponse = await ActivePortHttpRequests.createTenantAccount(requestBody);
        return Common.beautifyResult(avtiveportResponse, webResponse, EnumPartOf.Individual);
    }

    //insert new tenant in ActivePort
    async updateexistingtenantforactiveport(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const activeportResponse = await ActivePortHttpRequests.updateTenantAccount(requestBody);
        return Common.beautifyResult(activeportResponse, webResponse, EnumPartOf.Individual);
    }

    //List all NTU from Activeport
    async retrieveallntu(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const activeportResponse = await ActivePortHttpRequests.retrieveAllNTUs();
        return Common.beautifyResult(activeportResponse, webResponse, EnumPartOf.Individual);
    }

    //retrieve NTU by ntu id
    async retrieventubyid(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const ntuResponse = await ActivePortHttpRequests.retrieveNTUById(requestBody);
        return Common.beautifyResult(ntuResponse, webResponse, EnumPartOf.Individual);
    }

    async createnewntuforactiveport(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const avtiveportResponse = await ActivePortHttpRequests.createNTU(requestBody);
        return Common.beautifyResult(avtiveportResponse, webResponse, EnumPartOf.Individual);
    }

    async updatentuforactiveport(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const avtiveportResponse = await ActivePortHttpRequests.updateNTUById(requestBody);
        return Common.beautifyResult(avtiveportResponse, webResponse, EnumPartOf.Individual);
    }

    //delete NTU by ntu id
    async deletentubyid(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const ntuResponse = await ActivePortHttpRequests.deleteNTUById(requestBody);
        return Common.beautifyResult(ntuResponse, webResponse, EnumPartOf.Individual);
    }

    async createnewntuportforactiveport(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const avtiveportResponse = await ActivePortHttpRequests.createNTUPort(requestBody);
        return Common.beautifyResult(avtiveportResponse, webResponse, EnumPartOf.Individual);
    }

    //get all circuits
    async getallcircuits(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const xcloudResponse = await XcloudHttpRequests.getallcircuits();
        return Common.beautifyResult(xcloudResponse, webResponse, EnumPartOf.Individual);
    }

    //create/POST new circuits
    async addnewcircuitforxcloud(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const xcloudResponse = await XcloudHttpRequests.addnewcircuitforxcloud(requestBody);
        return Common.beautifyResult(xcloudResponse, webResponse, EnumPartOf.Individual);
    }

    // //update/PUT new circuits
    // async updateexistingcircuitforxcloud(requestBody: any, webResponse: any) {
    //     Logger.cleanLogs();
    //     const xcloudResponse = await XcloudHttpRequests.updateexistingcircuitforxcloud(requestBody);
    //     return Common.beautifyResult(xcloudResponse, webResponse, EnumPartOf.Individual);
    // }

    // //update/PUT new circuits
    // async validateexistingcircuitforxcloud(requestBody: any, webResponse: any) {
    //     Logger.cleanLogs();
    //     const xcloudResponse = await XcloudHttpRequests.validateexistingcircuitforxcloud(requestBody);
    //     return Common.beautifyResult(xcloudResponse, webResponse, EnumPartOf.Individual);
    // }


    // //delete existing circuits
    // async deletecircuitforxcloud(requestBody: any, webResponse: any) {
    //     Logger.cleanLogs();
    //     const xcloudResponse = await XcloudHttpRequests.deletecircuitforxcloud(requestBody);
    //     return Common.beautifyResult(xcloudResponse, webResponse, EnumPartOf.Individual);
    // }

    //retrieve NTU by ntu id
    async retrieveswitchportbyid(requestBody: any, webResponse: any) {

        Logger.cleanLogs();
        const ntuResponse = await XcloudHttpRequests.retrieveswitchportbyid(requestBody);
        return Common.beautifyResult(ntuResponse, webResponse, EnumPartOf.Individual);
    }



    //retrieve new existing Clusters in NetApp
    async retrieveclustersfromnetapp(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const netappResponse = await NetAppHttpRequests.retrieveClustersFromNetapp();
        return Common.beautifyResult(netappResponse, webResponse, EnumPartOf.Individual);
    }

    //insert new cluster in NetApp Kubernetes
    async createnkscluster(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const netappResponse = await NetAppHttpRequests.createNKSCluster(requestBody);
        return Common.beautifyResult(netappResponse, webResponse, EnumPartOf.Individual);
    }

    //insert new cluster in NetApp Kubernetes
    async deletenkscluster(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const netappResponse = await NetAppHttpRequests.deleteNKSCluster(requestBody);
        return Common.beautifyResult(netappResponse, webResponse, EnumPartOf.Individual);
    }

    //List dataiku list of datasets
    async listdataikudatasets(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const dataikuResponse = await DataikuHttpRequests.listDataSetsFromDataiku(requestBody);
        return Common.beautifyResult(dataikuResponse, webResponse, EnumPartOf.Individual);
    }

    //insert new dataset in dataiku
    async createdatasetfordataiku(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const dataikuResponse = await DataikuHttpRequests.createDatasetForDataiku(requestBody);
        return Common.beautifyResult(dataikuResponse, webResponse, EnumPartOf.Individual);
    }

    //insert new managed dataset in dataiku
    async createmanageddatasetfordataiku(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const dataikuResponse = await DataikuHttpRequests.createManagedDatasetForDataiku(requestBody);
        return Common.beautifyResult(dataikuResponse, webResponse, EnumPartOf.Individual);
    }

    //combine multiple services as below
    //fluid
    async createntuasync(requestBody: any, webResponse: any) {
        Logger.cleanLogs();

        const results: any[] = [];

        //create netsuite
        const xcloudSwitchPort: any = await XcloudHttpRequests.retrieveswitchportbyid(requestBody);
        //Common.pushtoCollectionResult(results, xcloudSwitchPort);

        if (xcloudSwitchPort == undefined) {
            console.log(xcloudSwitchPort)
            return Common.beautifyResult(xcloudSwitchPort, webResponse, EnumPartOf.Individual);
        }
        else {

            //ADD NAME AND DESCRIPTION RETRIEVED FROM SWITCHPORT TO NTU 
            requestBody.name = xcloudSwitchPort.port_name;
            requestBody.description = xcloudSwitchPort.port_name;
            requestBody.label = xcloudSwitchPort.port_name;

            //create activeport ntu
            const activeportNtu: any = await ActivePortHttpRequests.createNTU(requestBody);
            activeportNtu.module = "ActivePort - NTU"
            Common.pushtoCollectionResult(results, activeportNtu);

            if (activeportNtu.id > 0) //means ntu inserted successfully 
            {
                //assign newly created ntuid to ntu port
                requestBody.ntuId = activeportNtu.id;

                //create activeport ntu
                const activeportNtuPort: any = await ActivePortHttpRequests.createNTUPort(requestBody);

                //if any issue to create NTU port
                if (activeportNtuPort != undefined)
                    activeportNtuPort.module = "ActivePort - NTU Port"
                Common.pushtoCollectionResult(results, activeportNtuPort);
            }

            //check if there is any error then it should return whole result, otherwise it should simplify the result.
            if (Logger.hasErrorLogs() == false) {
                const simplifyNTUandNTUPortrResponse = new ActivePortNTUandNTUPortCreationSuccessResponse(results);
                return Common.beautifyResult(simplifyNTUandNTUPortrResponse, webResponse, EnumPartOf.Group);
            }
            else {
                //in case of error want to observe whole response
                return Common.beautifyResult(results, webResponse, EnumPartOf.Group);
            }
        }
    }

    //fluid
    async createawscircuitasync(requestBody: any, webResponse: any) {

        Logger.cleanLogs();
        const results: any[] = [];
        let activeportCreateServiceByUUID;
        let xcloudEbgpCreationResponse

        //validate service activeport
        const activeportResponse = await ActivePortHttpRequests.validateServiceRequest(requestBody);

        //create service activeport
        if (activeportResponse != undefined) {
            Common.pushtoCollectionResult(results, activeportResponse);
            activeportCreateServiceByUUID = await ActivePortHttpRequests.createServiceByUUID(activeportResponse);
            Common.pushtoCollectionResult(results, activeportCreateServiceByUUID);

            //create xcloud ebgp
            if (activeportCreateServiceByUUID != undefined) {
                xcloudEbgpCreationResponse = await XcloudHttpRequests.addEbgpforxcloud(requestBody, activeportCreateServiceByUUID);
                Common.pushtoCollectionResult(results, xcloudEbgpCreationResponse);
            }

        }

        if (Logger.hasErrorLogs() == true)
            return Common.beautifyResult(results, webResponse, EnumPartOf.Group);
        else {

            return Common.beautifyResult({
                "ActivePortValidateServiceResponse": activeportResponse,
                "ActivePortCreateServiceByUUIDResponse": activeportCreateServiceByUUID,
                "XcloudEbgpResponse": xcloudEbgpCreationResponse
            }, webResponse, EnumPartOf.Group);
        }
    }

    //fluid
    async createcircuitasync(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        const results: any[] = [];

        const xcloudSubnetCreationResponse = await XcloudHttpRequests.addSubnetforxcloudAllocationAndAssignment(requestBody);
        let xcloudCircuitCreationResponse;

        if (Logger.hasErrorLogs()) {
            //error while creating subnet
            return Common.beautifyResult(xcloudSubnetCreationResponse, webResponse, EnumPartOf.Individual);
        } 
        else {
            Common.pushtoCollectionResult(results, xcloudSubnetCreationResponse);

            //create xcloud circuit
            xcloudCircuitCreationResponse = await XcloudHttpRequests.addnewcircuitforxcloud(requestBody);
            Common.pushtoCollectionResult(results, xcloudCircuitCreationResponse);
        }

        //check if there is any error then it should return whole result, otherwise it should simplify the result.
        if (Logger.hasErrorLogs() == false) {
            const result = {
                "xcloudSubnet": xcloudSubnetCreationResponse,
                "xcloudCircuit": xcloudCircuitCreationResponse
            };
            return Common.beautifyResult(result, webResponse, EnumPartOf.Group);
        }
        else {
            //in case of error want to observe whole response
            return Common.beautifyResult(results, webResponse, EnumPartOf.Group);
        }

    }
}


export default new ServicesWrapper();