import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'
import { Veeam } from '../Veeam';

export class VeeamSuccessResponse extends BaseResponse {
    id: string;
    name: string;
    userName: string;
    password: string;

    constructor(veeam: Veeam) {
        super();
        this.module = EnumModule.Veeam;
        this.id = veeam.Id;
        this.name = veeam.Name;
        this.userName = veeam.Username;
        this.password = veeam.Password;
    }
}

