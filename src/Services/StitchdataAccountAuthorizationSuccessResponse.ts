const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { StitchdataBaseLayer } from './StitchdataBaseLayer'
import { StitchdataAccountAuthorizationSuccessResponse } from '../class/Response/StitchdataAccountAuthorizationSuccessResponse'
import { EnumModule } from '../Enum/EnumModule';


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


  //Here we are creating tenant Account
  //prerequisite: Storage Grid Token in Header
  async registerAccountForStitchdata(RequestBody: any) {

    this.assignStitchdataEssentials();

    let body = {
      "partner_id": this.stitchdata.PartnerId,
      "partner_secret": this.stitchdata.PartnerSecret,
      "first_name": RequestBody.firstname,
      "last_name": RequestBody.lastname,
      "company": RequestBody.company,
      "email": RequestBody.email,
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


    return new StitchdataAccountAuthorizationSuccessResponse(this.stitchdata);
  };
}


export default new StitchdataHttpRequests();