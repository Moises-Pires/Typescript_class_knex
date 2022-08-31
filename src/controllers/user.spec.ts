import { UseRepository } from '../Repository/use-repository';
import { IIsValidEmail } from '../utils/interface-utils';
import request from 'supertest';
import app from '../app';

import {
  Ibcrypt,
  IIValidationYup,
  IRequestField,
} from '../domain/interface-factory';
import { IUserRepository } from '../Repository/interface-repository';
import { UseCaseClient } from './../domain/factory/userCase';

interface ISutTypes {
  sutRepository: IUserRepository;
  sutUser: UseCaseClient;
  sutvalidatorYup: IIValidationYup;
  sutBcrypt: Ibcrypt;
  sutValidatorEmail: IIsValidEmail;
}

export const validatorYup = (): IIValidationYup => {
  class ValidatorYup implements IIValidationYup {
    validate(value: IRequestField): boolean {
      return true;
    }
  }
  return new ValidatorYup();
};

export const bcrypt = (): Ibcrypt => {
  class Bcrypt implements Ibcrypt {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve(value + 'wwwww'));
    }
  }
  return new Bcrypt();
};

export const validatorEmail = (): IIsValidEmail => {
  class ValidatorEmail implements IIsValidEmail {
    validateEmail(email: string): boolean {
      return true;
    }
  }
  return new ValidatorEmail();
};

const makeSut = async (): Promise<ISutTypes> => {
  const sutRepository = new UseRepository();
  const sutvalidatorYup = validatorYup();
  const sutBcrypt = bcrypt();
  const sutValidatorEmail = validatorEmail();
  const sutUser = new UseCaseClient(
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
    name: 'any_name',
    password: 'any_password',
    confirmePassword: 'any_password',
    email: 'any_email@any.com',
  };
};

describe('FUNCIONALIDADES DE USERS GET', () => {
  test('Shold return 200 if all ok', async () => {
    const { sutUser } = await makeSut();
    const result = await sutUser.run();
    expect(result.statusCode).toBe(200);
  });

  test('Shold return 500 error servidor ', async () => {
    const { sutRepository, sutUser } = await makeSut();
    jest.spyOn(sutRepository, 'userGetAll').mockImplementationOnce(() => {
      throw Error();
    });
    const result = sutUser.run();
    expect((await result).statusCode).toBe(500);
  });
});

describe('FUNCIONALIDADES DE USERS POST', () => {
  test('Shold return 400 validations incorrect', async () => {
    const { sutUser } = await makeSut();
    const req = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirmePassword: 'any_confirmePassword',
        email: 'any_email@any.com',
      },
    };
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(400);
  });
  test('Shold return 400 if password different confirmPassword', async () => {
    const { sutUser } = await makeSut();
    const req = {
      body: {
        name: 'any_name',
        password: 'any_password',
        confirmePassword: '1232',
        email: 'any_email@any.com',
      },
    };
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(400);
  });

  test('Shold return 400 validationEmail incorrect', async () => {
    const { sutUser } = await makeSut();
    const req = {
      body: makeFakeRequest(),
    };
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(400);
  });
  test('Shold return 200 validationEmail correct', async () => {
    const { sutUser, sutValidatorEmail, sutvalidatorYup } = await makeSut();
    jest.spyOn(sutValidatorEmail, 'validateEmail').mockReturnValueOnce(true);
    jest.spyOn(sutvalidatorYup, 'validate').mockReturnValueOnce(true);
    const req = {
      body: makeFakeRequest(),
    };
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(200);
  });

  test('Shold return 200 when all is ok', async () => {
    const { sutUser, sutValidatorEmail, sutvalidatorYup } = await makeSut();
    jest.spyOn(sutValidatorEmail, 'validateEmail').mockReturnValueOnce(true);
    jest.spyOn(sutvalidatorYup, 'validate').mockReturnValueOnce(true);
    const req = {
      body: makeFakeRequest(),
    };
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(200);
  });

  test('Shold return a string bcrypt ', async () => {
    const { sutBcrypt } = await makeSut();

    let resultBcrypt = await sutBcrypt.encrypt('senha');
    expect(resultBcrypt).toEqual('senhawwwww');
  });

  test('Shold return 500 error servidor ', async () => {
    const { sutvalidatorYup, sutUser } = await makeSut();
    const req = {
      body: makeFakeRequest(),
    };
    jest.spyOn(sutvalidatorYup, 'validate').mockImplementationOnce(() => {
      throw Error();
    });
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(500);
  });
  test('Shold return 500 if repositore has throw error ', async () => {
    const { sutRepository, sutUser, sutValidatorEmail, sutvalidatorYup } =
      await makeSut();
    const req = {
      body: makeFakeRequest(),
    };
    jest.spyOn(sutValidatorEmail, 'validateEmail').mockReturnValueOnce(true);
    jest.spyOn(sutvalidatorYup, 'validate').mockReturnValueOnce(true);
    jest.spyOn(sutRepository, 'userSave').mockImplementationOnce(() => {
      throw Error();
    });
    const result = sutUser.save(req.body);
    expect((await result).statusCode).toBe(500);
  });

  // TESTE DE INTEGRAÇÃO
  const rotaPost = async (path: string) => {
    return await request(app).post(path).send(makeFakeRequest());
  };

  test('Shold return 400 if submit no params id ', async () => {
    const result = await request(app).get('/api/typescript/v1/search');
    expect(result.statusCode).toBe(400);
  });
});
