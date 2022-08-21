import { ServerParamsError } from "../errors/Server-error";
import { IHttpResponse } from "./interface-helper";

export const statusOk = (data: any): IHttpResponse => {
  return {
    body: data,
    statusCode: 200,
  };
};

export const serverError = (): IHttpResponse => {
  return {
    body: new ServerParamsError(),
    statusCode: 500,
  };
};
