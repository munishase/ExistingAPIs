import express from 'express';
import Router from './api/router';
import swaggerUi from 'swagger-ui-express';
import * as mainSwaggerDocument from '../swagger/openapi.json';
import * as fluidSwaggerDocument from '../swagger/openapi_fluid.json';
import * as bodyParser from 'body-parser';
import config from 'config';

class App {
  private express = express();

  constructor(port: number | string) {

    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());

    new Router(this.express);

    const swaggerDocument = (config.get("swagger") as any).config === "fluid" ? fluidSwaggerDocument : mainSwaggerDocument;
    this.express.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.express.listen(port, () => console.log(`Server running on port ${port}`));
  }
}

new App(process.env.PORT || 4000);
