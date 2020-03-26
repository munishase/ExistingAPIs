class Constants {

    //Storagegrid
    readonly StorageGridAuthURL: string = "/v2/authorize";
    readonly StorageGridTenantPrefix: string = "-VCCSP1-T1";
    readonly StorageGridTenantAccountURL: string = "/v2/grid/accounts";
    readonly StorageGridTenantAccountS3KeysURL: string = "/v2/org/users/current-user/s3-access-keys";
    readonly StorageGridTenantBucketURL: string = "/v2/org/containers";

    readonly StorageGridAuthError: string = "StorageGrid Authorization failed";
    readonly StorageGridTenantAuthError: string = "StorageGrid Tenant Authorization failed";
    readonly StorageGridTenantAccountCreationError: string = "StorageGrid Tenant Account creation failed";
    readonly StorageGridTenantAccountDeletionError: string = "StorageGrid Tenant Account deletion failed";
    readonly StorageGridTenantKeyCreationError: string = "StorageGrid Tenant Account key creation failed";
    readonly StorageGridTenantBucketCreationError: string = "StorageGrid Tenant Account bucket creation failed";
    readonly StoragegridTokenRemovedError: string = "Storagegrid Token removed failure";
    readonly StoragegridTenantTokenRemovedError: string = "Storagegrid Tenant Token removed failure";

    readonly StorageGridAuthSuccess: string = "StorageGrid Authorization completed";
    readonly StorageGridTenantAuthSuccess: string = "StorageGrid Tenant Authorization completed";
    readonly StorageGridTenantAccountCreationSuccess: string = "StorageGrid Tenant Account creation completed";
    readonly StorageGridTenantAccountDeletionSuccess: string = "StorageGrid Tenant Account deletion completed";
    readonly StorageGridTenantKeyCreationSuccess: string = "StorageGrid Tenant Account key creation completed";
    readonly StorageGridTenantBucketCreationSuccess: string = "StorageGrid Tenant Account bucket creation completed";
    readonly StoragegridTokenRemovedSuccess: string = "Storagegrid Token removed successfully";
    readonly StoragegridTenantTokenRemovedSuccess: string = "Storagegrid Tenant Token removed successfully";
    //


    //Veeam  
    readonly VeeamAuthURL: string = "/token";
    readonly VeeamTenantURL: string = "/v2/tenants";
    readonly VeeamAuthError: string = "Veeam Authorization failed";
    readonly VeeamAuthSuccess: string = "Veeam Authorization completed";
    readonly VeeamAccountCreationSuccess: string = "Veeam Account creation completed";
    readonly VeeamAccountCreationError: string = "Veeam Account creation failed";
    readonly VeeamTokenRemovedSuccess: string = "Veeam Token removed successfully";
    readonly VeeamTokenRemovedFailure: string = "Veeam Token removed failure";
    //
    

    //Netsuite
    readonly NetsuiteCreateClientURL: string = "?script=1298&deploy=27";
    readonly NetsuiteClientCreationSuccess: string = "Netsuite Client creation completed";
    readonly NetsuiteClientUpdationSuccess: string = "Netsuite Client updation completed";
    readonly NetsuiteClientDeletionSuccess: string = "Netsuite Client deletion completed";

    readonly NetsuiteClientCreationError: string = "Netsuite Client creation failed";
    readonly NetsuiteClientUpdationError: string = "Netsuite Client updation failed";
    readonly NetsuiteClientDeletionError: string = "Netsuite Client deletion failed";

    readonly NetsuiteRecordType: string = "customer";
    //


    //Stitchdata
    readonly StitchdataAuthURL: string = "/oauth/token";
    readonly StitchdataCreateAccountURL: string = "/v3/accounts";
    readonly StitchdataRetrieveSourcesURL: string = "/v4/sources";
    readonly StitchdataRetrieveDestinationsURL: string = "/v4/destinations";

    readonly StitchdataAuthError: string = "Stitchdata Authorization failed";
    readonly StitchdataTokenRemovedError: string = "Stitchdata Token removed failure";
    readonly StitchdataCreateAccountError: string = "Stitchdata Account creation failed";
    readonly StitchdataRetrieveSourcesError: string = "Stitchdata Account sources retrieval failed";

    readonly StitchdataAuthSuccess: string = "Stitchdata Authorization completed";
    readonly StitchdataTokenRemovedSuccess: string = "Stitchdata Token removed successfully";
    readonly StitchdataCreateAccountSuccess: string = "Stitchdata Account creation completed";
    readonly StitchdataRetrieveSourcesSuccess: string = "Stitchdata Account sources retrieval completed";




    //ActivePort
    readonly ActivePortAuthURL: string = "/api/rest/v1/authenticate";
    readonly ActivePortCreateTenantAccountURL: string = "/api/rest/v1/tenants";
    readonly ActivePortDeleteTenantAccountURL: string = "/api/rest/v1/tenants";
    readonly ActivePortNTUURL: string = "/devactiveportmicro/api/rest/v1/ntus";
    readonly ActivePortNTUPortURL: string = "/devactiveportmicro/api/rest/v1/ntu-ports";
    

    readonly ActivePortAuthError: string = "ActivePort Authorization failed";
    readonly ActivePortTokenRemovedError: string = "ActivePort Token removed failure";
    readonly ActivePortTenantAccountsError: string = "ActivePort Tenant Accounts retrieved failed";
    readonly ActivePortTenantAccountCreationError: string = "ActivePort Tenant Account creation failed";
    readonly ActivePortTenantAccountDeletionError: string = "ActivePort Tenant Account deletion failed";
    readonly ActivePortNTUError: string = "ActivePort NTU retrieval failed";
    readonly ActivePortNTUCreationError: string = "ActivePort NTU Port creation failed";
    readonly ActivePortNTUPortCreationError: string = "ActivePort NTU Port creation failed";

    readonly ActivePortAuthSuccess: string = "ActivePort Authorization completed";
    readonly ActivePortTokenRemovedSuccess: string = "Activeport Token removed successfully";
    readonly ActivePortTenantAccountsSuccess: string = "ActivePort Tenant Accounts retrieved successfully";
    readonly ActivePortTenantAccountCreationSuccess: string = "ActivePort Tenant Account creation completed";
    readonly ActivePortTenantAccountDeletionSuccess: string = "ActivePort Tenant Account deletion completed";
    readonly ActivePortNTUSuccess: string = "ActivePort  NTU retrieval successfully";
    readonly ActivePortNTUCreationSuccess: string = "ActivePort NTU created successfully";
    readonly ActivePortNTUPortCreationSuccess: string = "ActivePort NTU Port created successfully";


     //Xcloud  
     readonly XcloudAuthURL: string = "/api/auth";
     readonly XcloudCircuitURL: string = "/api/circuit";
     readonly XcloudValidateCircuitURL: string = "/api/circuit/validate";
     readonly XcloudSwitchPortURL: string = "/api/switchports";

     readonly XcloudAuthSuccess: string = "Xcloud Authorization completed";
     readonly XcloudTokenRemovedSuccess: string = "Xcloud cookie removed successfully";
     readonly XcloudDeleteCircuitSuccess: string = "Xcloud circuit deleted successfully";
     readonly XcloudValidateCircuitSuccess: string = "Xcloud circuit validated successfully";
     readonly XcloudUpdateCircuitSuccess: string = "Xcloud circuit updated successfully";
     readonly XcloudCreateCircuitSuccess: string = "Xcloud circuit adding successfully";
     readonly XcloudGetCircuitSuccess: string = "Xcloud circuit retrieved successfully";
     readonly XcloudCreateNTUSuccess: string = "Xcloud NTU created successfully";
     readonly XcloudGetSwitchPortSuccess: string = "Xcloud switch port retrieved successfully";

     readonly XcloudAuthError: string = "Xcloud Authorization failure";
     readonly XcloudTokenRemovedFailure: string = "Xcloud cookie removed failure";
     readonly XcloudDeleteCircuitError: string = "Xcloud circuit deleted failure";
     readonly XcloudValidateCircuitError: string = "Xcloud circuit validated failure";
     readonly XcloudUpdateCircuitError: string = "Xcloud circuit updated failure";
     readonly XcloudCreateCircuitError: string = "Xcloud circuit adding failure";
     readonly XcloudGetCircuitError: string = "Xcloud circuit retrieval failure";
     readonly XcloudCreateNTUError: string = "Xcloud NTU adding failure";
     readonly XcloudGetSwitchPortError: string = "Xcloud switch port retrieval failure";
     readonly XcloudNoSwitchPortError: string = "No switch port found with the id";



    //NetAPp

    readonly NetAppOrg: string = "/orgs/";
    readonly NetAppClusters: string = "/clusters";


    readonly NetAppTokenRemovedSuccess: string = "NetApp Token removed successfully";
    readonly NetAppClusterCreationSuccess: string = "NetApp Clusters created successfully";
    readonly NetAppClusterRetrievalSuccess: string = "NetApp Clusters are retrieved successfully";
    readonly NetAppClusterDeletionSuccess: string = "NetApp Clusters deleted successfully";

    readonly NetAppTokenRemovedError: string = "NetApp Token removed failure";
    readonly NetAppClusterCreationFailure: string = "NetApp Clusters creation failed";
    readonly NetAppClusterRetrievalFailure: string = "NetApp Clusters retrieval failed";
    readonly NetAppClusterDeletionFailure: string = "NetApp Clusters deleted failed";
    

    //DataIku
    readonly DataikuListDatasetsURL: string = "/public/api/projects/{projectKey}/datasets/";
    readonly DataikuCreateDatasetURL: string = "/projects/{projectKey}/datasets";
    readonly DataikuCreateManagedDatasetURL: string = "/public/api/projects/{projectKey}/datasets/managed";

    readonly DataikuDatasetsRetrievalSuccess: string = "Dataiku datasets are retrieved successfully";
    readonly DataikuInsertDatasetSuccess: string = "Dataiku insert new dataset executed successfully";
    readonly DataikuInsertManagedDatasetSuccess: string = "Dataiku insert new managed dataset executed successfully";
    readonly DataikuTokenRemovedError: string = "Dataiku Token removal failed";

    readonly DataikuDatasetsRetrievalFailure: string = "Dataiku datasets retrieval failed";
    readonly DataikuInsertDatasetFailure: string = "Dataiku insert new dataset failed";
    readonly DataikuInsertManagedDatasetFailure: string = "Dataiku insert new managed dataset failed";
    readonly DataikuTokenRemovedSuccess: string = "Dataiku Token removed successfully";




}




export default new Constants();