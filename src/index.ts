import express from 'express';

import loadExpress from './loaders/express';
import terminate from './lib/terminate';
import Logger from './lib/logger';
import { PORT } from './config/app.config';

const app = express();

loadExpress(app);

const server = app.listen(PORT, () => {
  Logger.debug('Server running on port ' + PORT);
});

const exitHandler = terminate(server, {
  coredump: false,
  timeout: 500
});

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));
