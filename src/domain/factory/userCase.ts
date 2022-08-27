import { InvalidParamsError } from './../../errors/Invalid-params-error';
import { IHttpResponse } from './../../helpers/interface-helper';
import { badRequest, serverError, statusOk } from './../../helpers/index';
import { IUserRepository } from '../../Repository/interface-repository';
import { IUseCaseClient, IRequestField } from '../interface-factory';
import {
  IBcriptEncrypt,
  IIsValidEmail,
  IValidatorYup,
} from 'src/utils/interface-utils';

export class UseCaseClient implements IUseCaseClient {
  private readonly repository;
  private readonly validatorEmail;
  private readonly validationYup;
  private readonly bcrypt;
  constructor(
    repository: IUserRepository,
    validationYup: IValidatorYup,
    bcrypt: IBcriptEncrypt,
    validatorEmail: IIsValidEmail
  ) {
    this.repository = repository;
    this.validatorEmail = validatorEmail;
    this.validationYup = validationYup;
    this.bcrypt = bcrypt;
  }

  async run(): Promise<IHttpResponse> {
    try {
      const result = await this.repository.userGetAll();
      return statusOk(result);
    } catch (error: any) {
      return serverError();
    }
  }

  async index(id: number): Promise<IHttpResponse> {
    try {
      const result = await this.repository.userGet(id);
      return statusOk(result);
    } catch (error: any) {
      return serverError();
    }
  }

  async save(body: IRequestField): Promise<IHttpResponse> {
    try {
      const validationField = await this.validationYup.validate().isValid(body);

      if (validationField === false) {
        return badRequest(new InvalidParamsError('Fieds invalidos'));
      }

      const EmailValido = this.validatorEmail.validateEmail(body?.email);

      if (EmailValido === false) {
        return badRequest(new InvalidParamsError('Email'));
      }

      if (body?.password !== body?.confirmePassword)
        return badRequest(
          new InvalidParamsError('Password diferente de confirmePassword')
        );

      const passwordBcrypt = await this.bcrypt.encrypt(body?.password);

      const { confirmePassword, ...newBody } = body;
      const bodyCorrect = { ...newBody, password: passwordBcrypt };
      const resultRepository = await this.repository.userSave(bodyCorrect);

      return statusOk(resultRepository);
    } catch (error: any) {
      return serverError();
    }
  }

  async update(body: IRequestField, id: number): Promise<IHttpResponse> {
    try {
      const result = await this.repository.userUpdate(body, id);
      return statusOk(result);
    } catch (error: any) {
      return serverError();
    }
  }

  async Delete(id: number): Promise<IHttpResponse> {
    try {
      const result = await this.repository.userDelete(id);
      return statusOk(result);
    } catch (error: any) {
      return serverError();
    }
  }
}
