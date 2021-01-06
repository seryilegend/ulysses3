import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersServiceInterface } from './interface/users-service.interface';
import { School, SchoolDocument } from '../schemas/School.schema';
import { User, UserDocument } from '../schemas/User.schema';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { DeleteUsersDto } from './dto/delete-users.dto';
import { DecodedTokenDto } from '../middleware/dto/decoded-token.dto';
import { PasswordMiddleware } from '../middleware/password.middleware';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @InjectModel(School.name) private schoolModel: Model<SchoolDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly passwordMiddleware: PasswordMiddleware,
  ) {}
  private async getAdminSchool(
    userId: string,
    password: string,
  ): Promise<SchoolDocument> {
    const admin: UserDocument = await this.userModel.findById(userId);
    const isMatch = await this.passwordMiddleware.compare(
      password,
      admin.password,
    );
    if (!isMatch) {
      throw new HttpException(
        'Некорректные данные при добавлении пользователей',
        HttpStatus.BAD_REQUEST,
      );
    }
    return admin.school;
  }
  async createUsers(
    { userId }: DecodedTokenDto,
    { password, users }: CreateUsersDto,
  ): Promise<string> {
    const school: SchoolDocument = await this.getAdminSchool(userId, password);
    for (const { userName, password, role } of users) {
      const candidate: UserDocument = await this.userModel.findOne({
        userName,
      });
      if (!candidate) {
        const hashedPassword: string = await this.passwordMiddleware.generateHashedPassword(
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
