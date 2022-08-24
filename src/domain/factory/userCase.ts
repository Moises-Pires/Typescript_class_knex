import { InvalidParamsError } from "./../../errors/Invalid-params-error";
import { IHttpResponse } from "./../../helpers/interface-helper";
import { badRequest, serverError, statusOk } from "./../../helpers/index";
import { IUserRepository } from "../../Repository/interface-repository";
import {
  IUseCaseClient,
  IIValidationYup,
  Ibcrypt,
  IRequestField,
  IIValidationEmail,
} from "../interface-factory";

export class UseCaseClient implements IUseCaseClient {
  private readonly repository: IUserRepository;
  private readonly validatorEmail;
  private readonly validationYup;
  private readonly bcrypt;
  constructor(
    repository: IUserRepository,
    validationYup: IIValidationYup,
    bcrypt: Ibcrypt,
    validatorEmail: IIValidationEmail
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

  async save(body: IRequestField): Promise<IHttpResponse> {
    try {
      const validationField = this.validationYup.validate(body);

      if (validationField === false) {
        return badRequest(new InvalidParamsError("Fieds invalidos"));
      }

      const EmailValido = this.validatorEmail.validate(body?.email);

      if (EmailValido === false) {
        return badRequest(new InvalidParamsError("Email"));
      }

      const passwordBcrypt = this.bcrypt.encrypt(body?.password);

      return statusOk(body);
    } catch (error: any) {
      return serverError();
    }
  }
}
