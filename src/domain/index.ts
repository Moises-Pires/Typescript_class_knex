import { ValidatorEmail } from "./../utils/validations/validator-email";
import { Bcrypt } from "./../utils/Bcript";
import { ValidatorYup } from "./../utils/validations/Validator-yup";

import { UseRepository } from "../Repository/use-repository";
import { UseCaseClient } from "./factory/userCase";

const userRepository = new UseRepository();
const validatorYup = new ValidatorYup();
const bcrypt = new Bcrypt();
const validatorEmail = new ValidatorEmail();

const modulo = {
  useCaseUser: new UseCaseClient(
    userRepository,
    validatorYup,
    bcrypt,
    validatorEmail
  ),
};

export default modulo;
