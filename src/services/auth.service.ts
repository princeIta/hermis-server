import users from '../datasources/gateway/inmemory-users.gateway';
import AppError from '../errors/app.error';
import Result from '../lib/result';
import { encodeSession } from '../lib/session';
import { JWT_TOKEN_SECRET } from '../config/app.config';

class AuthService {
  login(passcode: string) {
    const isValidPasscode = users.validatePasscode(passcode);

    if (isValidPasscode) {
      const token = encodeSession(JWT_TOKEN_SECRET, {
        dateCreated: Date.now()
      });
      return Result.ok(token);
    } else {
      return Result.fail(
        new AppError({
          message: 'invalid passcode',
          name: 'AuthenticationError',
          statusCode: 400
        })
      );
    }
  }
}

export default AuthService;
