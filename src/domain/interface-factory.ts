import { IHttpResponse } from '../helpers/interface-helper';

export interface IUseCaseClient {
  run(): Promise<IHttpResponse>;
  index(id: number): Promise<IHttpResponse>;
  save(body: IRequestField): Promise<IHttpResponse>;
  update(body: IRequestField, id: number): Promise<IHttpResponse>;
  Delete(id: number): Promise<IHttpResponse>;
}

export interface IUseCasePost {
  run(body: IRequestField): Promise<IHttpResponse>;
}

export interface IRequestField {
  name: string;
  password: string;
  confirmePassword?: string;
  email: string;
}

export interface IIValidationYup {
  validate(value: IRequestField): boolean;
}
export interface Ibcrypt {
  encrypt(value: string): Promise<string>;
  //decrypt(ValueField: string, passwordBD: string): Promise<string>;
}
