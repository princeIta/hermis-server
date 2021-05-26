import {
  Request as IExpressRequest,
  Response as IExpressResponse,
  NextFunction as ExpressNextFunction
} from 'express';
import { JWT_TOKEN_SECRET } from '../config/app.config';

import {
  checkExpirationStatus,
  DecodeResult,
  decodeSession,
  encodeSession,
  ExpirationStatus,
  Session
} from '../lib/session';

export function httpAuthMiddleware(
  request: IExpressRequest,
  response: IExpressResponse,
  next: ExpressNextFunction
) {
  const unauthorized = (message: string) =>
    response.status(401).json({
      name: 'UnAuthorizedError',
      statusCode: 401,
      message: message
    });

  const requestHeader = 'X-JWT-Token';
  const responseHeader = 'X-Renewed-JWT-Token';
  const header = request.header(requestHeader);

  if (!header) {
    unauthorized(`Required ${requestHeader} header not found.`);
    return;
  }

  const decodedSession: DecodeResult = decodeSession(JWT_TOKEN_SECRET, header);

  if (
    decodedSession.type === 'integrity-error' ||
    decodedSession.type === 'invalid-token'
  ) {
    unauthorized(
      `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`
    );
    return;
  }

  const expiration: ExpirationStatus = checkExpirationStatus(
    decodedSession.session
  );

  if (expiration === 'expired') {
    unauthorized(
      `Authorization token has expired. Please create a new authorization token.`
    );
    return;
  }

  let session: Session;

  if (expiration === 'grace') {
    // Automatically renew the session and send it back with the response
    const { token, expires, issued } = encodeSession(
      JWT_TOKEN_SECRET,
      decodedSession.session
    );
    session = {
      ...decodedSession.session,
      expires: expires,
      issued: issued
    };

    response.setHeader(responseHeader, token);
  } else {
    session = decodedSession.session;
  }

  response.locals = {
    ...response.locals,
    session: session
  };

  next();
}
