import knex from '../config/database';
import { IRequestField } from '../domain/interface-factory';
import { IUserModel } from '../models/user-model';
import { IUserRepository } from './interface-repository';

export class UseRepository implements IUserRepository {
  async userGetAll(): Promise<IUserModel[]> {
    try {
      const result = await knex('user').select('*');
      return result;
    } catch (error: any) {
      throw error;
    }
  }
  async userSave(body: IRequestField): Promise<IUserModel> {
    try {
      return await knex('user').insert(body);
    } catch (error: any) {
      throw error;
    }
  }

  async userUpdate(body: IRequestField, id: number) {
    try {
      return await knex('user').update(body).where('id', id);
    } catch (error: any) {
      throw error;
    }
  }

  async userGet(id: number): Promise<IUserModel[]> {
    try {
      return await knex('user').select().where('id', id);
    } catch (error: any) {
      throw error;
    }
  }

  async userDelete(id: number) {
    try {
      return await knex('user').select().where('id', id).del();
    } catch (error: any) {
      throw error;
    }
  }
}
