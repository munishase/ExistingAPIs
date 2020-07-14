class Constants {

    //ActivePort
    readonly ActivePortAuthURL: string = "/api/rest/v1/authenticate";
    readonly ActivePortCreateTenantAccountURL: string = "/api/rest/v1/tenants";
    readonly ActivePortDeleteTenantAccountURL: string = "/api/rest/v1/tenants";
    readonly ActivePortNTUURL: string = "/devactiveportmicro/api/rest/v1/ntus";
    readonly ActivePortNTUPortURL: string = "/devactiveportmicro/api/rest/v1/ntu-ports";
    readonly ActivePortValidateServiceRequestURL: string = "/devactiveportmicro/api/rest/v1/services/validate/new";
    readonly ActivePortCreateServiceByUUidRequestURL: string = "/devactiveportmicro/api/rest/v1/services/create/";


    readonly ActivePortAuthError: string = "ActivePort Authorization failed";
    readonly ActivePortTokenRemovedError: string = "ActivePort Token removed failure";
    readonly ActivePortTenantAccountsError: string = "ActivePort Tenant Accounts retrieved failed";
    readonly ActivePortTenantAccountCreationError: string = "ActivePort Tenant Account creation failed";
    readonly ActivePortTenantAccountDeletionError: string = "ActivePort Tenant Account deletion failed";
    readonly ActivePortNTUError: string = "ActivePort NTU retrieval failed";
    readonly ActivePortNTUCreationError: string = "ActivePort NTU Port creation failed";
    readonly ActivePortNTUPortCreationError: string = "ActivePort NTU Port creation failed";
    readonly ActivePortValidateServiceRequestError: string = "ActivePort Validate Service Request creation failed";
    readonly ActivePortCreateServiceRequestError: string = "ActivePort create Validate Service Request creation failed";

    readonly ActivePortAuthSuccess: string = "ActivePort Authorization completed";
    readonly ActivePortTokenRemovedSuccess: string = "Activeport Token removed successfully";
    readonly ActivePortTenantAccountsSuccess: string = "ActivePort Tenant Accounts retrieved successfully";
    readonly ActivePortTenantAccountCreationSuccess: string = "ActivePort Tenant Account creation completed";
    readonly ActivePortTenantAccountDeletionSuccess: string = "ActivePort Tenant Account deletion completed";
    readonly ActivePortNTUSuccess: string = "ActivePort  NTU retrieval successfully";
    readonly ActivePortNTUCreationSuccess: string = "ActivePort NTU created successfully";
    readonly ActivePortNTUPortCreationSuccess: string = "ActivePort NTU Port created successfully";
    readonly ActivePortValidateServiceRequestSuccess: string = "ActivePort Validate Service Request created successfully";
    readonly ActivePortCreateServiceRequestSuccess: string = "ActivePort create Service Request created successfully";


    //Xcloud  
    readonly XcloudAuthURL: string = "/api/auth";
    readonly XcloudCircuitURL: string = "/api/circuit";
    readonly XcloudValidateCircuitURL: string = "/api/circuit/validate";
    readonly XcloudSwitchPortURL: string = "/api/switchports";
    readonly XcloudEbgpURL: string = "/api/ebgp";
    readonly XcloudSubnetURL: string = "/api/subnets";


    readonly XcloudAuthSuccess: string = "Xcloud Authorization completed";
    readonly XcloudTokenRemovedSuccess: string = "Xcloud cookie removed successfully";
    readonly XcloudDeleteCircuitSuccess: string = "Xcloud circuit deleted successfully";
    readonly XcloudValidateCircuitSuccess: string = "Xcloud circuit validated successfully";
    readonly XcloudUpdateCircuitSuccess: string = "Xcloud circuit updated successfully";
    readonly XcloudCreateCircuitSuccess: string = "Xcloud circuit adding successfully";
    readonly XcloudGetCircuitSuccess: string = "Xcloud circuit retrieved successfully";
    readonly XcloudCreateNTUSuccess: string = "Xcloud NTU created successfully";
    readonly XcloudGetSwitchPortSuccess: string = "Xcloud switch port retrieved successfully";
    readonly XcloudCreateEbgpSuccess: string = "Xcloud Ebgp added successfully";
    readonly XcloudCreateSubnetSuccess: string = "Xcloud Subnet added successfully";

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
    readonly XcloudCreateEbgpError: string = "Xcloud Ebgp added failure";
    readonly XcloudCreateSubnetError: string = "Xcloud Subnet added failure";

}

export default new Constants();