import { Tenant } from "./Tenant";

export class StorageGrid {
    Username: string;
    Password: string;
    Cookie: string;
    CsrfToken: string;
    S3_Bucket_Name: string;
    Tenant: Tenant;
    constructor() {
        this.Username = "";
        this.Password = "";
        this.Cookie = "";
        this.CsrfToken = "";
        this.S3_Bucket_Name = "";
        this.Tenant = new Tenant();
    }
}

