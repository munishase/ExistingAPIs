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

    //generate token for existing account in Stitchdata 
    async generateTokenForExistingStitchdataAccount(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let stitchdataResponse = await StitchdataHttpRequests.generateTokenForExistingStitchdataAccount(requestBody);
        return Common.beautifyResult(stitchdataResponse, webResponse, EnumPartOf.Individual);
    }


    //register new account in Stitchdata
    async registerAccountForStitchdata(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let stitchdataResponse = await StitchdataHttpRequests.registerAccountForStitchdata(requestBody);
        return Common.beautifyResult(stitchdataResponse, webResponse, EnumPartOf.Individual);
    }


    //retreive all sources in Stitchdata
    async retrievesourcesfromstitchdata(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let stitchdataResponse = await StitchdataHttpRequests.retrievesourcesfromstitchdata(requestBody);
        return Common.beautifyResult(stitchdataResponse, webResponse, EnumPartOf.Individual);
    }


    //retreive all destination in Stitchdata
    async retrievedestinationfromstitchdata(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let stitchdataResponse = await StitchdataHttpRequests.retrievedestinationfromstitchdata(requestBody);
        return Common.beautifyResult(stitchdataResponse, webResponse, EnumPartOf.Individual);
    }


    //retreive all tenants from ActivePort
    async retrievetenantsforactiveport(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let activeportResponse = await ActivePortHttpRequests.retrieveAllTenants(requestBody);
        return Common.beautifyResult(activeportResponse, webResponse, EnumPartOf.Individual);
    }

    //insert new tenant in ActivePort
    async createnewtenantforactiveport(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let avtiveportResponse = await ActivePortHttpRequests.createTenantAccount(requestBody);
        return Common.beautifyResult(avtiveportResponse, webResponse, EnumPartOf.Individual);
    }

    //insert new tenant in ActivePort
    async updateexistingtenantforactiveport(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let avtiveportResponse = await ActivePortHttpRequests.updateTenantAccount(requestBody);
        return Common.beautifyResult(avtiveportResponse, webResponse, EnumPartOf.Individual);
    }

    //retrieve new existing Clusters in NetApp
    async retrieveclustersfromnetapp(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let netappResponse = await NetAppHttpRequests.retrieveClustersFromNetapp(requestBody);
        return Common.beautifyResult(netappResponse, webResponse, EnumPartOf.Individual);
    }

    //insert new cluster in NetApp Kubernetes
    async createnkscluster(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let netappResponse = await NetAppHttpRequests.createNKSCluster(requestBody);
        return Common.beautifyResult(netappResponse, webResponse, EnumPartOf.Individual);
    }

     //insert new cluster in NetApp Kubernetes
     async deletenkscluster(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let netappResponse = await NetAppHttpRequests.deleteNKSCluster(requestBody);
        return Common.beautifyResult(netappResponse, webResponse, EnumPartOf.Individual);
    }

     //List dataiku list of datasets
     async listdataikudatasets(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let dataikuResponse = await DataikuHttpRequests.listDataSetsFromDataiku(requestBody);
        return Common.beautifyResult(dataikuResponse, webResponse, EnumPartOf.Individual);
    }

     //insert new dataset in dataiku
     async createdatasetfordataiku(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let dataikuResponse = await DataikuHttpRequests.createDatasetForDataiku(requestBody);
        return Common.beautifyResult(dataikuResponse, webResponse, EnumPartOf.Individual);
    }

     //insert new managed dataset in dataiku
     async createmanageddatasetfordataiku(requestBody: any, webResponse: any) {
        Logger.cleanLogs();
        let dataikuResponse = await DataikuHttpRequests.createManagedDatasetForDataiku(requestBody);
        return Common.beautifyResult(dataikuResponse, webResponse, EnumPartOf.Individual);
    }
}

export default new ServicesWrapper();