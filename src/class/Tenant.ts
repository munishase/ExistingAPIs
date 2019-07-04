import { Bucket } from './Bucket'
import { TenantPolicy } from './TenantPolicy';

export class Tenant {
    AccountId: string;
    AccessKey: string;
    SecretAccessKey: string;
    Name: string;
    UserPassword: string;
    Capabilities: string[];
    Policy: TenantPolicy;
    Cookie: string;
    CsrfToken: string;
    Bucket: Bucket;

    constructor() {
        this.AccountId = "";
        this.AccessKey = "";
        this.SecretAccessKey = "";
        this.Name = "";
        this.UserPassword = "";
        this.Capabilities = [];
        this.Policy = new TenantPolicy();
        this.Cookie = "";
        this.CsrfToken = "";
        this.Bucket = new Bucket();
    }
}

