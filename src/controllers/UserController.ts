import { Request, Response } from "express";
import { serverError, statusOk } from "./../helpers/index";
import { IHttpResponse } from "../helpers/interface-helper";
import { IController } from "./interfaceController";
import modulo from "../domain";

export class UserController implements IController {
  async searchAll(req: Request, res: Response): Promise<Response> {
    try {
      const { body, statusCode } = await modulo.useCaseSearchAll.run();
      return res.status(statusCode).json(body);
    } catch (error) {
      return res.status(serverError().statusCode).json(error.message);
    }
  }
}
