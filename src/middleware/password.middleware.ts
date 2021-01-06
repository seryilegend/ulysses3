import bcrypt = require('bcryptjs');
import { PasswordInterface } from './interface/password.interface';

export class passwordMiddleware implements PasswordInterface {
  private readonly bcryptSalt: number = 12;
  public async generateHashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.bcryptSalt);
  }
  public async doPasswordsMatch(
    openPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(openPassword, hashedPassword);
  }
}
