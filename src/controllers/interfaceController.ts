import { Request, Response } from "express";
import { IHttpResponse } from "../helpers/interface-helper";

export interface IController {
  searchAll(req: Request, res: Response): Promise<Response>;
  saveUser(req: Request, res: Response): Promise<Response>;
}
