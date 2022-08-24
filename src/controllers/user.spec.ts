import { UseCaseSaveUser } from "./../domain/factory/userCase";
import module from "../domain/index";
import {
  IRequestField,
  IIValidationYup,
  Ibcrypt,
} from "src/domain/interface-factory";

const makeSutGet = async () => {
  const sut = await module.useCaseSearchAll.run();

  return { sut };
};

const validatorYup = (): IIValidationYup => {
  class ValidatorYup implements IIValidationYup {
    validate(value: IRequestField): boolean {
      return false;
    }
  }
  return new ValidatorYup();
};

const bcrypt = (): Ibcrypt => {
  class Bcrypt implements Ibcrypt {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("wwwwww"));
    }
  }
  return new Bcrypt();
};

interface ISutTypes {
  sutPost: UseCaseSaveUser;
  sutvalidatorYup: IIValidationYup;
  sutBcrypt: Ibcrypt;
}

const makeSutPost = async () => {
  const sutPost = new UseCaseSaveUser(validatorYup(), bcrypt());
  const sutvalidatorYup = validatorYup();
  const sutBcrypt = bcrypt();
  return { sutPost, sutvalidatorYup };
};

describe("FUNCIONALIDADES DE USERS GET", () => {
  test("Shold return 200 if all ok", async () => {
    const result = (await makeSutGet()).sut;
    expect(result.statusCode).toBe(200);
  });

  // test("Shold return 500 if throws", async () => {
  //   const result = (await makeSut()).sut;
  //   expect(result.statusCode).toBe(500);
  // });
});
describe("FUNCIONALIDADES DE USERS POST", () => {
  test("Shold return 400 validations incorrect", async () => {
    const { sutPost } = await makeSutPost();
    const req = {
      body: {
        name: "any_name",
        password: "any_password",
        confirmePassword: "any_confirmePassword",
        email: "any_email@any.com",
      },
    };
    const result = sutPost.run(req.body);
    expect((await result).statusCode).toBe(400);
  });
  // test("Shold return 500 if throws", async () => {
  //   const result = (await makeSut()).sut;
  //   expect(result.statusCode).toBe(500);
  // });
});
