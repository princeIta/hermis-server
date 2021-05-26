import helmet from 'helmet';
import cors from 'cors';
import express, { Application as ExpressApp } from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import morganMiddleware from '../config/morgan-middleware.config';
import appRoutes from '../routes/app.route';
import wrongRouteHandler from '../middlewares/wrong-route.middleware';
import errorHandler from '../middlewares/error.middleware';

const swaggerDocument = YAML.load(path.resolve('.', 'src', 'swagger.yaml'));

export default function (app: ExpressApp) {
  app.use(cors());
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use(morganMiddleware);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use('/api/v1', appRoutes);
  app.use(wrongRouteHandler);
  app.use(errorHandler);
}
