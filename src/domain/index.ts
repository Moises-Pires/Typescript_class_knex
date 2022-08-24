import { UseRepository } from "../Repository/use-repository";
import { UseCaseClient } from "./factory/userCase";

const userRepository = new UseRepository();

const modulo = {
  //useCaseSearchAll: new UseCaseClient(userRepository),
  //useCaseSaveUser: new UseCaseSaveUser();
};

export default modulo;
