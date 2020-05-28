export class XcloudSubnet {
    module: string;
    assignmentId: number;
    allocationId: number;
    name: string;
    cidr: string;
    selectedSite: number;
    selectedTenant: string;
    selectedType: string;
    ipVersion: string;
    
    constructor() {
        this.module = "xcloudSubnet";
        this.assignmentId = 0;
        this.allocationId = 0;
        this.name = "";
        this.cidr = "";
        this.selectedSite = 0;
        this.selectedTenant = "";
        this.selectedType = "";
        this.ipVersion = "IPv4";
    }

    convertToXcloudSubnetObject(xcloudSubnetObject: any): XcloudSubnet{
        this.module = "xcloudSubnet";
        this.assignmentId = xcloudSubnetObject.assignmentId;
        this.allocationId = xcloudSubnetObject.allocationId;
        this.name = xcloudSubnetObject.name;
        this.cidr = xcloudSubnetObject.cidr;
        this.selectedSite = xcloudSubnetObject.selectedSite;
        this.selectedTenant = xcloudSubnetObject.selectedTenant;
        this.selectedType = xcloudSubnetObject.selectedType;
        this.ipVersion = xcloudSubnetObject.ipVersion;
        return xcloudSubnetObject;
    }
}