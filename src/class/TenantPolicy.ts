export class TenantPolicy {
    UseAccountIdentitySource: string;
    AllowPlatformServices: string;
    QuotaObjectBytes: string;
    constructor() {
        this.UseAccountIdentitySource = "";
        this.AllowPlatformServices = "";
        this.QuotaObjectBytes = "";
    }
}

