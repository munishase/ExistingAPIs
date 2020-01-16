const httppromise = require('request-promise');
var sessionstorage = require('sessionstorage');
import { Log } from '../class/Log'
import { Logger } from '../class/Logger'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import Constants from '../class/Constants'
import { EnumModule } from '../Enum/EnumModule';
import { XcloudBaseLayer } from './XcloudBaseLayer';
import { EnumToken } from '../Enum/EnumToken';
import { response } from 'express';

export class XcloudHttpRequests extends XcloudBaseLayer {

    constructor() {
        super();
    }


    //Here we are retriving all ntu
    //prerequisite: Xcloud Token in Header
    async getallcircuits(requestBody: any) {

        if (await this.isAuthorized() == false)
            return;


        let options = {
            url: "http://demo2.xcloudnetworks.com/api/circuit",
            method: 'GET',
            headers: {
                'Cookie': sessionstorage.getItem(EnumToken.XcloudCookie),
                'content-type': 'application/json'
            },
            json: true
        };
        let self = this;
        let result;
        await httppromise(options).then(function (response: any) {
            //self.activePort.ActivePortNTU = response;
            result = response;
            Logger.updateLogs(new Log(EnumCurrentStatus.Success, EnumModule.ActivePort, Constants.ActivePortNTUSuccess, response, ''));
        }).catch(function (err: any) {

            Logger.updateLogs(new Log(EnumCurrentStatus.Error, EnumModule.ActivePort, Constants.ActivePortNTUError, err, ''));
        })

        //return new ActivePortNtuRetrieveSuccessResponse(this.activePort.ActivePortNTU);
        return result;
    };


}


export default new XcloudHttpRequests();