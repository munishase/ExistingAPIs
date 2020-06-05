export class XcloudSubnet {
    module = "xcloudSubnet";
    assignmentId = 0;
    allocationId = 0;
    name = "";
    cidr = "";
    selectedSite = 0;
    selectedTenant = "";
    selectedType = "";
    ipVersion = "IPv4";

    convertToXcloudSubnetObject(xcloudSubnetObject: XcloudSubnet): XcloudSubnet {
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