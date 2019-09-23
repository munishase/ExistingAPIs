const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
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

    let options = {
      url: Common.replaceCurleBrasesInUrl(this.baseUrl(Constants.DataikuListDatasetsURL), param.projectkey),
      method: 'GET',
      auth: this.dataikuHeader(),
      json: true
    };

    let self = this;

    let result;
    await httppromise(options).then(function (response: any) {
      result = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuDatasetsRetrievalSuccess, response, ''));
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuDatasetsRetrievalFailure, err, ''));
    })

    return new DataikuListDatasetsSuccessResponse(result);
  };

  //Here we are creating new NKS cluster
  //prerequisite: dataiku Token in Header
  async createDatasetForDataiku(requestBody: any) {

    let body = requestBody;

    let options = {
      url: Common.replaceCurleBrasesInUrl(this.baseUrl(Constants.DataikuListDatasetsURL), requestBody.projectKey),
      method: 'POST',
      auth: this.dataikuHeader(),
      body: body,
      json: true
    };

    let self = this;
    let result;

    await httppromise(options).then(function (response: any) {
      result = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuInsertDatasetSuccess, response, ''));
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuInsertDatasetFailure, err, ''));
    })

    return new DataikuListDatasetsSuccessResponse(result);
  };

  //Here we are creating new NKS cluster
  //prerequisite: dataiku Token in Header
  async createManagedDatasetForDataiku(requestBody: any) {

    let body = requestBody;


    let options = {
      url: Common.replaceCurleBrasesInUrl(this.baseUrl(Constants.DataikuCreateManagedDatasetURL), requestBody.projectKey),
      method: 'POST',
      auth: this.dataikuHeader(),
      body: body,
      json: true
    };

    let self = this;
    let result;

    await httppromise(options).then(function (response: any) {
      result = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Dataiku, Constants.DataikuInsertManagedDatasetSuccess, response, ''));
    }).catch(function (err: any) {

      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Dataiku, Constants.DataikuInsertManagedDatasetFailure, err, ''));
    })

    return new DataikuListDatasetsSuccessResponse(result);
  };
}


export default new DataikuHttpRequests();