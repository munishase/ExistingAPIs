const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { NetAppBaseLayer } from './NetAppBaseLayer'
import { NetAppClustersRetrievalSuccessResponse } from '../class/Response/NetAppClustersRetrievalSuccessResponse'
import { EnumModule } from '../Enum/EnumModule';


class NetAppHttpRequests extends NetAppBaseLayer {

  constructor() {
    super();
  }

  //Here we are retrieving new nks cluster
  //prerequisite: NetApp Token in Header
  async retrieveClustersFromNetapp(requestBody: any) {
    if (await this.isNetAppAuthorized() == false)
      return;

    let options = {
      url: this.baseUrl(Constants.NetAppClusters),
      method: 'GET',
      headers: this.netAppHeader(),
      json: true
    };

    let self = this;
    let result;
    await httppromise(options).then(function (response: any) {
      result = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.NetAppClusterRetrievalSuccess, response, ''));
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.NetAppClusterRetrievalFailure, err, ''));
    })

    return new NetAppClustersRetrievalSuccessResponse(result);
  };

   //Here we are creating new NKS cluster
  //prerequisite: NetApp Token in Header
  async createNKSCluster(requestBody: any) {

    if (await this.isNetAppAuthorized() == false)
      return;

    let body = requestBody;

    let options = {
      url: this.baseUrl(Constants.NetAppClusters),
      method: 'POST',
      headers: this.netAppHeader(),
      body: body,
      json: true
    };

    let self = this;
    let result;
    
    await httppromise(options).then(function (response: any) {
      result = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.NetAppClusterRetrievalSuccess, response, ''));
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.NetAppClusterRetrievalFailure, err, ''));
    })

    return new NetAppClustersRetrievalSuccessResponse(result);
  };


   //Here we are deleting NKS cluster
  //prerequisite: NetApp Token in Header
  async deleteNKSCluster(param: any) {

    if (await this.isNetAppAuthorized() == false)
      return;

    let options = {
      url: this.baseUrl(Constants.NetAppClusters + "/" + param.clusterid),
      method: 'DELETE',
      headers: this.netAppHeader(),
      json: true
    };

    let self = this;
    let result;
    
    await httppromise(options).then(function (response: any) {
      result = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.NetAppClusterRetrievalSuccess, response, ''));
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.NetAppClusterRetrievalFailure, err, ''));
    })

    return new NetAppClustersRetrievalSuccessResponse(result);
  };
}


export default new NetAppHttpRequests();