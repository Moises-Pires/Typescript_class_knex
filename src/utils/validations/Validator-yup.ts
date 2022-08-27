import * as yup from "yup";

import { IRequestField } from "src/domain/interface-factory";
import { IValidatorYup } from "../interface-utils";

export class ValidatorYup implements IValidatorYup {
  validate(): {} {
    const yupValidationUser = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(2),
      confirmePassword: yup.string().required().min(2),
    });

    return yupValidationUser;
  }
}
