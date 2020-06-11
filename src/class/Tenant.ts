import { Bucket } from './Bucket'
import { TenantPolicy } from './TenantPolicy';

export class Tenant {
    AccountId = "";
    AccessKey = "";
    SecretAccessKey = "";
    Name = "";
    UserPassword = "";
    Capabilities: string[] = [];
    Policy: TenantPolicy = new TenantPolicy();
    Cookie = "";
    CsrfToken = "";
    Bucket: Bucket = new Bucket();
}
