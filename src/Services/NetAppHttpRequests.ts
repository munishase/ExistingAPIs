import httppromise, { Options } from 'got';
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
  async retrieveClustersFromNetapp() {
    const isAuthorized = await this.isNetAppAuthorized();
    if (!isAuthorized)
      return;

    const options: Options = {
      url: this.baseUrl(Constants.NetAppClusters),
      method: 'GET',
      headers: { ...this.netAppHeader() }
    };

    try {
      const response: any = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.NetAppClusterRetrievalSuccess, response, ''));
      return new NetAppClustersRetrievalSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.NetAppClusterRetrievalFailure, err, ''));
    }

  }

  //Here we are creating new NKS cluster
  //prerequisite: NetApp Token in Header
  async createNKSCluster(requestBody: any) {
    const isAuthorized = await this.isNetAppAuthorized();
    if (!isAuthorized)
      return;

    const body = requestBody;

    const options: Options = {
      url: this.baseUrl(Constants.NetAppClusters),
      method: 'POST',
      headers: { ...this.netAppHeader() },
      json: body
    };

    try {
      const response: any = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.NetAppClusterCreationSuccess, response, ''));
      return new NetAppClustersRetrievalSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.NetAppClusterCreationFailure, err, ''));
    }

  }


  //Here we are deleting NKS cluster
  //prerequisite: NetApp Token in Header
  async deleteNKSCluster(param: { clusterId: string }) {
    const isAuthorized = await this.isNetAppAuthorized();
    if (!isAuthorized)
      return;

    const options: Options = {
      url: this.baseUrl(Constants.NetAppClusters + "/" + param.clusterId),
      method: 'DELETE',
      headers: { ...this.netAppHeader() }
    };

    try {
      const response: any = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.NetApp, Constants.NetAppClusterDeletionSuccess, response, ''));
      return new NetAppClustersRetrievalSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.NetApp, Constants.NetAppClusterDeletionFailure, err, ''));
    }

  }

}

export default new NetAppHttpRequests();