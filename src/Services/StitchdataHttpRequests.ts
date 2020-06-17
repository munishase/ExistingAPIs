import httppromise, { Options } from 'got';
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
import { StitchdataRegistrationRequest, StitchdataBaseAccessRequest, StitchdataTokenRequest } from '../types/StitchdataRequests';

class StitchdataHttpRequests extends StitchdataBaseLayer {

  constructor() {
    super();
  }

  //Here we are generating token for existing account
  async generateTokenForExistingStitchdataAccount(requestBody: StitchdataTokenRequest) {

    this.removeToken();
    this.stitchdata.AuthorizationCode = requestBody.stitch_auth_code;
    try {
      const response: any = await this.authorizeStitchdata(this.stitchdata);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataAuthError, response as any, ""));
      return new StitchdataAccountAuthorizationSuccessResponse(this.stitchdata);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataAuthSuccess, err, ""));
    }

  }


  //Here we are creating new Account
  async registerAccountForStitchdata(requestBody: StitchdataRegistrationRequest) {

    this.assignStitchdataEssentials();
    const stitchdataCreateAccount = new StitchdataCreateAccount();

    stitchdataCreateAccount.FirstName = requestBody.firstname;
    stitchdataCreateAccount.LastName = requestBody.lastname;
    stitchdataCreateAccount.Email = requestBody.email;
    stitchdataCreateAccount.Company = requestBody.company;

    const body = {
      "partner_id": this.stitchdata.PartnerId,
      "partner_secret": this.stitchdata.PartnerSecret,
      "first_name": stitchdataCreateAccount.FirstName,
      "last_name": stitchdataCreateAccount.LastName,
      "company": stitchdataCreateAccount.Company,
      "email": stitchdataCreateAccount.Email,
    }

    const options: Options = {
      url: this.baseUrl(Constants.StitchdataCreateAccountURL),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      json: body,
      responseType: 'json'
    };

    try {
      const response: any = await httppromise(options)
      this.stitchdata.AccountId = response.stitch_account_id;
      this.stitchdata.Token = response.access_token;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataCreateAccountSuccess, response, body));
      return new StitchdataAccountCreationSuccessResponse(this.stitchdata, stitchdataCreateAccount);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataCreateAccountError, err, body));
    }

  }

  //Here we are retrieving all the sources from new Account
  async retrievesourcesfromstitchdata(requestBody: StitchdataBaseAccessRequest) {

    const options: Options = {
      url: this.baseUrl(Constants.StitchdataRetrieveSourcesURL),
      method: 'GET',
      headers: {
        'Authorization': requestBody.access_token,
        'content-type': 'application/json'
      },
      responseType: 'json'
    };
    try {
      const response: any = await httppromise(options)
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataRetrieveSourcesSuccess, response, options));
      return new StitchdataGetRequestSuccessResponse(requestBody.access_token, response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataRetrieveSourcesError, err, options));
    }

  }

  //Here we are retrieving all the sources from new Account
  async retrievedestinationfromstitchdata(requestBody: StitchdataBaseAccessRequest) {

    const options: Options = {
      url: this.baseUrl(Constants.StitchdataRetrieveDestinationsURL),
      method: 'GET',
      headers: {
        'Authorization': requestBody.access_token,
        'content-type': 'application/json'
      },
      responseType: 'json'
    };

    try {
      const response: any = await httppromise(options);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataRetrieveSourcesSuccess, response, options));
      return new StitchdataGetRequestSuccessResponse(requestBody.access_token, response);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataRetrieveSourcesError, err, options));
    }

  }

}

export default new StitchdataHttpRequests();