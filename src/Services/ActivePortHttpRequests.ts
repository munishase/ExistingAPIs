import httppromise, { Options, Response } from 'got';
import sessionstorage from 'sessionstorage';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import Common from '../class/Common';
import { ActivePortBaseLayer } from './ActivePortBaseLayer'
import { ActivePortTenantCreationSuccessResponse } from '../class/Response/ActivePortTenantCreationSuccessResponse'
import { ActivePortNTUCreationSuccessResponse } from '../class/Response/ActivePortNTUCreationSuccessResponse'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';
import { ActivePortNtuRetrieveSuccessResponse } from '../class/Response/ActivePortNtuRetrieveSuccessResponse';
import { ActivePortTenantRetrieveSuccessResponse } from '../class/Response/ActivePortTenantRetrieveSuccessResponse';
import { ActivePortTenant } from '../class/ActivePortTenant';
import { ActivePortNTU } from '../class/ActivePortNTU';
import { ActivePortNTUPort } from '../class/ActivePortNTUPort';
import { ActivePortNTUPortCreationSuccessResponse } from '../class/Response/ActivePortNTUPortCreationSuccessResponse'
import { ActivePortServiceRequest } from '../class/ActivePortServiceRequest';
import DbCrudOperations from './DbCrudOperations';
import { EnumResultType } from '../Enum/EnumResultType';

class ActivePortHttpRequests extends ActivePortBaseLayer {

  constructor() {
    super();
  }

  //Here we are creating tenant Account
  //prerequisite: ActivePort Token in Header
  async retrieveAllTenants() {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortCreateTenantAccountURL),
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      responseType: 'json'
    };

    try {
      const { body: response}: any = await httppromise(options) as Response;
      this.activePort.ActivePortTenants = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountsSuccess, response, ''));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountsError, err, ''));
    }

    return new ActivePortTenantRetrieveSuccessResponse(this.activePort.ActivePortTenants);
  }

  //Here we are creating tenant Account
  //prerequisite: ActivePort Token in Header
  async createTenantAccount(requestBody: ActivePortTenant) {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const activePortTenant = new ActivePortTenant();
    activePortTenant.name = requestBody.name;
    activePortTenant.description = requestBody.description;
    activePortTenant.tiles = requestBody.tiles;

    const body = {
      "description": activePortTenant.description,
      "name": activePortTenant.name,
      "tiles": activePortTenant.tiles
    }

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortCreateTenantAccountURL),
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: body,
      responseType: 'json'
    };

    try {
      const { body: response}: any = await httppromise(options) as Response;
      activePortTenant.id = response.id;
      activePortTenant.tenantId = response.tenantId;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationSuccess, response, body));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationError, err, body));
    }

    return new ActivePortTenantCreationSuccessResponse(activePortTenant);
  }

  //Here we are deleting ActivePort tenant Account
  //prerequisite: ActivePort Token in Header and ActivePort Tanent account with this id already there
  async updateTenantAccount(requestBody: ActivePortTenant) {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const activePortTenant = new ActivePortTenant();
    activePortTenant.name = requestBody.name;
    activePortTenant.description = requestBody.description;
    activePortTenant.tiles = requestBody.tiles;
    activePortTenant.id = requestBody.id
    activePortTenant.tenantId = requestBody.tenantId

    const body = {
      "description": activePortTenant.description,
      "name": activePortTenant.name,
      "tiles": activePortTenant.tiles,
      "id": activePortTenant.id,
      "tenantId": activePortTenant.tenantId
    }

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortCreateTenantAccountURL),
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: body,
      responseType: 'json'
    };

    try {
      const { body: response}: any = await httppromise(options) as Response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationSuccess, response, body));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationError, err, body));
    }

    return new ActivePortTenantCreationSuccessResponse(activePortTenant);
  }

  //Here we are retriving all ntu
  //prerequisite: ActivePort Token in Header
  async retrieveAllNTUs() {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortNTUURL),
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      responseType: 'json'
    };

    try {
      const { body: response}: any = await httppromise(options) as Response;
      this.activePort.ActivePortNTU = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortNTUSuccess, response, ''));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortNTUError, err, ''));
    }

    return new ActivePortNtuRetrieveSuccessResponse(this.activePort.ActivePortNTU);
  }

  //Here we are retriving ntu by id
  //prerequisite: ActivePort Token in Header
  async retrieveNTUById(params: any) {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortNTUURL + "/" + params.ntuid),
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      responseType: 'json'
    };

    try {
      const { body: response}: any = await httppromise(options) as Response;
      this.activePort.ActivePortNTU = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortNTUSuccess, response, ''));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortNTUError, err, ''));
    }

    return new ActivePortNtuRetrieveSuccessResponse(this.activePort.ActivePortNTU);
  }

  //Here we are updating NTU
  //prerequisite: ActivePort Token in Header
  async updateNTUById(requestBody: any) {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const activePortNTU = new ActivePortNTU();
    activePortNTU.id = requestBody.id;
    activePortNTU.autoRollback = requestBody.autoRollback;
    activePortNTU.burstTime = requestBody.burstTime;
    activePortNTU.configBackup = requestBody.configBackup;
    activePortNTU.defaultRate = requestBody.defaultRate;
    activePortNTU.description = requestBody.description;
    activePortNTU.enableBod = requestBody.enableBod;
    activePortNTU.endpoint = requestBody.endpoint;
    activePortNTU.firmwareVersion = requestBody.firmwareVersion;
    activePortNTU.ipAddress = requestBody.ipAddress;
    activePortNTU.loIp = requestBody.loIp;
    activePortNTU.serviceConfigurationId = requestBody.serviceConfigurationId;
    activePortNTU.maxRate = requestBody.maxRate;
    activePortNTU.minRate = requestBody.minRate;
    activePortNTU.mode = requestBody.mode;
    activePortNTU.name = requestBody.name;
    activePortNTU.ntutypeId = requestBody.ntutypeId;
    activePortNTU.restEnabled = requestBody.restEnabled;
    activePortNTU.restPassword = requestBody.restPassword;
    activePortNTU.restUsername = requestBody.restUsername;
    activePortNTU.secondUplinkPort = requestBody.secondUplinkPort;
    activePortNTU.serialNumber = requestBody.serialNumber;
    activePortNTU.tenantId = requestBody.tenantId;
    activePortNTU.timeZone = requestBody.timeZone;
    activePortNTU.uplinkPort = requestBody.uplinkPort;

    const body = {
      "id": activePortNTU.id,
      "autoRollback": activePortNTU.autoRollback,
      "burstTime": activePortNTU.burstTime,
      "configBackup": activePortNTU.configBackup,
      "defaultRate": activePortNTU.defaultRate,
      "description": activePortNTU.description,
      "enableBod": activePortNTU.enableBod,
      "endpoint": activePortNTU.endpoint,
      "firmwareVersion": activePortNTU.firmwareVersion,
      "ipAddress": activePortNTU.ipAddress,
      "loIp": activePortNTU.loIp,
      "serviceConfigurationId": activePortNTU.serviceConfigurationId,
      "maxRate": activePortNTU.maxRate,
      "minRate": activePortNTU.minRate,
      "mode": activePortNTU.mode,
      "name": activePortNTU.name,
      "ntutypeId": activePortNTU.ntutypeId,
      "restEnabled": activePortNTU.restEnabled,
      "restPassword": activePortNTU.restPassword,
      "restUsername": activePortNTU.restUsername,
      "secondUplinkPort": activePortNTU.secondUplinkPort,
      "serialNumber": activePortNTU.serialNumber,
      "tenantId": activePortNTU.tenantId,
      "timeZone": activePortNTU.timeZone,
      "uplinkPort": activePortNTU.uplinkPort
    }

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortNTUURL),
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: body,
      responseType: 'json'
    };

    try {
      const { body: response}: any = await httppromise(options) as Response;
      activePortNTU.id = response.id
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationSuccess, response, body));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationError, err, body));
    }

    return new ActivePortNTUCreationSuccessResponse(activePortNTU);

  }

  //Here we are creating NTU
  //prerequisite: ActivePort Token in Header
  async createNTU(requestBody: any) {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const activePortNTU = new ActivePortNTU();
    activePortNTU.autoRollback = requestBody.autoRollback;
    activePortNTU.burstTime = requestBody.burstTime;
    activePortNTU.configBackup = requestBody.configBackup;
    activePortNTU.defaultRate = requestBody.defaultRate;
    activePortNTU.description = requestBody.description;
    activePortNTU.enableBod = requestBody.enableBod;
    activePortNTU.endpoint = requestBody.endpoint;
    activePortNTU.firmwareVersion = requestBody.firmwareVersion;
    activePortNTU.ipAddress = requestBody.ipAddress;
    activePortNTU.loIp = requestBody.loIp;
    activePortNTU.serviceConfigurationId = requestBody.serviceConfigurationId;
    activePortNTU.maxRate = requestBody.maxRate;
    activePortNTU.minRate = requestBody.minRate;
    activePortNTU.mode = requestBody.mode;
    activePortNTU.name = requestBody.name;
    activePortNTU.ntutypeId = requestBody.ntutypeId;
    activePortNTU.restEnabled = requestBody.restEnabled;
    activePortNTU.restPassword = requestBody.restPassword;
    activePortNTU.restUsername = requestBody.restUsername;
    activePortNTU.secondUplinkPort = requestBody.secondUplinkPort;
    activePortNTU.serialNumber = requestBody.serialNumber;
    activePortNTU.tenantId = requestBody.tenantId;
    activePortNTU.timeZone = requestBody.timeZone;
    activePortNTU.uplinkPort = requestBody.uplinkPort;

    const body = {
      "autoRollback": activePortNTU.autoRollback,
      "burstTime": activePortNTU.burstTime,
      "configBackup": activePortNTU.configBackup,
      "defaultRate": activePortNTU.defaultRate,
      "description": activePortNTU.description,
      "enableBod": activePortNTU.enableBod,
      "endpoint": activePortNTU.endpoint,
      "firmwareVersion": activePortNTU.firmwareVersion,
      "ipAddress": activePortNTU.ipAddress,
      "loIp": activePortNTU.loIp,
      "serviceConfigurationId": activePortNTU.serviceConfigurationId,
      "maxRate": activePortNTU.maxRate,
      "minRate": activePortNTU.minRate,
      "mode": activePortNTU.mode,
      "name": activePortNTU.name,
      "ntutypeId": activePortNTU.ntutypeId,
      "restEnabled": activePortNTU.restEnabled,
      "restPassword": activePortNTU.restPassword,
      "restUsername": activePortNTU.restUsername,
      "secondUplinkPort": activePortNTU.secondUplinkPort,
      "serialNumber": activePortNTU.serialNumber,
      "tenantId": activePortNTU.tenantId,
      "timeZone": activePortNTU.timeZone,
      "uplinkPort": activePortNTU.uplinkPort
    }

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortNTUURL),
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: body,
      responseType: 'json'
    };


    try {
      const { body: response}: any = await httppromise(options) as Response;
      activePortNTU.id = response.id
      DbCrudOperations.saveRecord(Common.createFluidDbObject(options, response, EnumResultType.success));
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortNTUCreationSuccess, response, body));
    } catch (err) {
      DbCrudOperations.saveRecord(Common.createFluidDbObject(options, err, EnumResultType.fail));
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortNTUCreationError, err, body));
    }

    return new ActivePortNTUCreationSuccessResponse(activePortNTU);
  }

  //Here we are retriving ntu by id
  //prerequisite: ActivePort Token in Header
  async deleteNTUById(params: any) {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortNTUURL + "/" + params.ntuid),
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      responseType: 'json'
    };

    try {
      const { body: response}: any = await httppromise(options) as Response;
      this.activePort.ActivePortNTU = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountDeletionSuccess, response, ''));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountDeletionError, err, ''));
    }

    return new ActivePortNtuRetrieveSuccessResponse(this.activePort.ActivePortNTU);
  }


  //Here we are creating NTU Port
  //prerequisite: ActivePort Token in Header
  async createNTUPort(requestBody: any) {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const activePortNTUPort = new ActivePortNTUPort();
    activePortNTUPort.ntuId = requestBody.ntuId;
    activePortNTUPort.description = requestBody.description;
    activePortNTUPort.internetPort = requestBody.internetPort;
    activePortNTUPort.jumbo = requestBody.jumbo;
    activePortNTUPort.label = requestBody.label;
    activePortNTUPort.mac = requestBody.mac;
    activePortNTUPort.name = requestBody.name;
    activePortNTUPort.portSpeed = requestBody.portSpeed;
    activePortNTUPort.portType = requestBody.portType;
    activePortNTUPort.trunk = requestBody.trunk;


    const body = {
      "ntuId": activePortNTUPort.ntuId,
      "description": activePortNTUPort.description,
      "internetPort": activePortNTUPort.internetPort,
      "jumbo": activePortNTUPort.jumbo,
      "label": activePortNTUPort.label,
      "mac": activePortNTUPort.mac,
      "name": activePortNTUPort.name,
      "portSpeed": activePortNTUPort.portSpeed,
      "portType": activePortNTUPort.portType,
      "trunk": activePortNTUPort.trunk

    }

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortNTUPortURL),
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: body,
      responseType: 'json'
    };

    try {
      const { body: response}: any = await httppromise(options) as Response;
      DbCrudOperations.saveRecord(Common.createFluidDbObject(options, response, EnumResultType.success));
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortNTUPortCreationSuccess, response, body));

      if (response != undefined)
        return new ActivePortNTUPortCreationSuccessResponse(activePortNTUPort, response);
    } catch (err) {
      DbCrudOperations.saveRecord(Common.createFluidDbObject(options, err, EnumResultType.fail));
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortNTUPortCreationError, err, body));
    }
  }

  //Here we are creating validateServiceRequest
  //prerequisite: ActivePort Token in Header
  async validateServiceRequest(requestBody: any) {
    const isAuthorized = await this.isActivePortAuthorized();
    if (!isAuthorized)
      return;

    const activePortServiceRequest = new ActivePortServiceRequest();
    activePortServiceRequest.name = requestBody.name;
    activePortServiceRequest.serviceConfigurationId = requestBody.serviceConfigurationId;
    activePortServiceRequest.ntuId = requestBody.ntuId;
    activePortServiceRequest.description = requestBody.description;
    activePortServiceRequest.type = requestBody.type;
    activePortServiceRequest.remotePortUuid = requestBody.remotePortUuid;
    activePortServiceRequest.accountId = requestBody.accountId;
    activePortServiceRequest.rateLimit = requestBody.rateLimit;
    activePortServiceRequest.hostedType = requestBody.hostedType;
    activePortServiceRequest.awsType = requestBody.awsType;
    //activePortServiceRequest.circuitType = requestBody.circuitType; default value set in class
    //activePortServiceRequest.callbackUrl = requestBody.callbackUrl; no need to callback url
    activePortServiceRequest.downLinkPort = requestBody.downLinkPort;



    const body = {
      "name": activePortServiceRequest.name,
      "serviceConfigurationId": activePortServiceRequest.serviceConfigurationId,
      "ntuId": activePortServiceRequest.ntuId,
      "description": activePortServiceRequest.description,
      "type": activePortServiceRequest.type,
      "remotePortUuid": activePortServiceRequest.remotePortUuid,
      "accountId": activePortServiceRequest.accountId,
      "rateLimit": activePortServiceRequest.rateLimit,
      "hostedType": activePortServiceRequest.hostedType,
      "awsType": activePortServiceRequest.awsType,
      "circuitType": activePortServiceRequest.circuitType,
      //"callbackUrl": activePortServiceRequest.callbackUrl,
      "downLinkPort": activePortServiceRequest.downLinkPort
    }

    const options: Options = {
      url: this.baseUrl(Constants.ActivePortValidateServiceRequestURL),
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: body,
      responseType: 'json'
    };

    try {
      const {body: response}: any = await httppromise(options);
      activePortServiceRequest.uuid = response.uuid;
      DbCrudOperations.saveRecord(Common.createFluidDbObject(options, response, EnumResultType.success));
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortValidateServiceRequestSuccess, response, body));
      return response;
    } catch (err) {
      DbCrudOperations.saveRecord(Common.createFluidDbObject(options, err, EnumResultType.fail));
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortValidateServiceRequestError, err, body));
    }

  }


  //Here we are creating validateServiceRequest
  //prerequisite: ActivePort Token in Header
  async createServiceByUUID(requestBody: any) {
    // const isAuthorized = await this.isActivePortAuthorized();
    // if (!isAuthorized)
    //   return;

    const body = {};
    const options: Options = {
      url: this.baseUrl(Constants.ActivePortCreateServiceByUUidRequestURL + requestBody.uuid),
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: body,
      responseType: 'json'
    };

    try {
      const { body: response }: any = await httppromise(options);
      DbCrudOperations.saveRecord(Common.createFluidDbObject(options, response, EnumResultType.success));
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortCreateServiceRequestSuccess, response, body));
      return response;
    } catch (err) {
      DbCrudOperations.saveRecord(Common.createFluidDbObject(options, err, EnumResultType.fail));
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortCreateServiceRequestError, err, body));
    }

  }

}


export default new ActivePortHttpRequests();