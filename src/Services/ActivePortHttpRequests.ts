const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
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

class ActivePortHttpRequests extends ActivePortBaseLayer {

  constructor() {
    super();
  }

  //Here we are creating tenant Account
  //prerequisite: ActivePort Token in Header
  async retrieveAllTenants(requestBody: any) {

    if (await this.isActivePortAuthorized() == false)
      return;

    let options = {
      url: this.baseUrl(Constants.ActivePortCreateTenantAccountURL),
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: true
    };

    let self = this;
    await httppromise(options).then(function (response: any) {

      self.activePort.ActivePortTenants = response;

      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountsSuccess, response, ''));
      return response;
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountsError, err, ''));
    })

    return new ActivePortTenantRetrieveSuccessResponse(this.activePort.ActivePortTenants);
  };


  //Here we are creating tenant Account
  //prerequisite: ActivePort Token in Header
  async createTenantAccount(requestBody: any) {

    if (await this.isActivePortAuthorized() == false)
      return;

    let activePortTenant = new ActivePortTenant();
    activePortTenant.name = requestBody.name;
    activePortTenant.description = requestBody.description;
    activePortTenant.tiles = requestBody.tiles;

    let body = {
      "description": activePortTenant.description,
      "name": activePortTenant.name,
      "tiles": activePortTenant.tiles
    }

    let options = {
      url: this.baseUrl(Constants.ActivePortCreateTenantAccountURL),
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      body: body,
      json: true
    };

    let self = this;
    await httppromise(options).then(function (response: any) {
      activePortTenant.id = response.id
      activePortTenant.tenantId = response.tenantId
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationSuccess, response, body));

    }).catch(function (err: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationError, err, body));
    })

    return new ActivePortTenantCreationSuccessResponse(activePortTenant);
  };

  //Here we are deleting ActivePort tenant Account
  //prerequisite: ActivePort Token in Header and ActivePort Tanent account with this id already there
  async updateTenantAccount(requestBody: any) {
    if (await this.isActivePortAuthorized() == false)
      return;

    let activePortTenant = new ActivePortTenant();
    activePortTenant.name = requestBody.name;
    activePortTenant.description = requestBody.description;
    activePortTenant.tiles = requestBody.tiles;
    activePortTenant.id = requestBody.id
    activePortTenant.tenantId = requestBody.tenantId

    let body = {
      "description": activePortTenant.description,
      "name": activePortTenant.name,
      "tiles": activePortTenant.tiles,
      "id": activePortTenant.id,
      "tenantId": activePortTenant.tenantId
    }

    let options = {
      url: this.baseUrl(Constants.ActivePortCreateTenantAccountURL),
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      body: body,
      json: true
    };

    let self = this;
    await httppromise(options).then(function (response: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationSuccess, response, body));
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationError, err, body));
    })

    return new ActivePortTenantCreationSuccessResponse(activePortTenant);
  };

  //Here we are retriving all ntu
  //prerequisite: ActivePort Token in Header
  async retrieveAllNTUs(requestBody: any) {

    if (await this.isActivePortAuthorized() == false)
      return;

    let options = {
      url: this.baseUrl(Constants.ActivePortNTUURL),
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: true
    };

    let self = this;
    await httppromise(options).then(function (response: any) {

      self.activePort.ActivePortNTU = response;

      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortNTUSuccess, response, ''));
      return response;
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortNTUError, err, ''));
    })

    return new ActivePortNtuRetrieveSuccessResponse(this.activePort.ActivePortNTU);
  };

  //Here we are retriving ntu by id
  //prerequisite: ActivePort Token in Header
  async retrieveNTUById(params: any) {

    if (await this.isActivePortAuthorized() == false)
      return;

    let options = {
      url: this.baseUrl(Constants.ActivePortNTUURL + "/" + params.ntuid),
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: true
    };

    let self = this;
    await httppromise(options).then(function (response: any) {

      self.activePort.ActivePortNTU = response;

      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortNTUSuccess, response, ''));
      return response;
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortNTUError, err, ''));
    })

    return new ActivePortNtuRetrieveSuccessResponse(this.activePort.ActivePortNTU);
  };


  //Here we are updating NTU
  //prerequisite: ActivePort Token in Header
  async updateNTUById(requestBody: any) {

    if (await this.isActivePortAuthorized() == false)
      return;

    let activePortNTU = new ActivePortNTU();
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

    let body = {
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

    let options = {
      url: this.baseUrl(Constants.ActivePortNTUURL),
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      body: body,
      json: true
    };

    let self = this;
    await httppromise(options).then(function (response: any) {
      activePortNTU.id = response.id
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationSuccess, response, body));

    }).catch(function (err: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationError, err, body));
    })

    return new ActivePortNTUCreationSuccessResponse(activePortNTU);

  };


  //Here we are creating NTU
  //prerequisite: ActivePort Token in Header
  async createNTU(requestBody: any) {
    if (await this.isActivePortAuthorized() == false)
      return;

    let activePortNTU = new ActivePortNTU();
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

    let body = {
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

    let options = {
      url: this.baseUrl(Constants.ActivePortNTUURL),
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      body: body,
      json: true
    };


    let self = this;
    await httppromise(options).then(function (response: any) {
      activePortNTU.id = response.id
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortNTUCreationSuccess, response, body));

    }).catch(function (err: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortNTUCreationError, err, body));
    })

    return new ActivePortNTUCreationSuccessResponse(activePortNTU);

  };

  //Here we are retriving ntu by id
  //prerequisite: ActivePort Token in Header
  async deleteNTUById(params: any) {
    if (await this.isActivePortAuthorized() == false)
      return;

    let options = {
      url: this.baseUrl(Constants.ActivePortNTUURL + "/" + params.ntuid),
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      json: true
    };

    let self = this;
    await httppromise(options).then(function (response: any) {
      self.activePort.ActivePortNTU = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountDeletionSuccess, response, ''));
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountDeletionError, err, ''));
    })

    return new ActivePortNtuRetrieveSuccessResponse(this.activePort.ActivePortNTU);
  };


  //Here we are creating NTU Port
  //prerequisite: ActivePort Token in Header
  async createNTUPort(requestBody: any) {
    if (await this.isActivePortAuthorized() == false)
      return;

    let activePortNTUPort = new ActivePortNTUPort();
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


    let body = {
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

    let options = {
      url: this.baseUrl(Constants.ActivePortNTUPortURL),
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionstorage.getItem(EnumToken.ActivePortToken),
        'content-type': 'application/json'
      },
      body: body,
      json: true
    };


    let self = this;
    let result;
    await httppromise(options).then(function (response: any) {
      result = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortNTUPortCreationSuccess, response, body));

    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortNTUPortCreationError, err, body));
    })

    if (result != undefined)
      return new ActivePortNTUPortCreationSuccessResponse(activePortNTUPort, result);
  };

  
}


export default new ActivePortHttpRequests();