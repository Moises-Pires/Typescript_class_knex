export class InvalidParamsError extends Error {
  constructor(paramName: string) {
    super(`Parametros inválidos: ${paramName}`);
    this.name = "MissingParamError" + " " + paramName;
  }
}
