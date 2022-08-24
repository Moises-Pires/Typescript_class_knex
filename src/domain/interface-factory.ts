import { IHttpResponse } from "../helpers/interface-helper";

export interface IUseCaseGet {
  run(): Promise<IHttpResponse>;
}

export interface IUseCasePost {
  run(body: IRequestField): Promise<IHttpResponse>;
}

export interface IRequestField {
  name: string;
  password: string;
  confirmePassword: string;
  email: string;
}

export interface IIValidationYup {
  validate(value: IRequestField): boolean;
}

export interface Ibcrypt {
  encrypt(value: string): Promise<string>;
  //decrypt(ValueField: string, passwordBD: string): Promise<string>;
}
