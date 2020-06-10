import { NetsuiteCredentials } from '../class/NetsuiteCredentials';
import { BaseLayer } from './BaseLayer';


export class NetsuiteBaseLayer extends BaseLayer {

    protected netsuiteCredentials: NetsuiteCredentials = new NetsuiteCredentials();

    //initialize all required params
    constructor() {
        super();
        this.netsuiteCredentials.AccountNumber = this.environmentConfig.Netsuite.AccountNumber;
        this.netsuiteCredentials.Username = this.environmentConfig.Netsuite.Username;
        this.netsuiteCredentials.Password = this.environmentConfig.Netsuite.Password;
        this.netsuiteCredentials.RoleId = this.environmentConfig.Netsuite.RoleId;
    }

    //return the full url
    baseUrl(url: string): string {
        return this.environmentConfig.Netsuite.Urls.BaseUrl + url;
    }

    //return header for netsuite
    header(): any {
        return {
            'Authorization': "NLAuth nlauth_account=" + this.netsuiteCredentials.AccountNumber + ", nlauth_email=" + this.netsuiteCredentials.Username + ", nlauth_signature="
                + this.netsuiteCredentials.Password + ", nlauth_role=" + this.netsuiteCredentials.RoleId,
            'Content-Type': 'application/json'
        };
    }

}