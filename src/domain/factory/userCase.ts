import { IHttpResponse } from "./../../helpers/interface-helper";
import { statusOk } from "./../../helpers/index";
import { IUserRepository } from "../../Repository/interface-repository";
import { IUseCaseUser } from "../interface-factory";

export class UseCaseUser implements IUseCaseUser {
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
