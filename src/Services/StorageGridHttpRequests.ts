import httppromise, { Options } from 'got';
import sessionstorage from 'sessionstorage';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import Common from '../class/Common';
import { StorageGridBaseLayer } from './StorageGridBaseLayer'
import { StorageGridSuccessResponse } from '../class/Response/StorageGridSuccessResponse'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';
import { NetsuiteSuccessResponse } from '../class/Response/NetsuiteSuccessResponse';

class StorageGridHttpRequests extends StorageGridBaseLayer {

  constructor() {
    super();
  }

  //Here we are creating tenant Account
  //prerequisite: Storage Grid Token in Header
  async createTenantAccount(TenantName: string) {
    const isAuthorized = await this.isStoragegridAuthorized();
    if (!isAuthorized)
      return;

    this.storageGrid.Tenant.Name = TenantName;
    this.storageGrid.Tenant.UserPassword = Common.randomPassword(12);
    //this.storageGrid.Tenant.UserPassword = this.environmentConfig.StorageGrid.Tenant.UserPassword;
    this.storageGrid.Tenant.Capabilities = this.environmentConfig.StorageGrid.Tenant.Capabilities;
    this.storageGrid.Tenant.Policy.UseAccountIdentitySource = this.environmentConfig.StorageGrid.Tenant.Policy.UseAccountIdentitySource;
    this.storageGrid.Tenant.Policy.AllowPlatformServices = this.environmentConfig.StorageGrid.Tenant.Policy.AllowPlatformServices;
    this.storageGrid.Tenant.Policy.QuotaObjectBytes = this.environmentConfig.StorageGrid.Tenant.Policy.QuotaObjectBytes;

    const body = {
      "name": this.storageGrid.Tenant.Name,
      "password": this.storageGrid.Tenant.UserPassword,
      "capabilities": this.storageGrid.Tenant.Capabilities,
      "policy": {
        "useAccountIdentitySource": this.storageGrid.Tenant.Policy.UseAccountIdentitySource,
        "allowPlatformServices": this.storageGrid.Tenant.Policy.AllowPlatformServices,
        "quotaObjectBytes": this.storageGrid.Tenant.Policy.QuotaObjectBytes
      }
    }

    const options: Options = {
      url: this.baseUrl(Constants.StorageGridTenantAccountURL),
      method: 'POST',
      headers: {
        'Authorization': sessionstorage.getItem(EnumToken.StorageGridToken),
        'content-type': 'application/json'
      },
      json: body
    };

    try {
      const response: any = await httppromise(options);
      this.storageGrid.Tenant.AccountId = response.data.id;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Storagegrid, Constants.StorageGridTenantAccountCreationSuccess, response, body));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Storagegrid, Constants.StorageGridTenantAccountCreationError, err, body));
    }

  }

  //Here we are deleting tenant Account
  //prerequisite: Storage Grid Token in Header and Tanent account with this id already there
  async deleteTenantAccount(TenantId: string) {
    const isAuthorized = await this.authorizeStorageGrid();
    if (!isAuthorized)
      return;

    const options: Options = {
      url: this.baseUrl(Constants.StorageGridTenantAccountURL + "/" + TenantId),
      method: 'DELETE',
      headers: {
        'Authorization': sessionstorage.getItem(EnumToken.StorageGridToken),
        'content-type': 'application/json'
      }
    };

    try {
      const response: any = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Storagegrid, Constants.StorageGridTenantAccountDeletionSuccess, response, "Tenant Id: " + TenantId));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Storagegrid, Constants.StorageGridTenantAccountDeletionError, err, "Tenant Id: " + TenantId));
    }

  }

  //Here create new pair of keys
  //prerequisite: Tenant Token in Header
  async createKeysforNewlyCreatedTenantAccount() {
    const isAuthorized = await this.isTenantAuthorized();
    if (!isAuthorized)
      return;

    await this.authorizeTenantAccount();
    const body =
    {
      //below is commented because we want to generate key without any expiry date
      //"expires": expirayDate.toISOString()
    };

    const options: Options = {
      url: this.baseUrl(Constants.StorageGridTenantAccountS3KeysURL),
      method: "POST",
      headers: {
        "Authorization": sessionstorage.getItem(EnumToken.TenantToken),
        'content-type': 'application/json'
      },
      json: body
    };

    try {
      const response: any = await httppromise(options);
      this.storageGrid.Tenant.AccessKey = response.data.accessKey;
      this.storageGrid.Tenant.SecretAccessKey = response.data.secretAccessKey;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Storagegrid, Constants.StorageGridTenantKeyCreationSuccess, response, body));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Storagegrid, Constants.StorageGridTenantKeyCreationError, err, body));
      await this.deleteTenantAccount(this.storageGrid.Tenant.AccountId);
    }

  }

  //Here create new bucket for Tenant
  //prerequisite: Tenant Token in Header
  //It is giving error, because the global compliance rule are false and ILM also does not allow to change compliance,
  //so need to change ILM policy then compliance
  async createBucketForTenant(BucketName: string) {
    const isAuthorized = await this.isTenantAuthorized();
    if (!isAuthorized)
      return;

    this.storageGrid.Tenant.Bucket.name = BucketName; // this.environmentConfig.StorageGrid.Tenant.Bucket.S3_Bucket_Name;
    this.storageGrid.Tenant.Bucket.region = this.environmentConfig.StorageGrid.Tenant.Bucket.Region;

    const body =
    {
      "name": this.storageGrid.Tenant.Bucket.name,
      "region": this.storageGrid.Tenant.Bucket.region
    };

    const options: Options = {
      url: this.baseUrl(Constants.StorageGridTenantBucketURL),
      method: "POST",
      headers: {
        "Authorization": sessionstorage.getItem(EnumToken.TenantToken),
        'content-type': 'application/json'
      },
      json: body,
    };

    try {
      const response: any = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Storagegrid, Constants.StorageGridTenantBucketCreationSuccess, response, body));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Storagegrid, Constants.StorageGridTenantBucketCreationError, err, body));
      await this.deleteTenantAccount(this.storageGrid.Tenant.AccountId);
    }

  }

  //here number of steps are called as 
  //createTenantAccount, createKeysforNewlyCreatedTenantAccount and createBucketForTenant
  async processStorageGrid(RequestBody: StorageGridSuccessResponse) {

    sessionstorage.setItem(EnumToken.TenantToken, null);//setting tenant token as null as it will create new token

    await this.createTenantAccount(RequestBody.tenantname);
    await this.createKeysforNewlyCreatedTenantAccount();
    await this.createBucketForTenant(RequestBody.bucketname);

    return new StorageGridSuccessResponse(this.storageGrid);
  }

  //this is seprate when we want netsuite ASEC number to be tenant name
  async processStorageGridWithNetsuite(netsuite: NetsuiteSuccessResponse, RequestBody: StorageGridSuccessResponse) {
    const isAuthorized = await this.authorizeStorageGrid();
    if (!isAuthorized|| Logger.hasErrorLogs() == true)
      return;

    try {
      await this.createTenantAccount(netsuite.entityId + Constants.StorageGridTenantPrefix);
      await this.createKeysforNewlyCreatedTenantAccount();
      await this.createBucketForTenant(RequestBody.bucketname);
    } finally {
      this.removeToken();
    }
    return new StorageGridSuccessResponse(this.storageGrid);
  }
}


export default new StorageGridHttpRequests();