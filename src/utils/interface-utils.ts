import { IRequestField } from "src/domain/interface-factory";

export interface IValidatorYup {
  validate(value: IRequestField): {};
}

export interface IIsValidEmail {
  validateEmail(email: string): boolean;
}

export interface IBcriptEncrypt {
  encrypt(value: string): Promise<string>;
}
export interface IBcriptDecrypt {
  decrypt(valueDigitado: string, valueBanco: string): Promise<boolean>;
}
