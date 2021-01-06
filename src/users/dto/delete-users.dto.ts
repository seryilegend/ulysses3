type User = {
  readonly userName: string;
};

export class DeleteUsersDto {
  readonly users: User[];
}
