import { UseRepository } from "../Repository/use-repository";
import { UseCaseUser } from "./factory/userCase";

const userRepository = new UseRepository();

const modulo = {
  useCaseSearchAll: new UseCaseUser(userRepository),
};

export default modulo;
