import { ActivePortTenant } from "./ActivePortTenant";

export class ActivePort {
    Username: string;
    Password: string;
    ActivePortTenants: ActivePortTenant[];
    constructor() {
        this.Username = "";
        this.Password = "";
        this.ActivePortTenants = [];
    }
}

