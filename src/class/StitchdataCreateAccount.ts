import { BaseResponse } from "./BaseResponse";
import { EnumModule } from "../Enum/EnumModule";

export class StitchdataCreateAccount extends BaseResponse {
    FirstName = "";
    LastName = "";
    Company = "";
    Email = "";
    constructor() {
        super();
        this.module = EnumModule.Stitchdata;
    }
}

