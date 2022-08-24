import { InvalidParamsError } from "./../../errors/Invalid-params-error";
import { IHttpResponse } from "./../../helpers/interface-helper";
import { badRequest, statusOk } from "./../../helpers/index";
import { IUserRepository } from "../../Repository/interface-repository";
import {
  IUseCaseGet,
  IUseCasePost,
  IIValidationYup,
  Ibcrypt,
  IRequestField,
} from "../interface-factory";

export class UseCaseGetUser implements IUseCaseGet {
  private readonly repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository;
  }
  async run(): Promise<IHttpResponse> {
    try {
      const result = await this.repository.userGetAll();
      return statusOk(result);
    } catch (error: any) {
      throw error;
    }
  }
}

export class UseCaseSaveUser implements IUseCasePost {
  private readonly validationYup;
  private readonly bcrypt;
  constructor(validationYup: IIValidationYup, bcrypt: Ibcrypt) {
    this.validationYup = validationYup;
    this.bcrypt = bcrypt;
  }

  async run(body: IRequestField): Promise<IHttpResponse> {
    try {
      const validationField = this.validationYup.validate(body);

      if (validationField === false) {
        return badRequest(new InvalidParamsError("Fieds invalidos"));
      }

      const passwordBcrypt = this.bcrypt.encrypt(body?.password);

      return;
    } catch (error: any) {
      throw error;
    }
  }
}
