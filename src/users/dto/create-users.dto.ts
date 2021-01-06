import { Role } from '../../middleware/role.enum';

type User = {
  readonly userName: string;
  readonly password: string;
  readonly role: Role;
};

export class CreateUsersDto {
  readonly users: User[];
}
