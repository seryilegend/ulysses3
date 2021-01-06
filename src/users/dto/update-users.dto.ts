import { Role } from '../../middleware/role.enum';

type ParamsToUpdate = {
  readonly newUserName?: string;
  readonly newPassword?: string;
  readonly newRole?: Role;
};

type User = {
  readonly userName: string;
  readonly paramsToUpdate: ParamsToUpdate;
};

export class UpdateUsersDto {
  password: string;
  readonly users: User[];
}
