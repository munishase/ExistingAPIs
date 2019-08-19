const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { StitchdataBaseLayer } from './StitchdataBaseLayer'
import { StitchdataAccountAuthorizationSuccessResponse } from '../class/Response/StitchdataAccountAuthorizationSuccessResponse'
import { StitchdataAccountCreationSuccessResponse } from '../class/Response/StitchdataAccountCreationSuccessResponse'
import { EnumModule } from '../Enum/EnumModule';
import { StitchdataCreateAccount } from '../class/StitchdataCreateAccount';
import { StitchdataGetRequestSuccessResponse } from '../class/Response/StitchdataGetRequestSuccessResponse';

class StitchdataHttpRequests extends StitchdataBaseLayer {

  constructor() {
    super();
  }

  //Here we are generating token for existing account
  async generateTokenForExistingStitchdataAccount(RequestBody: any) {

    this.removeToken();
    this.stitchdata.AuthorizationCode = RequestBody.stitch_auth_code;
    let self = this;
    await this.authorizeStitchdata(self.stitchdata).then(function (response: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataAuthError, response, ""));
    }).catch(function (err: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataAuthSuccess, err, ""));
    });

    return new StitchdataAccountAuthorizationSuccessResponse(this.stitchdata);
  };


  //Here we are creating new Account
  async registerAccountForStitchdata(RequestBody: any) {

    this.assignStitchdataEssentials();
    let stitchdataCreateAccount: StitchdataCreateAccount = new StitchdataCreateAccount();

    stitchdataCreateAccount.FirstName = RequestBody.firstname;
    stitchdataCreateAccount.LastName = RequestBody.lastname;
    stitchdataCreateAccount.Email = RequestBody.company;
    stitchdataCreateAccount.Company = RequestBody.email;

    let body = {
      "partner_id": this.stitchdata.PartnerId,
      "partner_secret": this.stitchdata.PartnerSecret,
      "first_name": stitchdataCreateAccount.FirstName,
      "last_name": stitchdataCreateAccount.LastName,
      "company": stitchdataCreateAccount.Email,
      "email": stitchdataCreateAccount.Company,
    }

    let options = {
      url: this.baseUrl(Constants.StitchdataCreateAccountURL),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: body,
      json: true
    };

    let self = this;
    await httppromise(options).then(function (response: any) {

      self.stitchdata.AccountId = response.stitch_account_id;
      self.stitchdata.Token = response.access_token;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataCreateAccountSuccess, response, body));
    }).catch(function (err: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataCreateAccountError, err, body));
    })


    return new StitchdataAccountCreationSuccessResponse(this.stitchdata, stitchdataCreateAccount);
  };


  //Here we are retrieving all the sources from new Account
  async retrievesourcesfromstitchdata(RequestBody: any) {

    let options = {
      url: this.baseUrl(Constants.StitchdataRetrieveSourcesURL),
      method: 'GET',
      headers: {
        'Authorization': RequestBody.access_token,
        'content-type': 'application/json'
      },
      json: true
    };

    let responseStitchdata;
    await httppromise(options).then(function (response: any) {

      responseStitchdata = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataRetrieveSourcesSuccess, response, options));
    }).catch(function (err: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataRetrieveSourcesError, err, options));
    })

    
    return new StitchdataGetRequestSuccessResponse(RequestBody.access_token, responseStitchdata);
  };


  //Here we are retrieving all the sources from new Account
  async retrievedestinationfromstitchdata(RequestBody: any) {

    let options = {
      url: this.baseUrl(Constants.StitchdataRetrieveDestinationsURL),
      method: 'GET',
      headers: {
        'Authorization': RequestBody.access_token,
        'content-type': 'application/json'
      },
      json: true
    };

    let responseStitchdata;
    await httppromise(options).then(function (response: any) {

      responseStitchdata = response;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataRetrieveSourcesSuccess, response, options));
    }).catch(function (err: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataRetrieveSourcesError, err, options));
    })

    return new StitchdataGetRequestSuccessResponse(RequestBody.access_token, responseStitchdata);
  };
}


export default new StitchdataHttpRequests();