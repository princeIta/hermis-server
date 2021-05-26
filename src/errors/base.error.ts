export default class BaseError extends Error {
  statusCode?: number;
  errMessage?: string;
  isOperational: boolean;

  constructor({
    name,
    statusCode,
    message,
    isOperational
  }: {
    name: string;
    statusCode: number;
    message: string;
    isOperational: boolean;
  }) {
    super(message);

    if (name) {
      this.name = name;
    }
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (message) {
      this.errMessage = message;
    }
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
