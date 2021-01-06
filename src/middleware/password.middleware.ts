import bcrypt = require('bcryptjs');
import { PasswordMiddlewareInterface } from './interface/password-middleware.interface';

export class PasswordMiddleware implements PasswordMiddlewareInterface {
  private readonly bcryptSalt: number = 12;
  public async generateHashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.bcryptSalt);
  }
  public async compare(
    openPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(openPassword, hashedPassword);
  }
}
