export interface PasswordMiddlewareInterface {
  generateHashedPassword(password: string): Promise<string>;
  compare(openPassword: string, hashedPassword: string): Promise<boolean>;
}
