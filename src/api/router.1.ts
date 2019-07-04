import express = require('express');
import StorageGridHttpRequests from './Services/StorageGridHttpRequests';
import { Tenant } from './class/Tenant';
var cors = require('cors')
import { AuthenticationMiddleware } from './Services/AuthenticationMiddleware'

class Router {

  constructor(server: express.Express) {
    const router = express.Router();

    //enable cors
    router.use(cors())
    router.use(AuthenticationMiddleware);

    router.get('/', (req, res) => {
      res.json({
        message: 'Yes you just started'
      })
    });
    /*
        router.get('/demo', (req, res) => {
          res.json({
            message: 'This is only for demo purpose by Munish'
          })
        });
    
        
            router.get('/testit', (req, res) => {
              console.log(req.params.tenantname);
              StorageGridHttpRequests.retreiveIlmCriteria().then(function(response){
                res.json({response});
              });
            });
        
    
        let tenant: Tenant = new Tenant();
        router.get('/createstoragetenantaccount', (req, res) => {
          StorageGridHttpRequests.createTenantAccount('tenantname').then(function (response) {
            res.json({ tenant });
          });
        });
    
        router.get('/deletestoragetenantaccount/:tenantId', (req, res) => {
          StorageGridHttpRequests.deleteTenantAccount(req.params.tenantId).then(function (response) {
            res.json({ tenant });
          });
        });
    
        router.get('/createkey', (req, res) => {
          StorageGridHttpRequests.createKeysforNewlyCreatedTenantAccount().then(function (response) {
            tenant = response;
            res.json({ response });
          });
        });
    
    
        router.post('/createbucket', (req, res) => {
          StorageGridHttpRequests.createBucketForTenant('bucketname').then(function (response) {
            res.json({ response });
          });
        });
    */

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

      StorageGridHttpRequests.processStorageGrid(req.body, res).then(function (response) {
        return response;
        //res.json({ response });
      });
    });




    server.use('/', router);
  }

};

export default Router;