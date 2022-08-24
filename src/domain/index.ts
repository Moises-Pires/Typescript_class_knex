import { UseRepository } from "../Repository/use-repository";
import { UseCaseGetUser, UseCaseSaveUser } from "./factory/userCase";

const userRepository = new UseRepository();

const modulo = {
  useCaseSearchAll: new UseCaseGetUser(userRepository),
  //useCaseSaveUser: new UseCaseSaveUser();
};

export default modulo;
