import ErrorBase from './base.error';
import { APP_ENV } from '../config/app.config';
import Logger from '../lib/logger';

export interface BaseError extends ErrorBase {}

const envIsDev: boolean = APP_ENV === 'development';
const envIsProd: boolean = APP_ENV === 'production';
const envIsStaging: boolean = APP_ENV === 'staging';

function handleDevError(err: BaseError) {
  err.name = err.name || 'InternalServerError';
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Sorry an unexpected error has occured';

  Logger.error(`${err.message}: ${err.stack}`);

  return err;
}

function handleProdError(err: BaseError) {
  if (!err.isOperational) {
    err.name = err.name || 'InternalServerError';
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Sorry an unexpected error has occured';
  }

  const { stack, ...error } = err;

  return error;
}

export default function error(err: BaseError) {
  if (envIsDev || envIsStaging) {
    return handleDevError(err);
  }

  if (envIsProd) {
    return handleProdError(err);
  }
}
