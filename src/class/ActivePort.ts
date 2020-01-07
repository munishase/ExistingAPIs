import { ActivePortTenant } from "./ActivePortTenant";
import { ActivePortNTU } from "./ActivePortNTU";

export class ActivePort {
    Username: string;
    Password: string;
    ActivePortTenants: ActivePortTenant[];
    ActivePortNTU: ActivePortNTU[];
    constructor() {
        this.Username = "";
        this.Password = "";
        this.ActivePortTenants = [];
        this.ActivePortNTU = [];
    }
}

