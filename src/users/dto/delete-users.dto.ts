type User = {
  readonly userName: string;
};

export class DeleteUsersDto {
  password: string;
  readonly users: User[];
}
