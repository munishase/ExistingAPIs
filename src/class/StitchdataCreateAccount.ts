import { BaseResponse } from "./BaseResponse";
import { EnumModule } from "../Enum/EnumModule";

export class StitchdataCreateAccount extends BaseResponse  {
    FirstName: string;
    LastName: string;
    Company: string;
    Email: string;
    constructor() {
        super();
        this.module = EnumModule.Stitchdata;
        this.FirstName = "";
        this.LastName = "";
        this.Company = ""
        this.Email = ""
    }
}

