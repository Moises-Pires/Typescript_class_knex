import { IHttpResponse } from "../helpers/interface-helper";
import { IUserModel } from "./../models/user-model";

export interface IUseCaseUser {
  run(): Promise<IHttpResponse>;
}
