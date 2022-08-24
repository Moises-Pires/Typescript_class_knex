import { UseCaseClient } from "./../domain/factory/userCase";
import {
  IRequestField,
  IIValidationYup,
  Ibcrypt,
  IIValidationEmail,
} from "src/domain/interface-factory";
import { IUserRepository } from "src/Repository/interface-repository";
import { IUserModel } from "src/models/user-model";

interface ISutTypes {
  sutRepository: IUserRepository;
  sutUser: UseCaseClient;
  sutvalidatorYup: IIValidationYup;
  sutBcrypt: Ibcrypt;
  sutValidatorEmail: IIValidationEmail;
}

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
      return new Promise((resolve) => resolve(value + "wwwww"));
    }
  }
  return new Bcrypt();
};

const validatorEmail = (): IIValidationEmail => {
  class ValidatorEmail implements IIValidationEmail {
    validate(value: IRequestField): boolean {
      return false;
    }
  }
  return new ValidatorEmail();
};

const useRepository = (): IUserRepository => {
  class UseRepository implements IUserRepository {
    async userGetAll(): Promise<IUserModel[]> {
      const dados = {
        id: 1,
        name: "",
        email: "",
        password: "",
      };
      return new Promise((resolve) => resolve([dados]));
    }
  }
  return new UseRepository();
};

const makeSut = async (): Promise<ISutTypes> => {
  const sutRepository = await useRepository();
  const sutvalidatorYup = await validatorYup();
  const sutBcrypt = await bcrypt();
  const sutValidatorEmail = await validatorEmail();
  const sutUser = await new UseCaseClient(
    sutRepository,
    sutvalidatorYup,
    sutBcrypt,
    sutValidatorEmail
  );
  return {
    sutUser,
    sutvalidatorYup,
    sutBcrypt,
    sutValidatorEmail,
    sutRepository,
  };
};

const makeFakeRequest = (): IRequestField => {
  return {
    name: "any_name",
    password: "any_password",
    confirmePassword: "any_confirmePassword",
    email: "any_email@any.com",
  };
};

describe("FUNCIONALIDADES DE USERS GET", () => {
  test("Shold return 200 if all ok", async () => {
    const { sutUser } = await makeSut();
    const result = await sutUser.run();
    expect(result.statusCode).toBe(200);
  });

  test("Shold return 500 error servidor ", async () => {
    const { sutRepository, sutUser } = await makeSut();
    const req = {
      body: makeFakeRequest(),
    };
    jest.spyOn(sutRepository, "userGetAll").mockImplementationOnce(() => {
      throw Error();
    });
    const result = sutUser.run();
    expect((await result).statusCode).toBe(500);
  });
});

describe("FUNCIONALIDADES DE USERS POST", () => {
  test("Shold return 400 validations incorrect", async () => {
    const { sutUser } = await makeSut();
    const req = {
      body: {
        name: "any_name",
        password: "any_password",
        confirmePassword: "any_confirmePassword",
        email: "any_email@any.com",
      },
    };
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(400);
  });

  test("Shold return 400 validationEmail incorrect", async () => {
    const { sutUser } = await makeSut();
    const req = {
      body: makeFakeRequest(),
    };
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(400);
  });
  test("Shold return 200 validationEmail correct", async () => {
    const { sutUser, sutValidatorEmail, sutvalidatorYup } = await makeSut();
    jest.spyOn(sutValidatorEmail, "validate").mockReturnValueOnce(true);
    jest.spyOn(sutvalidatorYup, "validate").mockReturnValueOnce(true);
    const req = {
      body: makeFakeRequest(),
    };
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(200);
  });

  test("Shold return a string bcrypt ", async () => {
    const { sutBcrypt } = await makeSut();

    let resultBcrypt = await sutBcrypt.encrypt("senha");
    expect(resultBcrypt).toEqual("senhawwwww");
  });

  test("Shold return 500 error servidor ", async () => {
    const { sutvalidatorYup, sutUser } = await makeSut();
    const req = {
      body: makeFakeRequest(),
    };
    jest.spyOn(sutvalidatorYup, "validate").mockImplementationOnce(() => {
      throw Error();
    });
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(500);
  });
});
