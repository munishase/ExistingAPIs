import httppromise, { Options } from 'got';
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

    try {
      const response: any = await this.authorizeStitchdata(this.stitchdata);
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataAuthError, response, ""));
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataAuthSuccess, err, ""));
    }

    return new StitchdataAccountAuthorizationSuccessResponse(this.stitchdata);
  }


  //Here we are creating tenant Account
  //prerequisite: Storage Grid Token in Header
  async registerAccountForStitchdata(RequestBody: any) {

    this.assignStitchdataEssentials();

    const body = {
      "partner_id": this.stitchdata.PartnerId,
      "partner_secret": this.stitchdata.PartnerSecret,
      "first_name": RequestBody.firstname,
      "last_name": RequestBody.lastname,
      "company": RequestBody.company,
      "email": RequestBody.email,
    }

    const options: Options = {
      url: this.baseUrl(Constants.StitchdataCreateAccountURL),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      json: body
    };

    try {
      const response: any = await httppromise(options);
      this.stitchdata.AccountId = response.stitch_account_id;
      this.stitchdata.Token = response.access_token;
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataCreateAccountSuccess, response, body));
      return new StitchdataAccountAuthorizationSuccessResponse(this.stitchdata);
    } catch (err) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataCreateAccountError, err, body));
    }
    
  }

}


export default new StitchdataHttpRequests();