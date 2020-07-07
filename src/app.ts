import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as mainSwaggerDocument from '../swagger/openapi.json';
import * as fluidSwaggerDocument from '../swagger/openapi_fluid.json';
import * as bodyParser from 'body-parser';
import config from 'config';
import { FluidRouter } from './api/fluid';

class App {
  private express = express();

  constructor(port: number | string) {
    const swaggerConfig = config.get("swagger") as { config: string };

    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());

    this.express.use('/fluid', new FluidRouter().router);

    // new Router(this.express);

    const swaggerDocument = swaggerConfig.config === "fluid" ? fluidSwaggerDocument : mainSwaggerDocument;
    this.express.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.express.listen(port, () => console.log(`Server running on port ${port}`));
  }
}

new App(process.env.PORT || 4000);
