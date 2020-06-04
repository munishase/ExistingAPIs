import express from 'express';
import Router from './api/router';
import swaggerUi from 'swagger-ui-express';
import * as mainSwaggerDocument from '../swagger/openapi.json';
import * as fluidSwaggerDocument from '../swagger/openapi_fluid.json';
import * as bodyParser from 'body-parser';
const cors = require('cors');
const config = require('../config.json');

class App {
  private httpServer: any

  constructor() {

    this.httpServer = express()

    this.httpServer.use(bodyParser.urlencoded({ extended: true }));
    this.httpServer.use(bodyParser.json());

    new Router(this.httpServer);

    let swaggerDocument;
    if (config["common"].swagger == "fluid")
      swaggerDocument = fluidSwaggerDocument
    else
      swaggerDocument = mainSwaggerDocument

    this.httpServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  }


  public Start = (port: number) => {

    return new Promise((resolve, reject) => {
      this.httpServer.listen(port, () => {
        resolve(port)
      }).on('error', (err: object) => reject(err));
    })
  }
}

export default App;
