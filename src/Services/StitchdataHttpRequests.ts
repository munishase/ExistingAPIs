const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import Common from '../class/Common';
import { StitchdataBaseLayer } from './StitchdataBaseLayer'
import { StitchdataSuccessResponse } from '../class/StitchdataSuccessResponse'
import { EnumModule } from '../Enum/EnumModule';
import { EnumToken } from '../Enum/EnumToken';

class StitchdataHttpRequests extends StitchdataBaseLayer {

  constructor() {
    super();
  }

  //Here we are creating tenant Account
  //prerequisite: Storage Grid Token in Header
  async stitchdataToken(RequestBody: any) {

    this.removeToken();
    this.stitchdata.AuthorizationCode = RequestBody.stitch_auth_code;
    let self = this;
    await this.authorizeStitchdata(self.stitchdata).then(function (response: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.Stitchdata, Constants.StitchdataAuthError, response, ""));
    }).catch(function (err: any) {
      Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.Stitchdata, Constants.StitchdataAuthSuccess, err, ""));
    });

    return new StitchdataSuccessResponse(this.stitchdata);
  };

}


export default new StitchdataHttpRequests();