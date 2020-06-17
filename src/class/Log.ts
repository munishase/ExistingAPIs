/* eslint-disable @typescript-eslint/no-explicit-any */
import Common from './Common'
import { EnumCurrentStatus } from '../Enum/EnumCurrentStatus'
import { EnumModule } from '../Enum/EnumModule'

export class Log {
    status: EnumCurrentStatus;
    module: EnumModule;
    description: string;
    actualdetail: any;
    param: any;
    datetime: string;

    constructor(_enumCurrentStatus: EnumCurrentStatus, _enumModule: EnumModule, _description: string, _actualdetail: any, _param: any) {
        this.status = _enumCurrentStatus;
        this.module = _enumModule;
        this.description = _description;
        this.actualdetail = _actualdetail;
        this.param = _param;
        this.datetime = Common.currentDatetime();
    }
}