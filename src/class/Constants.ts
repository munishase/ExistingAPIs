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

    readonly StitchdataAuthError: string = "Stitchdata Authorization failed";
    readonly StitchdataTokenRemovedError: string = "Stitchdata Token removed failure";
    readonly StitchdataCreateAccountError: string = "Stitchdata Account creation failed";

    readonly StitchdataAuthSuccess: string = "Stitchdata Authorization completed";
    readonly StitchdataTokenRemovedSuccess: string = "Stitchdata Token removed successfully";
    readonly StitchdataCreateAccountSuccess: string = "Stitchdata Account creation completed";
}




export default new Constants();