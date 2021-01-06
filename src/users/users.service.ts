import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersServiceInterface } from './interface/users-service.interface';
import { School, SchoolDocument } from '../schemas/School.schema';
import { User, UserDocument } from '../schemas/User.schema';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { DeleteUsersDto } from './dto/delete-users.dto';
import { DecodedTokenDto } from '../middleware/dto/decoded-token.dto';
import { passwordMiddleware } from '../middleware/password.middleware';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async createUsers(
    { userId }: DecodedTokenDto,
    { users }: CreateUsersDto,
  ): Promise<string> {
    const admin: UserDocument = await this.userModel.findById(userId);
    const school: SchoolDocument = admin.school;
    for (const { userName, password, role } of users) {
      const candidate: UserDocument = await this.userModel.findOne({
        userName,
      });
      if (!candidate) {
        const hashedPassword: string = await passwordMiddleware.generatePassword(
          password,
        );
        const user: UserDocument = new this.userModel({
          school,
          userName,
          password: hashedPassword,
          role,
        });
        await user.save();
      }
    }
    return ``;
  }
  async updateUsers(
    decodedTokenDto: DecodedTokenDto,
    updateUsersDto: UpdateUsersDto,
  ): Promise<string> {
    return ``;
  }
  async deleteUsers(
    decodedTokenDto: DecodedTokenDto,
    deleteUsersDto: DeleteUsersDto,
  ): Promise<string> {
    return ``;
  }
}
