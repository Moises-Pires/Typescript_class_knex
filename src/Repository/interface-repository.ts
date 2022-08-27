import { IRequestField } from '../domain/interface-factory';
import { IUserModel } from '../models/user-model';

export interface IUserRepository {
  userGetAll(): Promise<IUserModel[]>;
  userSave(body: IRequestField): Promise<IUserModel>;
  userUpdate(body: IRequestField, id: number);
  userGet(id: number): Promise<IUserModel[]>;
  userDelete(id: number);
}

export interface IUseRepositorySut {
  userGetAll(): Promise<IUserModel[]>;
  userSave(_body: IRequestField): Promise<IUserModel>;
}
