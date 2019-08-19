import { StorageGrid } from '../StorageGrid'
import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'

export class StorageGridSuccessResponse extends BaseResponse {
    tenantname: string;
    tenantpassword: string;
    bucketname: string;
    tenantaccountid: string;
    tenantaccesskey: string;
    tenantsecretaccesskey: string;

    constructor(storageGrid: StorageGrid) {
        super();
        this.module = EnumModule.Storagegrid;
        this.tenantname = storageGrid.Tenant.Name;
        this.tenantpassword = storageGrid.Tenant.UserPassword;
        this.bucketname = storageGrid.Tenant.Bucket.name;
        this.tenantaccountid = storageGrid.Tenant.AccountId;
        this.tenantaccesskey = storageGrid.Tenant.AccessKey;
        this.tenantsecretaccesskey = storageGrid.Tenant.SecretAccessKey;
        return this;
    }
}

