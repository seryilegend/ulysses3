import { CreateUsersDto } from '../dto/create-users.dto';
import { UpdateUsersDto } from '../dto/update-users.dto';
import { DeleteUsersDto } from '../dto/delete-users.dto';
import { DecodedTokenDto } from '../../middleware/dto/decoded-token.dto';

export interface UsersControllerInterface {
  createUsers(
    decodedTokenDto: DecodedTokenDto,
    createUsersDto: CreateUsersDto,
  ): Promise<string>;
  updateUsers(
    decodedTokenDto: DecodedTokenDto,
    updateUsersDto: UpdateUsersDto,
  ): Promise<string>;
  deleteUsers(
    decodedTokenDto: DecodedTokenDto,
    deleteUsersDto: DeleteUsersDto,
  ): Promise<string>;
}
