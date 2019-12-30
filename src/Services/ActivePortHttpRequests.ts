const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import Common from '../class/Common';
import { ActivePortBaseLayer } from './ActivePortBaseLayer'
import { ActivePortTenantCreationSuccessResponse } from '../class/Response/ActivePortTenantCreationSuccessResponse'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';
import { ActivePortTenantRetrieveSuccessResponse } from '../class/Response/ActivePortTenantRetrieveSuccessResponse';
import { ActivePortTenant } from '../class/ActivePortTenant';

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

      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationSuccess, response, ''));
      return response;
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortTenantAccountCreationError, err, ''));
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


}


export default new ActivePortHttpRequests();