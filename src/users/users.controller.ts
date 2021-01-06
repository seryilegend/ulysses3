import { Controller, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersControllerInterface } from './interface/users-controller.interface';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { DeleteUsersDto } from './dto/delete-users.dto';
import { RolesGuard } from '../middleware/roles.guard';
import { Roles } from '../middleware/roles.decorator';
import { Role } from '../middleware/role.enum';
import { DecodedToken } from '../middleware/decoded-token.decorator';
import { DecodedTokenDto } from '../middleware/dto/decoded-token.dto';

@Controller('users')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class UsersController implements UsersControllerInterface {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  createUsers(
    @DecodedToken() decodedTokenDto: DecodedTokenDto,
    createUsersDto: CreateUsersDto,
  ): Promise<string> {
    try {
      return this.usersService.createUsers(decodedTokenDto, createUsersDto);
    } catch (e) {
      throw e;
    }
  }
  @Patch()
  updateUsers(
    @DecodedToken() decodedTokenDto: DecodedTokenDto,
    updateUsersDto: UpdateUsersDto,
  ): Promise<string> {
    try {
      return this.usersService.updateUsers(decodedTokenDto, updateUsersDto);
    } catch (e) {
      throw e;
    }
  }
  @Delete()
  deleteUsers(
    @DecodedToken() decodedTokenDto: DecodedTokenDto,
    deleteUsersDto: DeleteUsersDto,
  ): Promise<string> {
    try {
      return this.usersService.deleteUsers(decodedTokenDto, deleteUsersDto);
    } catch (e) {
      throw e;
    }
  }
}
