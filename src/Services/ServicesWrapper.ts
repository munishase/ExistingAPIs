import StorageGridHttpRequests from './StorageGridHttpRequests';
import VeeamHttpRequests from './VeeamHttpRequests';
import NetsuiteHttpRequests from './NetSuiteHttpRequests';
import StitchdataHttpRequests from './StitchdataHttpRequests';
import { Logger } from '../class/Logger'
import Common from '../class/Common';
import { EnumPartOf } from '../Enum/EnumPartOf'
import { StorageGridSuccessResponse } from '../class/StorageGridSuccessResponse';
import { StorageGrid } from '../class/StorageGrid';

// this class is wrapper to call other services methods
class ServicesWrapper {

    //combine multiple services as below
    //Storagegrid, Netsuite
    async processrequestAsync(requestBody: any, webResponse: any) {
        Logger.cleanLogs();

        let results: any[] = [];

        //create netsuite
        let netsuite = await NetsuiteHttpRequests.createnetsuiteclientAsync(requestBody, webResponse);
        Common.pushtoCollectionResult(results, netsuite);

        //create storagegrid
        let storageGrid = await StorageGridHttpRequests.processStorageGridWithNetsuite(netsuite, requestBody, webResponse);
        Common.pushtoCollectionResult(results, storageGrid);

        //if no error update netsuite with storagegrid
        await NetsuiteHttpRequests.updatenetsuiteclientAsync(storageGrid, requestBody, webResponse)

        //create veeam with storagegrid imput like entity id
        let veeam = await VeeamHttpRequests.createVeeamWithStoragegridAsync(netsuite, requestBody, webResponse);
        Common.pushtoCollectionResult(results, veeam);

        return Common.beautifyResult(results, webResponse, EnumPartOf.Group);
    }

    //call storageGrid processStorageGrid
    async createStorageGridTanent(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let storagegridResponse = await StorageGridHttpRequests.processStorageGrid(requestBody, webResponse)
        return Common.beautifyResult(storagegridResponse, webResponse, EnumPartOf.Individual);
    }

    //call Netsuite createnetsuiteclientAsync
    async createVeeam(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let veeamResponse = await VeeamHttpRequests.createVeeam(requestBody, webResponse);
        return Common.beautifyResult(veeamResponse, webResponse, EnumPartOf.Individual);
    }

    //call Netsuite createnetsuiteclientAsync
    async createNetsuiteClient(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let netsuiteResponse = await NetsuiteHttpRequests.createnetsuiteclientAsync(requestBody, webResponse);
        return Common.beautifyResult(netsuiteResponse, webResponse, EnumPartOf.Individual);
    }

    //call Netsuite createnetsuiteclientAsync
    async checkStitchLogin(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let stitchdataResponse = await StitchdataHttpRequests.stitchdataToken(requestBody);
        return Common.beautifyResult(stitchdataResponse, webResponse, EnumPartOf.Individual);
    }
}

export default new ServicesWrapper();