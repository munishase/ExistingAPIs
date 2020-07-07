/* eslint-disable @typescript-eslint/no-explicit-any */
import ActivePortHttpRequests from './ActivePortHttpRequests';
import XcloudHttpRequests from './XcloudHttpRequests';
import { ActivePortNTUandNTUPortCreationSuccessResponse } from '../class/Response/ActivePortNTUandNTUPortCreationSuccessResponse';


// this class is wrapper to call other services methods
class ServicesWrapper {

    //retreive all tenants from ActivePort
    async retrievetenantsforactiveport(requestBody: any, webResponse: any) {
        const activeportResponse = await ActivePortHttpRequests.retrieveAllTenants();
        webResponse.send(activeportResponse);
    }

    //insert new tenant in ActivePort
    async createnewtenantforactiveport(requestBody: any, webResponse: any) {
        const activeportResponse = await ActivePortHttpRequests.createTenantAccount(requestBody);
        webResponse.send(activeportResponse);
    }

    //insert new tenant in ActivePort
    async updateexistingtenantforactiveport(requestBody: any, webResponse: any) {
        const activeportResponse = await ActivePortHttpRequests.updateTenantAccount(requestBody);
        webResponse.send(activeportResponse);
    }

    //List all NTU from Activeport
    async retrieveallntu(requestBody: any, webResponse: any) {
        const activeportResponse = await ActivePortHttpRequests.retrieveAllNTUs();
        webResponse.send(activeportResponse);
    }

    //retrieve NTU by ntu id
    async retrieventubyid(requestBody: any, webResponse: any) {
        const ntuResponse = await ActivePortHttpRequests.retrieveNTUById(requestBody);
        webResponse.send(ntuResponse);
    }

    async createnewntuforactiveport(requestBody: any, webResponse: any) {
        const activeportResponse = await ActivePortHttpRequests.createNTU(requestBody);
        webResponse.send(activeportResponse);
    }

    async updatentuforactiveport(requestBody: any, webResponse: any) {
        const activeportResponse = await ActivePortHttpRequests.updateNTUById(requestBody);
        webResponse.send(activeportResponse);
    }

    //delete NTU by ntu id
    async deletentubyid(requestBody: any, webResponse: any) {
        const ntuResponse = await ActivePortHttpRequests.deleteNTUById(requestBody);
        webResponse.send(ntuResponse);
    }

    async createnewntuportforactiveport(requestBody: any, webResponse: any) {
        const activeportResponse = await ActivePortHttpRequests.createNTUPort(requestBody);
        webResponse.send(activeportResponse);
    }

    //get all circuits
    async getallcircuits(requestBody: any, webResponse: any) {
        const xcloudResponse = await XcloudHttpRequests.getallcircuits();
        webResponse.send(xcloudResponse);
    }

    //create/POST new circuits
    async addnewcircuitforxcloud(requestBody: any, webResponse: any) {
        const xcloudResponse = await XcloudHttpRequests.addnewcircuitforxcloud(requestBody);
        webResponse.send(xcloudResponse);
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
        const ntuResponse = await XcloudHttpRequests.retrieveswitchportbyid(requestBody);
        webResponse.send(ntuResponse);
    }

    //combine multiple services as below
    //fluid
    async createntuasync(requestBody: any, webResponse: any) {
        const results: any[] = [];

        //create netsuite
        const xcloudSwitchPort: any = await XcloudHttpRequests.retrieveswitchportbyid(requestBody);
        //Common.pushtoCollectionResult(results, xcloudSwitchPort);

        if (xcloudSwitchPort == undefined) {
            console.log(xcloudSwitchPort)
            return webResponse.status(400).send(xcloudSwitchPort);
        }
        else {

            //ADD NAME AND DESCRIPTION RETRIEVED FROM SWITCHPORT TO NTU 
            requestBody.name = xcloudSwitchPort.port_name;
            requestBody.description = xcloudSwitchPort.port_name;
            requestBody.label = xcloudSwitchPort.port_name;

            //create activeport ntu
            const activeportNtu: any = await ActivePortHttpRequests.createNTU(requestBody);
            activeportNtu.module = "ActivePort - NTU"
            // Common.pushtoCollectionResult(results, activeportNtu);

            if (activeportNtu.id > 0) //means ntu inserted successfully 
            {
                //assign newly created ntuid to ntu port
                requestBody.ntuId = activeportNtu.id;

                //create activeport ntu
                const activeportNtuPort: any = await ActivePortHttpRequests.createNTUPort(requestBody);

                //if any issue to create NTU port
                if (activeportNtuPort != undefined)
                    activeportNtuPort.module = "ActivePort - NTU Port"
                // Common.pushtoCollectionResult(results, activeportNtuPort);
            }

            const simplifyNTUandNTUPortrResponse = new ActivePortNTUandNTUPortCreationSuccessResponse(results);
            return webResponse.send(simplifyNTUandNTUPortrResponse);
        }
    }

    //fluid
    async createcircuitasync(requestBody: any, webResponse: any) {
        const xcloudSubnetCreationResponse = await XcloudHttpRequests.addSubnetforxcloudAllocationAndAssignment(requestBody);

        // Common.pushtoCollectionResult(results, xcloudSubnetCreationResponse);

        //create xcloud circuit
        const xcloudCircuitCreationResponse = await XcloudHttpRequests.addnewcircuitforxcloud(requestBody);
        // Common.pushtoCollectionResult(results, xcloudCircuitCreationResponse);

        //check if there is any error then it should return whole result, otherwise it should simplify the result.
        return webResponse.send({
            "xcloudSubnet": xcloudSubnetCreationResponse,
            "xcloudCircuit": xcloudCircuitCreationResponse
        });

    }
}


export default new ServicesWrapper();