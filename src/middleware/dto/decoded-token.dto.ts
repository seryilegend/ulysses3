import { Role } from '../role.enum';

export class DecodedTokenDto {
  readonly userId: string;
  readonly role: Role;
}
