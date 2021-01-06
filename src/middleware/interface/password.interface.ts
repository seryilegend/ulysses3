export interface PasswordInterface {
  generateHashedPassword(password: string): Promise<string>;
  doPasswordsMatch(
    openPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
