APIs

For Invoronment changes, just set environment as below
Windows
set NODE_ENV=production
Linux
export NODE_ENV=production

Default it will pick environment as development. This code is in base layer




Prerequisite
1) Docker installation
2) As a POC, currently below are the base address in use to communicate with Activeport and Xcloud. We can change these in config and need further testing on changes.
Activeport:          https://54.206.35.7
Xcloud:              http://demo2.xcloudnetworks.com


How to run
Right now docker image publically accessible. Below is the command that you can use to deploy docker image.

docker run -p 5001:3000 munishsinghal/fluid:latest

3000 - port used by docker internal to host the API
5001 – use this port to call APIs, you can change any available port number here.

Once it is deployed then you can call the below URL to see all Activeport API hosted/available. 
http://localhost:5001/swagger


Example Request for API

/createntuasync

Switchportid in below request is pcw, that is required to access switchport details in xcloud.
{
  "switchportid": 802,
  "autoRollback": true,
  "burstTime": 5,
  "configBackup": true,
  "defaultRate": 100,
  "enableBod": false,
  "endpoint": "string",
  "firmwareVersion": "15.1X49-D130",
  "ipAddress": "10.1.1.1",
  "loIp": "10.1.1.254",
  "serviceConfigurationId": 31,
  "maxRate": 1000,
  "minRate": 100,
  "mode": "EDGE",
  "ntutypeId": 1,
  "restEnabled": true,
  "restPassword": "Must be a valid password containing at less 6 characters!, one uppercase, one number and one spe",
  "restUsername": "rest",
  "secondUplinkPort": "ge-0/0/5",
  "serialNumber": "CV28T7WF24SA",
  "tenantId": "89640bd4-550e-4f6d-a38a-432e37ed35b2",
  "timeZone": "Australia/Perth",
  "uplinkPort": "ge-0/0/6",
  "internetPort": false,
  "jumbo": true,
  "mac": "testing mac",
  "portSpeed": "Auto",
  "portType": "ETHERNET",
  "trunk": true
}


What will it do internally
Step1) It will look for existing switch in xcloud with provided switchportid(pcw) in above request.
Step2) It will create a NTU in Activeport
Step3) It will create a NTU in Activeport with reference to NTU created in Step2
Step4) It will return below output to user
{
  "module": "fluid",
  "ipAddress": "10.1.1.1",
  "name": "sw12-nyc-swp8(swp8)@sw12-nyc",
  "ntutypeId": 1,
  "uplinkPort": "ge-0/0/6",
  "internetPort": false,
  "jumbo": true,
  "label": "sw12-nyc-swp8(swp8)@sw12-nyc",
  "mac": "testing mac",
  "portSpeed": "Auto",
  "portType": "ETHERNET",
  "trunk": true
}
Anywhere in above steps, if there is any issue then it will through error.
