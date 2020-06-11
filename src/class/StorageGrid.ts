import { Tenant } from "./Tenant";

export class StorageGrid {
    Username = "";
    Password = "";
    Cookie = "";
    CsrfToken = "";
    S3_Bucket_Name = "";
    Tenant: Tenant = new Tenant();
}

