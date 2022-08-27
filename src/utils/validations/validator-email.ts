import { IIsValidEmail } from "../interface-utils";

export class ValidatorEmail implements IIsValidEmail {
  validateEmail(email: string): boolean {
    const result = /\S+@\S+\.\S/;
    return result.test(email);
  }
}
