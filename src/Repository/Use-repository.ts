import knex from "../config/database";
import { IUserModel } from "../models/user-model";
import { IUserRepository } from "./interface-repository";

export class UseRepository implements IUserRepository {
  async userGetAll(): Promise<IUserModel[]> {
    try {
      const result = await knex("user").select("*");
      return result;
    } catch (error: any) {
      throw error;
    }
  }
}
