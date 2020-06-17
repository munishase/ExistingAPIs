import httppromise, { Options } from 'got';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { DataikuBaseLayer } from './DataikuBaseLayer';
import { DataikuListDatasetsSuccessResponse } from '../class/Response/DataikuListDatasetsSuccessResponse';
import Common from '../class/Common';
import { DataikuProjectRequest } from '../types/DataikuProjectRequest';


class DataikuHttpRequests extends DataikuBaseLayer {

  constructor() {
    super();
  }

  //Here we are retrieving all datasets in dataiku
  //prerequisite: dataiku Token in Header
  async listDataSetsFromDataiku(param: DataikuProjectRequest) {

    const options: Options = {
      url: Common.replaceCurleBrasesInUrl(this.baseUrl(Constants.DataikuListDatasetsURL), param.projectKey),
      method: 'GET',
      username: this.dataikuHeader().user,
      password: this.dataikuHeader().password
    };

    try {
      const response: any = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuDatasetsRetrievalSuccess, response, ''));
      return new DataikuListDatasetsSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuDatasetsRetrievalFailure, err, ''));
    }

  }

  //Here we are creating new NKS cluster
  //prerequisite: dataiku Token in Header
  async createDatasetForDataiku(requestBody: DataikuProjectRequest) {

    const body = requestBody;

    const options: Options = {
      url: Common.replaceCurleBrasesInUrl(this.baseUrl(Constants.DataikuListDatasetsURL), requestBody.projectKey),
      method: 'POST',
      username: this.dataikuHeader().user,
      password: this.dataikuHeader().password,
      json: body
    };

    try {
      const response: any = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuInsertDatasetSuccess, response, ''));
      return new DataikuListDatasetsSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuInsertDatasetFailure, err, ''));
    }

  }

  //Here we are creating new NKS cluster
  //prerequisite: dataiku Token in Header
  async createManagedDatasetForDataiku(requestBody: DataikuProjectRequest) {

    const body = requestBody.dataset;

    const options: Options = {
      url: Common.replaceCurleBrasesInUrl(this.baseUrl(Constants.DataikuCreateManagedDatasetURL), requestBody.projectKey),
      method: 'POST',
      username: this.dataikuHeader().user,
      password: this.dataikuHeader().password,
      body
    };

    try {
      const response: any = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuInsertManagedDatasetSuccess, response, ''));
      return new DataikuListDatasetsSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuInsertManagedDatasetFailure, err, ''));
    }

  }

}


export default new DataikuHttpRequests();