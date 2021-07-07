import stringHash from 'string-hash';
import { generateRandomChars, generateRandomNumber } from '../../lib/random';

class Accounts {
  private __hashedPasscodes: Array<string | number> = [];

  constructor() {
    const passcodePool = generateListOfRandomCharacters(5)
    const hashedPasscode = hashCharList(passcodePool)
    this.__hashedPasscodes = hashedPasscode
    console.log(passcodePool)
  }

  private _findPasscodeInHashedPasscodes(passcode: string | number) {
    return this.__hashedPasscodes.find(
      (eachPasscode) => eachPasscode === passcode
    );
  }

  validatePasscode(passcode: string): boolean {
    const hashedPasscode = stringHash(passcode);

    const foundHashedPasscode = this._findPasscodeInHashedPasscodes(hashedPasscode);

    if (foundHashedPasscode) {
      return true;
    }

    return false;
  }
}

export default new Accounts();

function generateListOfRandomCharacters(poolSize: number) {
  const listOfChars = []
  for (let n = 1; n <= poolSize; n++) {
    const passcodeLength = generateRandomNumber(4, 6);
    const passcode = generateRandomChars(passcodeLength)
    listOfChars.push(passcode)
  }
  return listOfChars
}


function hashCharList(listOfChars: Array<string>) {
  const hashedChars = []
  for (let char of listOfChars) {
    hashedChars.push(stringHash(char))
  }
  return hashedChars
}