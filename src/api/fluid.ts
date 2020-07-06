import express = require('express');
import { AWSDirectConnectFlow } from '../Services/flows/AWSDirectConnectFlow';

export class FluidRouter {
  private awsDirectConnectFlow = new AWSDirectConnectFlow();
  public router = express.Router();

  constructor() {

    this.router.post('/clouddx', async (req, res) => {

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

      await this.awsDirectConnectFlow.createFluidDX(req.body);
      res.send(200);
    });

  }

}