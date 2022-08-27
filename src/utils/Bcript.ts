import bcrypt from "bcrypt";
import { IBcriptEncrypt } from "./interface-utils";

export class Bcrypt implements IBcriptEncrypt {
  async encrypt(value: string): Promise<string> {
    return bcrypt.hashSync(value, 1);
  }

  async decrypt(valueDigitado: string, valueBanco: string): Promise<boolean> {
    return bcrypt.compare(valueDigitado, valueBanco);
  }
}
