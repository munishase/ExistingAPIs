// import config from 'config';
import AWS from 'aws-sdk';

export class AWSService {

    private directConnect = new AWS.DirectConnect({ region: 'ap-southeast-2' });

    public async getDirectConnectGateways() {
        return this.directConnect.describeDirectConnectGateways().promise();
    }

    public async getConnectionIdForName(dxName: string, state = "available") {
        const { connections } = await this.directConnect.describeConnections({}).promise();

        if (connections && connections.length) {
            const connection = connections
                .find((connection) => connection.connectionName === dxName && connection.connectionState === state);
            if (connection) {
                return connection;
            } else {
                throw new Error('DX Connection not found or is in wrong state.');
            }
        } else {
            throw new Error('No DX Connections retrieved.');
        }

    }

    public async confirmDirectConnection(dxName: string) {
        try {
            const connection = await this.getConnectionIdForName(dxName, "ordering");
            const params = { connectionId: connection.connectionId || "" };
            return await this.directConnect.confirmConnection(params).promise();
        } catch (err) {
            throw new Error('DX Connection not found or is in wrong state.');
        }
    }

    public async createVIF(input: any) {
        const connection = await this.getConnectionIdForName(input.name);

        const params: AWS.DirectConnect.Types.CreatePrivateVirtualInterfaceRequest = {
            connectionId: connection.connectionId || "",
            newPrivateVirtualInterface: {
                asn: 64800, // XCloud - /api/sites `asn`
                virtualInterfaceName: `${input.name} - VIF`,
                vlan: connection.vlan || 0,
                addressFamily: 'ipv4',
                directConnectGatewayId: input.directConnectGatewayId,
            }
        };
        return await this.directConnect.createPrivateVirtualInterface(params).promise();
    }

}
