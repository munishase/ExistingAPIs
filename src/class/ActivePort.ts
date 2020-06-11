import { ActivePortTenant } from "./ActivePortTenant";
import { ActivePortNTU } from "./ActivePortNTU";

export class ActivePort {
    Username = "";
    Password = "";
    ActivePortTenants: ActivePortTenant[] = [];
    ActivePortNTU: ActivePortNTU[] = [];
}

