import express = require('express');
import ServicesWrapper from '../Services/ServicesWrapper';
import cors from 'cors';
import { Authentication } from '../Services/Authentication'
import { EnumSessionForEachRequest } from '../Enum/EnumSessionForEachRequest';
import { EnumAPIs } from '../Enum/EnumAPIs';
import sessionstorage from 'sessionstorage';
import { v4 as uuidv4 } from 'uuid';

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

      const token = new Authentication().Authorize(req.body.username, req.body.password);
      res.json({ token });
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
      if (!req.body.virtualNetworkName) {
        return res.status(400).send({
          message: 'virtualNetworkName is required.'
        });
      }
      else if (!req.body.owner) {
        return res.status(400).send({
          message: 'owner is required.'
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
      return ServicesWrapper.addnewcircuitforxcloud(req.body, res);
    });


    // router.put('/updateexistingcircuit', (req, res) => {
    //   return ServicesWrapper.updateexistingcircuitforxcloud(req.body, res);
    // });


    // router.put('/validateexistingcircuit', (req, res) => {
    //   return ServicesWrapper.validateexistingcircuitforxcloud(req.body, res);
    // });


    // router.delete('/deletecircuit', (req, res) => {
    //   if (!req.body.id) {
    //     return res.status(400).send({
    //       message: 'name is required.'
    //     });
    //   }
    //   else if (!req.body.owner) {
    //     return res.status(400).send({
    //       message: 'owner is required.'
    //     });
    //   }

    //   if (!req.body.members) {
    //     return res.status(400).send({
    //       message: 'members is required.'
    //     });
    //   }
    //   else {
    //     req.body.members.forEach(function (value: any) {
    //       if (!value.id) {
    //         return res.status(400).send({
    //           message: 'members.id is required.'
    //         });
    //       }
    //       else if (!value.port_id) {
    //         return res.status(400).send({
    //           message: 'members.port_id is required.'
    //         });
    //       }
    //       else if (!value.vlan_id) {
    //         return res.status(400).send({
    //           message: 'members.vlan_id is required.'
    //         });
    //       }

    //       else if (!value.member_state) {
    //         return res.status(400).send({
    //           message: 'members.member_state is required.'
    //         });
    //       }
    //     });
    //   }


    //   return ServicesWrapper.deletecircuitforxcloud(req.body, res);
    // });


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
    router.post('/createcircuitasync', (req, res) => {

      //initiate session for new uuid
      this.initiateSession(EnumAPIs.createsubnetasync);
      return ServicesWrapper.createcircuitasync(req.body, res);
    });

    server.use('/', router);
  }

  initiateSession(apiname: string): void {
    if (sessionstorage.getItem(EnumSessionForEachRequest.UUID) != null)
      sessionstorage.removeItem(EnumSessionForEachRequest.UUID);

    if (sessionstorage.getItem(EnumSessionForEachRequest.ApiName) != null)
      sessionstorage.removeItem(EnumSessionForEachRequest.ApiName);

    sessionstorage.setItem(EnumSessionForEachRequest.UUID, uuidv4())
    sessionstorage.setItem(EnumSessionForEachRequest.ApiName, apiname)
  }

}

export default Router;