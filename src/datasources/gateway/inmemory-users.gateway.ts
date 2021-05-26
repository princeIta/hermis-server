import stringHash from 'string-hash';

class Accounts {
  private __hashedPasscodes: Array<string | number> = [1529302569];

  private _findPasscodeInHashPool(passcode: string | number) {
    return this.__hashedPasscodes.find(
      (eachPasscode) => eachPasscode === passcode
    );
  }

  validatePasscode(passcode: string): boolean {
    const hashedPasscode = stringHash(passcode);

    const foundHashedPasscode = this._findPasscodeInHashPool(hashedPasscode);

    if (foundHashedPasscode) {
      return true;
    }

    return false;
  }
}

export default new Accounts();
