import morgan, { StreamOptions } from 'morgan';

import Logger from '../lib/logger';
import { APP_ENV } from './app.config';

const stream: StreamOptions = {
  write: (message) => Logger.http(message)
};

const skip = () => {
  const env = APP_ENV;
  return env !== 'development' && env !== 'staging';
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

export default morganMiddleware;
