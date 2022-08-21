import { IUserModel } from "../models/user-model";

export interface IUserRepository {
  userGetAll(): Promise<IUserModel[]>;
}
