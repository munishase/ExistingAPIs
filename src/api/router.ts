import express = require('express');
import ServicesWrapper from '../Services/ServicesWrapper';
var cors = require('cors')
import { Authentication } from '../Services/Authentication'

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


    server.use('/', router);
  }

};

export default Router;