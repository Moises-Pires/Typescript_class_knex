import { Request, Response } from 'express';
import { serverError } from './../helpers/index';
import { IController } from './interfaceController';
import modulo from '../domain';

export class UserController implements IController {
  async searchAll(_req: Request, res: Response): Promise<Response> {
    try {
      const { body, statusCode } = await modulo.useCaseUser.run();
      return res.status(statusCode).json(body);
    } catch (error) {
      return res.status(serverError().statusCode).json(error.message);
    }
  }

  async searchUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      if (!id) res.status(400).json('parametros inválidoa');
      const { body, statusCode } = await modulo.useCaseUser.index(Number(id));
      return res.status(statusCode).json(body);
    } catch (error) {
      return res.status(serverError().statusCode).json(error.message);
    }
  }

  async saveUser(req: Request, res: Response): Promise<Response> {
    try {
      const { body, statusCode } = await modulo.useCaseUser.save(req.body);
      return res.status(statusCode).json(body);
    } catch (error) {
      return res.status(serverError().statusCode).json(error.message);
    }
  }

  async UpdateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) res.status(400).json('parametros inválidoa');
      const { body, statusCode } = await modulo.useCaseUser.update(
        req.body,
        Number(id)
      );
      return res.status(statusCode).json(body);
    } catch (error) {
      return res.status(serverError().statusCode).json(error.message);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) res.status(400).json('parametros inválidoa');
      const { body, statusCode } = await modulo.useCaseUser.Delete(Number(id));
      return res.status(statusCode).json(body);
    } catch (error) {
      return res.status(serverError().statusCode).json(error.message);
    }
  }
}
