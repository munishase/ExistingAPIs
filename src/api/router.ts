import express = require('express');
import ServicesWrapper from '../Services/ServicesWrapper';
var cors = require('cors')
import { Authentication } from '../Services/Authentication'
import { AuthenticationMiddleware } from '../Services/AuthenticationMiddleware'
import {  EnumSessionForEachRequest } from '../Enum/EnumSessionForEachRequest';
import { EnumAPIs } from '../Enum/EnumAPIs';
var sessionstorage = require('sessionstorage');
const { v4: uuidv4 } = require('uuid');

class Router {

  constructor(server: express.Express) {
    const router = express.Router();

    //enable cors
    router.use(cors())
    //temp removed below
    //router.use(new AuthenticationMiddleware().verifyAuthentication);

    router.get('/demo', (req, res) => {
      res.json({
        message: 'Yes you just started'
      })
    });


    router.post('/authenticate', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (!req.body.username) {
        return res.status(400).send({
          message: 'Username is required'
        });
      } else if (!req.body.password) {
        return res.status(400).send({
          message: 'Password is required'
        });
      }

      new Authentication().Authorize(req.body.username, req.body.password).then(function (response) {
        res.json({ 'token': response });
      });
    });


    router.post('/processstoragegrid', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (!req.body.tenantname) {
        return res.status(400).send({
          message: 'Tenant Name is required'
        });
      } else if (!req.body.bucketname) {
        return res.status(400).send({
          message: 'Bucket Name is required'
        });
      }

      return ServicesWrapper.createStorageGridTanent(req.body, res);
    });


    router.post('/processveeam', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (!req.body.name) {
        return res.status(400).send({
          message: 'Veeam Name is required'
        });
      } else if (!req.body.username) {
        return res.status(400).send({
          message: 'Veeam username is required'
        });
      }
      else if (!req.body.vmsbackedup) {
        return res.status(400).send({
          message: 'Veeam vmsbackedup is required'
        });
      }
      else if (!req.body.vmsbackeduptocloud) {
        return res.status(400).send({
          message: 'Veeam vmsbackeduptocloud is required'
        });
      } else if (!req.body.managedphysicalservers) {
        return res.status(400).send({
          message: 'Veeam managedphysicalservers is required'
        });
      }

      return ServicesWrapper.createVeeam(req.body, res);
    });


    //this is to create netsuite client, not displaying directly to UI
    router.post('/createnetsuiteclient', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (!req.body.clientname) {
        return res.status(400).send({
          message: 'Client Name is required'
        });
      } else if (!req.body.acn) {
        return res.status(400).send({
          message: 'ACN number is required'
        });
      }
      return ServicesWrapper.createNetsuiteClient(req.body, res);
    });


    router.post('/processrequest', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (!req.body.clientname) {
        return res.status(400).send({
          message: 'Client Name is required'
        });
      } else if (!req.body.acn) {
        return res.status(400).send({
          message: 'ACN number is required'
        });
      }
      else if (!req.body.clientname) {
        return res.status(400).send({
          message: 'Client Name is required'
        });
      } else if (!req.body.acn) {
        return res.status(400).send({
          message: 'ACN number is required'
        });
      }
      else if (!req.body.acn) {
        return res.status(400).send({
          message: 'Address is required'
        });
      }
      else if (!req.body.vmsbackedup) {
        return res.status(400).send({
          message: 'Veeam vmsbackedup is required'
        });
      }
      else if (!req.body.vmsbackeduptocloud) {
        return res.status(400).send({
          message: 'Veeam vmsbackeduptocloud is required'
        });
      } else if (!req.body.managedphysicalservers) {
        return res.status(400).send({
          message: 'Veeam managedphysicalservers is required'
        });
      }

      return ServicesWrapper.processrequestAsync(req.body, res);
    });


    router.post('/generatetokenforexistingstitchdataaccount', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (!req.body.stitch_auth_code) {
        return res.status(400).send({
          message: 'STITCH AUTHORIZATION CODE is required.'
        });
      }
      return ServicesWrapper.generateTokenForExistingStitchdataAccount(req.body, res);
    });


    router.post('/registeraccountforstitchdata', (req, res) => {

      res.header("Access-Control-Allow-Origin", "*");
      if (!req.body.firstname) {
        return res.status(400).send({
          message: 'First Name is required.'
        });
      }
      else if (!req.body.lastname) {
        return res.status(400).send({
          message: 'Last Name is required.'
        });
      }
      else if (!req.body.company) {
        return res.status(400).send({
          message: 'Company name is required.'
        });
      }
      else if (!req.body.email) {
        return res.status(400).send({
          message: 'Email address is required.'
        });
      }
      return ServicesWrapper.registerAccountForStitchdata(req.body, res);

    });


    router.post('/retrievesourcesfromstitchdata', (req, res) => {

      res.header("Access-Control-Allow-Origin", "*");
      if (!req.body.access_token) {
        return res.status(400).send({
          message: 'Access Token is required.'
        });
      }

      return ServicesWrapper.retrievesourcesfromstitchdata(req.body, res);
    });


    router.post('/retrievedestinationfromstitchdata', (req, res) => {

      if (!req.body.access_token) {
        return res.status(400).send({
          message: 'Access Token is required.'
        });
      }
      return ServicesWrapper.retrievedestinationfromstitchdata(req.body, res);
    });


    router.get('/retrievetenantsforactiveport', (req, res) => {

      return ServicesWrapper.retrievetenantsforactiveport(req.body, res);
    });


    router.post('/createnewtenantforactiveport', (req, res) => {

      if (!req.body.description) {
        return res.status(400).send({
          message: 'Description is required.'
        });
      }
      else if (!req.body.name) {
        return res.status(400).send({
          message: 'Name is required.'
        });
      }
      else if (!req.body.tiles) {
        return res.status(400).send({
          message: 'tiles is required.'
        });
      }
      return ServicesWrapper.createnewtenantforactiveport(req.body, res);
    });


    router.put('/updateexistingtenantforactiveport', (req, res) => {

      if (!req.body.description) {
        return res.status(400).send({
          message: 'Description is required.'
        });
      }
      else if (!req.body.name) {
        return res.status(400).send({
          message: 'Name is required.'
        });
      }
      else if (!req.body.tiles) {
        return res.status(400).send({
          message: 'tiles is required.'
        });
      }
      else if (!req.body.id) {
        return res.status(400).send({
          message: 'Id is required.'
        });
      }
      else if (!req.body.tenantId) {
        return res.status(400).send({
          message: 'Tenant Id is required.'
        });
      }
      return ServicesWrapper.updateexistingtenantforactiveport(req.body, res);
    });

    router.get('/retrieveclustersfromnetapp', (req, res) => {

      return ServicesWrapper.retrieveclustersfromnetapp(req.body, res);
    });


    router.post('/createnkscluster', (req, res) => {
      return ServicesWrapper.createnkscluster(req.body, res);
    });


    router.delete('/deletenkscluster/:clusterid', (req, res) => {
      if (!req.params.clusterid) {
        return res.status(400).send({
          message: 'Cluster id is required.'
        });
      }
      return ServicesWrapper.deletenkscluster(req.body, res);
    });


    router.get('/listdataikudatasets/:projectkey', (req, res) => {
      if (!req.params.projectkey) {
        return res.status(400).send({
          message: 'Project key is required.'
        });
      }
      return ServicesWrapper.listdataikudatasets(req.query, res);
    });


    router.post('/createdatasetfordataiku', (req, res) => {
      if (!req.body.projectKey) {
        return res.status(400).send({
          message: 'Project key is required.'
        });
      }
      return ServicesWrapper.createdatasetfordataiku(req.body, res);
    });


    router.post('/createmanageddatasetfordataiku', (req, res) => {
      if (!req.body.projectKey) {
        return res.status(400).send({
          message: 'Project key is required.'
        });
      }
      return ServicesWrapper.createmanageddatasetfordataiku(req.body, res);
    });


    router.get('/retrieveallntu', (req, res) => {

      return ServicesWrapper.retrieveallntu(req.query, res);
    });


    router.get('/retrieventubyid/:ntuid', (req, res) => {
      if (!req.params.ntuid) {
        return res.status(400).send({
          message: 'NTU id is required.'
        });
      }
      return ServicesWrapper.retrieventubyid(req.params, res);
    });


    router.post('/createnewntuforactiveport', (req, res) => {

      return ServicesWrapper.createnewntuforactiveport(req.body, res);
    });


    router.put('/updatentuforactiveport', (req, res) => {

      if (!req.body.id) {
        return res.status(400).send({
          message: 'id is required.'
        });
      }
      else if (!req.body.name) {
        return res.status(400).send({
          message: 'name is required.'
        });
      }
      else if (!req.body.timeZone) {
        return res.status(400).send({
          message: 'timeZone is required.'
        });
      }
      else if (!req.body.maxRate) {
        return res.status(400).send({
          message: 'maxRate is required.'
        });
      }
      else if (!req.body.minRate) {
        return res.status(400).send({
          message: 'minRate is required.'
        });
      }
      else if (!req.body.defaultRate) {
        return res.status(400).send({
          message: 'defaultRate is required.'
        });
      }
      else if (!req.body.burstTime) {
        return res.status(400).send({
          message: 'burstTime is required.'
        });
      }
      else if (!req.body.uplinkPort) {
        return res.status(400).send({
          message: 'uplinkPort is required.'
        });
      }
      else if (!req.body.serialNumber) {
        return res.status(400).send({
          message: 'serialNumber is required.'
        });
      }
      else if (!req.body.ipAddress) {
        return res.status(400).send({
          message: 'ipAddress is required.'
        });
      }
      else if (!req.body.loIp) {
        return res.status(400).send({
          message: 'loIp is required.'
        });
      }
      else if (!req.body.endpoint) {
        return res.status(400).send({
          message: 'endpoint is required.'
        });
      }
      else if (!req.body.restUsername) {
        return res.status(400).send({
          message: 'restUsername is required.'
        });
      }
      else if (!req.body.restPassword) {
        return res.status(400).send({
          message: 'restPassword is required.'
        });
      }
      else if (!req.body.mode) {
        return res.status(400).send({
          message: 'mode is required.'
        });
      }
      else if (!req.body.ntutypeId) {
        return res.status(400).send({
          message: 'ntutypeId is required.'
        });
      }

      return ServicesWrapper.updatentuforactiveport(req.body, res);
    });


    router.delete('/deletentubyid/:ntuid', (req, res) => {
      if (!req.params.ntuid) {
        return res.status(400).send({
          message: 'NTU id is required.'
        });
      }
      return ServicesWrapper.deletentubyid(req.params, res);
    });


    router.post('/createnewntuportforactiveport', (req, res) => {

      if (!req.body.ntuId) {
        return res.status(400).send({
          message: 'ntuId is required.'
        });
      }
      else if (!req.body.description) {
        return res.status(400).send({
          message: 'description is required.'
        });
      }
      /* else if (!req.body.internetPort) {
         return res.status(400).send({
           message: 'internetPort is required.'
         });
       }
       else if (!req.body.jumbo) {
         return res.status(400).send({
           message: 'jumbo is required.'
         });
       }*/
      else if (!req.body.label) {
        return res.status(400).send({
          message: 'label is required.'
        });
      }
      else if (!req.body.mac) {
        return res.status(400).send({
          message: 'mac is required.'
        });
      }
      else if (!req.body.name) {
        return res.status(400).send({
          message: 'name is required.'
        });
      }
      else if (!req.body.portSpeed) {
        return res.status(400).send({
          message: 'portSpeed is required.'
        });
      }
      else if (!req.body.portType) {
        return res.status(400).send({
          message: 'portType is required.'
        });
      }
      else if (!req.body.trunk) {
        return res.status(400).send({
          message: 'trunk is required.'
        });
      }

      return ServicesWrapper.createnewntuportforactiveport(req.body, res);
    });

    router.get('/getallcircuits', (req, res) => {
      return ServicesWrapper.getallcircuits(req.params, res);
    });


    router.post('/addnewcircuit', (req, res) => {
      if (!req.body.name) {
        return res.status(400).send({
          message: 'name is required.'
        });
      }
      else if (!req.body.owner) {
        return res.status(400).send({
          message: 'owner is required.'
        });
      }
      else if (!req.body.state) {
        return res.status(400).send({
          message: 'state is required.'
        });
      }
      else if (!req.body.provisioning) {
        return res.status(400).send({
          message: 'provisioning is required.'
        });
      }
      else if (!req.body.sites) {
        return res.status(400).send({
          message: 'sites is required.'
        });
      }
      else if (!req.body.tenants) {
        return res.status(400).send({
          message: 'tenants is required.'
        });
      }
      else if (!req.body.gateways) {
        return res.status(400).send({
          message: 'gateways is required.'
        });
      }
      else if (!req.body.members) {
        return res.status(400).send({
          message: 'members is required.'
        });
      }
      else if (!req.body.mac_address) {
        return res.status(400).send({
          message: 'mac_address is required.'
        });
      }
      else if (!req.body.sites_id) {
        return res.status(400).send({
          message: 'sites_id is required.'
        });
      }
      else if (!req.body.sites_name) {
        return res.status(400).send({
          message: 'sites_name is required.'
        });
      }
      else if (!req.body.tenants_id) {
        return res.status(400).send({
          message: 'tenants_id is required.'
        });
      }
      else if (!req.body.tenants_name) {
        return res.status(400).send({
          message: 'tenants_name is required.'
        });
      }
      else if (!req.body.circuitTenants) {
        return res.status(400).send({
          message: 'circuitTenants is required.'
        });
      }

      return ServicesWrapper.addnewcircuitforxcloud(req.body, res);
    });


    router.put('/updateexistingcircuit', (req, res) => {
      return ServicesWrapper.updateexistingcircuitforxcloud(req.body, res);
    });


    router.put('/validateexistingcircuit', (req, res) => {
      return ServicesWrapper.validateexistingcircuitforxcloud(req.body, res);
    });


    router.delete('/deletecircuit', (req, res) => {
      if (!req.body.id) {
        return res.status(400).send({
          message: 'name is required.'
        });
      }
      else if (!req.body.owner) {
        return res.status(400).send({
          message: 'owner is required.'
        });
      }

      if (!req.body.members) {
        return res.status(400).send({
          message: 'members is required.'
        });
      }
      else {
        req.body.members.forEach(function (value: any) {
          if (!value.id) {
            return res.status(400).send({
              message: 'members.id is required.'
            });
          }
          else if (!value.port_id) {
            return res.status(400).send({
              message: 'members.port_id is required.'
            });
          }
          else if (!value.vlan_id) {
            return res.status(400).send({
              message: 'members.vlan_id is required.'
            });
          }

          else if (!value.member_state) {
            return res.status(400).send({
              message: 'members.member_state is required.'
            });
          }
        });
      }


      return ServicesWrapper.deletecircuitforxcloud(req.body, res);
    });


    router.get('/retrieveswitchportbyid/:switchportid', (req, res) => {

      if (!req.params.switchportid) {
        return res.status(400).send({
          message: 'switchportid is required.'
        });
      }
      return ServicesWrapper.retrieveswitchportbyid(req.params, res);
    });


    //fluid
    router.post('/createntuasync', (req, res) => {

      if (!req.body.switchportid) {
        return res.status(400).send({
          message: 'switchportid is required.'
        });
      }
      else if (!req.body.burstTime) {
        return res.status(400).send({
          message: 'burstTime is required.'
        });
      }
      else if (!req.body.defaultRate) {
        return res.status(400).send({
          message: 'defaultRate is required.'
        });
      }
      else if (!req.body.endpoint) {
        return res.status(400).send({
          message: 'endpoint is required.'
        });
      }
      else if (!req.body.firmwareVersion) {
        return res.status(400).send({
          message: 'firmwareVersion is required.'
        });
      }
      else if (!req.body.ipAddress) {
        return res.status(400).send({
          message: 'ipAddress is required.'
        });
      }
      else if (!req.body.loIp) {
        return res.status(400).send({
          message: 'loIp is required.'
        });
      }
      else if (!req.body.serviceConfigurationId) {
        return res.status(400).send({
          message: 'serviceConfigurationId is required.'
        });
      }
      else if (!req.body.maxRate) {
        return res.status(400).send({
          message: 'maxRate is required.'
        });
      }
      else if (!req.body.minRate) {
        return res.status(400).send({
          message: 'minRate is required.'
        });
      }
      else if (!req.body.mode) {
        return res.status(400).send({
          message: 'mode is required.'
        });
      }
      else if (!req.body.ntutypeId) {
        return res.status(400).send({
          message: 'ntutypeId is required.'
        });
      }
      else if (!req.body.restPassword) {
        return res.status(400).send({
          message: 'restPassword is required.'
        });
      }
      else if (!req.body.restUsername) {
        return res.status(400).send({
          message: 'restUsername is required.'
        });
      }
      else if (!req.body.secondUplinkPort) {
        return res.status(400).send({
          message: 'secondUplinkPort is required.'
        });
      }
      else if (!req.body.serialNumber) {
        return res.status(400).send({
          message: 'serialNumber is required.'
        });
      }
      else if (!req.body.tenantId) {
        return res.status(400).send({
          message: 'tenantId is required.'
        });
      }
      else if (!req.body.timeZone) {
        return res.status(400).send({
          message: 'timeZone is required.'
        });
      }
      else if (!req.body.uplinkPort) {
        return res.status(400).send({
          message: 'uplinkPort is required.'
        });
      }
      else if (!req.body.mac) {
        return res.status(400).send({
          message: 'mac is required.'
        });
      }


      else if (!req.body.portSpeed) {
        return res.status(400).send({
          message: 'portSpeed is required.'
        });
      }
      else if (!req.body.portType) {
        return res.status(400).send({
          message: 'portType is required.'
        });
      }

      //initiate session for new uuid
      this.initiateSession(EnumAPIs.createntuasync);
      return ServicesWrapper.createntuasync(req.body, res);
    });


    //fluid
    router.post('/createclouddxasync', (req, res) => {

      if (!req.body.name) {
        return res.status(400).send({
          message: 'name is required.'
        });
      }
      else if (!req.body.serviceConfigurationId) {
        return res.status(400).send({
          message: 'serviceConfigurationId is required.'
        });
      }
      else if (!req.body.ntuId) {
        return res.status(400).send({
          message: 'ntuId is required.'
        });
      }
      else if (!req.body.description) {
        return res.status(400).send({
          message: 'description is required.'
        });
      }
      else if (!req.body.type) {
        return res.status(400).send({
          message: 'type is required.'
        });
      }
      else if (!req.body.remotePortUuid) {
        return res.status(400).send({
          message: 'remotePortUuid is required.'
        });
      }
      else if (!req.body.accountId) {
        return res.status(400).send({
          message: 'accountId is required.'
        });
      }
      else if (!req.body.rateLimit) {
        return res.status(400).send({
          message: 'rateLimit is required.'
        });
      }
      else if (!req.body.hostedType) {
        return res.status(400).send({
          message: 'hostedType is required.'
        });
      }
      else if (!req.body.awsType) {
        return res.status(400).send({
          message: 'awsType is required.'
        });
      }

      else if (!req.body.downLinkPort) {
        return res.status(400).send({
          message: 'downLinkPort is required.'
        });
      }

      //initiate session for new uuid
      this.initiateSession(EnumAPIs.createclouddxasync);
      return ServicesWrapper.createawscircuitasync(req.body, res);
    });

    server.use('/', router);
  }

  initiateSession(apiname: string) {
    if (sessionstorage.getItem(EnumSessionForEachRequest.UUID) != null)
      sessionstorage.removeItem(EnumSessionForEachRequest.UUID);

    if (sessionstorage.getItem(EnumSessionForEachRequest.ApiName) != null)
      sessionstorage.removeItem(EnumSessionForEachRequest.ApiName);

    sessionstorage.setItem(EnumSessionForEachRequest.UUID, uuidv4())
    sessionstorage.setItem(EnumSessionForEachRequest.ApiName, apiname)
  }

};

export default Router;