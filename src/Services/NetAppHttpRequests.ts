import httppromise from 'request-promise';
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

    const options = {
      url: this.baseUrl(Constants.NetAppClusters),
      method: 'GET',
      headers: this.netAppHeader(),
      json: true
    };

    try {
      const response = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.NetAppClusterRetrievalSuccess, response, ''));
      return new NetAppClustersRetrievalSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.NetAppClusterRetrievalFailure, err, ''));
    }

  }

  //Here we are creating new NKS cluster
  //prerequisite: NetApp Token in Header
  async createNKSCluster(requestBody: any) {

    if (await this.isNetAppAuthorized() == false)
      return;

    const body = requestBody;

    const options = {
      url: this.baseUrl(Constants.NetAppClusters),
      method: 'POST',
      headers: this.netAppHeader(),
      body: body,
      json: true
    };

    try {
      const response = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.NetAppClusterCreationSuccess, response, ''));
      return new NetAppClustersRetrievalSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.NetAppClusterCreationFailure, err, ''));
    }

  }


  //Here we are deleting NKS cluster
  //prerequisite: NetApp Token in Header
  async deleteNKSCluster(param: any) {

    if (await this.isNetAppAuthorized() == false)
      return;

    const options = {
      url: this.baseUrl(Constants.NetAppClusters + "/" + param.clusterid),
      method: 'DELETE',
      headers: this.netAppHeader(),
      json: true
    };

    try {
      const response = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.NetAppClusterDeletionSuccess, response, ''));
      return new NetAppClustersRetrievalSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.NetAppClusterDeletionFailure, err, ''));
    }

  }

}

export default new NetAppHttpRequests();