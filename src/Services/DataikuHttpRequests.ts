import httppromise from 'request-promise';
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { DataikuBaseLayer } from './DataikuBaseLayer';
import { DataikuListDatasetsSuccessResponse } from '../class/Response/DataikuListDatasetsSuccessResponse';
import Common from '../class/Common';


class DataikuHttpRequests extends DataikuBaseLayer {

  constructor() {
    super();
  }

  //Here we are retrieving all datasets in dataiku
  //prerequisite: dataiku Token in Header
  async listDataSetsFromDataiku(param: any) {

    const options = {
      url: Common.replaceCurleBrasesInUrl(this.baseUrl(Constants.DataikuListDatasetsURL), param.projectkey),
      method: 'GET',
      auth: this.dataikuHeader(),
      json: true
    };

    try {
      const response = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuDatasetsRetrievalSuccess, response, ''));
      return new DataikuListDatasetsSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuDatasetsRetrievalFailure, err, ''));
    }

  }

  //Here we are creating new NKS cluster
  //prerequisite: dataiku Token in Header
  async createDatasetForDataiku(requestBody: any) {

    const body = requestBody;

    const options = {
      url: Common.replaceCurleBrasesInUrl(this.baseUrl(Constants.DataikuListDatasetsURL), requestBody.projectKey),
      method: 'POST',
      auth: this.dataikuHeader(),
      body: body,
      json: true
    };

    try {
      const response = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuInsertDatasetSuccess, response, ''));
      return new DataikuListDatasetsSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuInsertDatasetFailure, err, ''));
    }

  }

  //Here we are creating new NKS cluster
  //prerequisite: dataiku Token in Header
  async createManagedDatasetForDataiku(requestBody: any) {

    const body = requestBody.dataset;

    const options = {
      url: Common.replaceCurleBrasesInUrl(this.baseUrl(Constants.DataikuCreateManagedDatasetURL), requestBody.projectKey),
      method: 'POST',
      auth: this.dataikuHeader(),
      body: body,
      json: true
    };

    try {
      const response = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuInsertManagedDatasetSuccess, response, ''));
      return new DataikuListDatasetsSuccessResponse(response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuInsertManagedDatasetFailure, err, ''));
    }

  }

}


export default new DataikuHttpRequests();