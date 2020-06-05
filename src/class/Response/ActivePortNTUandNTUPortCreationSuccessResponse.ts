import { EnumModule } from '../../Enum/EnumModule'
import { BaseResponse } from '../BaseResponse'

export class ActivePortNTUandNTUPortCreationSuccessResponse extends BaseResponse {
    ntuId: number;
    ipAddress: string;
    ioIp: string;
    name: string;
    ntutypeId: string;
    uplinkPort: string;
    NtuPortIdid:string;
    internetPort:string;
    jumbo:string;
    label:string;
    mac:string;
    portSpeed:string;
    portType:string;
    trunk:string;

    //it will create one response of activeport ntu and ntu port creation and simplify that response
    constructor(activeportNTUandNTUPortResponse: any) {
        super();

        //extract seperate NTU and NTU response and assign to simplify response 
        const activeportNtuResponse = (activeportNTUandNTUPortResponse[0].module == "ActivePort - NTU") ? activeportNTUandNTUPortResponse[0] : activeportNTUandNTUPortResponse[1];
        const activeportNtuPortResponse = (activeportNTUandNTUPortResponse[0].module == "ActivePort - NTU Port") ? activeportNTUandNTUPortResponse[0] : activeportNTUandNTUPortResponse[1];
        
        this.module = EnumModule.fluid;
        this.ntuId = activeportNtuResponse.ntuId;
        this.ipAddress = activeportNtuResponse.ipAddress;
        this.ioIp = activeportNtuResponse.ioIp;
        this.name = activeportNtuResponse.name;
        this.ntutypeId = activeportNtuResponse.ntutypeId;
        this.uplinkPort = activeportNtuResponse.uplinkPort;

        this.NtuPortIdid = activeportNtuPortResponse.NtuPortIdid;
        this.internetPort = activeportNtuPortResponse.internetPort;
        this.jumbo = activeportNtuPortResponse.jumbo;
        this.label = activeportNtuPortResponse.label;
        this.mac = activeportNtuPortResponse.mac;
        this.portSpeed = activeportNtuPortResponse.portSpeed;
        this.portType = activeportNtuPortResponse.portType;
        this.trunk = activeportNtuPortResponse.trunk;
    }
}

